import { NextResponse } from 'next/server';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { ensureAmplifyConfigured } from '@/lib/amplify';
import { z } from 'zod';
import { createErrorResponse, createSuccessResponse, validateRequestBody, applyRateLimit } from '@/lib/api-utils';

let client: ReturnType<typeof generateClient<Schema>> | null = null;
const getClient = async () => {
  if (!client) {
    await ensureAmplifyConfigured();
    client = generateClient<Schema>();
  }
  return client;
};


// Per-timeSlot in-memory mutex to reduce race conditions on capacity
const slotQueues = new Map<string, Promise<void>>();
async function withSlotLock<T>(slotKey: string, fn: () => Promise<T>): Promise<T> {
  const prev = slotQueues.get(slotKey) || Promise.resolve();
  let release: () => void;
  const next = new Promise<void>((res) => (release = res));
  slotQueues.set(slotKey, prev.then(() => next));
  await prev;
  try {
    return await fn();
  } finally {
    // @ts-ignore release is assigned above
    release();
    // Cleanup if this is the last queued promise
    const current = slotQueues.get(slotKey);
    if (current === next) slotQueues.delete(slotKey);
  }
}

const ChildSchema = z.object({
  age: z.union([z.string(), z.number()]),
  gender: z.enum(['boy', 'girl']),
});

const RegistrationSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7),
  streetAddress: z.string().trim().min(1),
  zipCode: z.string().trim().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code format'),
  city: z.string().trim().min(1),
  state: z.string().trim().min(1),
  numberOfKids: z.number().int().min(0),
  timeSlot: z.string().trim().min(1),
  referredBy: z.string().optional(),
  inviteToken: z.string().optional(),
  children: z.array(ChildSchema).optional(),
});

function formatPhoneForStorage(phone: string): string {
  // Remove all non-numeric characters
  const digits = phone.replace(/\D/g, '');
  
  // Add +1 if it's a 10-digit US number
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  
  // Add + if it starts with country code but missing +
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  
  // If already has +, return as-is
  if (phone.startsWith('+')) {
    return phone;
  }
  
  // Return with + prefix
  return `+${digits}`;
}




export async function POST(req: Request) {
  try {
    console.log('Registration API called');
    
    // Apply rate limiting
    const rateLimitResponse = applyRateLimit(req, 10, 60000);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate request body
    const validation = await validateRequestBody(req, RegistrationSchema);
    if (!validation.success) {
      return validation.response;
    }
    
    console.log('Received registration data:', validation.data);
    const { firstName, lastName, email, phone: rawPhone, streetAddress, zipCode, city, state, numberOfKids, timeSlot, referredBy, inviteToken, children = [] } = validation.data;
    
    // Format phone number to E.164 format for database storage
    const phone = formatPhoneForStorage(rawPhone);
    console.log('Parsed registration data:', { firstName, lastName, email, phone, streetAddress, zipCode, city, state, numberOfKids, timeSlot, referredBy, inviteToken });

    // Check duplicates on server (check both formatted and raw phone)
    const [emailCheck, phoneCheck, rawPhoneCheck] = await Promise.all([
      (await getClient()).models.Registration.list({ filter: { email: { eq: email } } }),
      (await getClient()).models.Registration.list({ filter: { phone: { eq: phone } } }),
      (await getClient()).models.Registration.list({ filter: { phone: { eq: rawPhone } } }),
    ]);

    if (emailCheck.data?.length) {
      return createErrorResponse('Someone is already registered with this email address', 'DUPLICATE_EMAIL', 409);
    }
    if (phoneCheck.data?.length || rawPhoneCheck.data?.length) {
      return createErrorResponse('Someone is already registered with this phone number', 'DUPLICATE_PHONE', 409);
    }

    // Enforce registration status
    const { data: configData } = await (await getClient()).models.RegistrationConfig.list();
    const config = configData?.[0];
    if (config) {
      if (!config.isRegistrationOpen) {
        return createErrorResponse(config.closureMessage || 'Registration is currently closed.', 'REGISTRATION_CLOSED', 403);
      }
      if (config.inviteOnlyMode && !inviteToken) {
        return createErrorResponse('Registration is invite-only. An invite token is required.', 'INVITE_REQUIRED', 403);
      }
    }

    // Optional: delegate to durable reservation Lambda if configured
    if (process.env.RESERVE_FUNCTION_NAME) {
      try {
        const { LambdaClient, InvokeCommand } = await import('@aws-sdk/client-lambda');
        const lc = new LambdaClient({});
        const ivk = new InvokeCommand({
          FunctionName: process.env.RESERVE_FUNCTION_NAME,
          Payload: new TextEncoder().encode(JSON.stringify({ input: { firstName, lastName, email, phone, numberOfKids, timeSlot, referredBy, inviteToken, children } })),
        });
        const res = await lc.send(ivk);
        const payloadStr = res.Payload ? new TextDecoder().decode(res.Payload) : '{}';
        const payload = JSON.parse(payloadStr || '{}');
        if (payload?.ok) {
          return createSuccessResponse({ id: payload.id }, 201);
        } else {
          return createErrorResponse(payload?.error || 'Reservation failed', 'RESERVATION_FAILED', 409);
        }
      } catch (e) {
        console.error('Durable reservation failed; falling back', e);
        // fall through to local lock path
      }
    }

    // Wrap the entire capacity check + create in a per-slot lock
    return await withSlotLock(timeSlot, async () => {
      console.log('Checking time slot availability for:', timeSlot);
      // Capacity check (pre-create)
      const { data: slotList } = await (await getClient()).models.TimeSlotConfig.list({ filter: { timeSlot: { eq: timeSlot } } });
      console.log('TimeSlotConfig query result:', slotList);
      const slot = slotList?.[0];
      if (!slot) {
        console.log('Time slot not found:', timeSlot);
        return createErrorResponse('Selected time slot is not available', 'TIMESLOT_NOT_FOUND', 400);
      }

      const { data: regsInSlot } = await (await getClient()).models.Registration.list({
        filter: { timeSlot: { eq: timeSlot }, isCancelled: { ne: true } },
      });
      const currentCount = regsInSlot?.length ?? 0;
      if (currentCount >= (slot.maxCapacity || 0)) {
        return createErrorResponse('This time slot is full', 'TIMESLOT_FULL', 409);
      }

      // If invite token is present, validate not used
      if (inviteToken) {
        const { data: invites } = await (await getClient()).models.InviteLink.list({ filter: { token: { eq: inviteToken } } });
        const invite = invites?.[0];
        if (!invite || invite.isUsed) {
          return createErrorResponse('Invalid or already used invite token', 'INVALID_INVITE', 400);
        }
      }

      // Create registration
      const now = new Date().toISOString();
      console.log('Creating registration with data:', {
        firstName,
        lastName,
        email,
        phone,
        numberOfKids,
        timeSlot,
        needsChildcare: false,
        referredBy: referredBy || undefined,
        inviteToken,
        registrationDate: now,
      });
      
      let regResult;
      try {
        regResult = await (await getClient()).models.Registration.create({
          firstName,
          lastName,
          email,
          phone,
          streetAddress,
          zipCode,
          city,
          state,
          numberOfKids,
          timeSlot,
          needsChildcare: false, // Temporary: until schema migration completes
          referredBy: referredBy || undefined,
          inviteToken,
          registrationDate: now,
        });
      } catch (createError) {
        console.error('Error during registration creation:', createError);
        return createErrorResponse('Database error during registration creation', 'DATABASE_ERROR', 500, createError instanceof Error ? createError.message : 'Unknown error');
      }

      console.log('Registration creation result:', regResult);
      const reg = regResult.data;
      if (!reg) {
        console.error('Registration creation failed - no data returned');
        return createErrorResponse('Failed to create registration', 'CREATION_FAILED', 500);
      }

      // Create child records if provided
      if (Array.isArray(children) && numberOfKids > 0) {
        for (const child of children) {
          if (!child) continue;
        await (await getClient()).models.Child.create({
          registrationId: reg.id,
          age: String(child.age),
          gender: child.gender,
        });
        }
      }

      // Post-create capacity recheck to reduce race conditions
      const { data: regsInSlotAfter } = await (await getClient()).models.Registration.list({
        filter: { timeSlot: { eq: timeSlot }, isCancelled: { ne: true } },
      });
      const newCount = regsInSlotAfter?.length ?? 0;
      if (newCount > (slot.maxCapacity || 0)) {
        // Roll back this registration
        await (await getClient()).models.Registration.delete({ id: reg.id });
        return createErrorResponse('This time slot just filled up. Please choose another.', 'TIMESLOT_FILLED', 409);
      }

      // Mark invite as used (best effort) if applicable
      if (inviteToken) {
        const { data: invites2 } = await (await getClient()).models.InviteLink.list({ filter: { token: { eq: inviteToken } } });
        const invite2 = invites2?.[0];
        if (invite2 && !invite2.isUsed) {
          await (await getClient()).models.InviteLink.update({ id: invite2.id, isUsed: true, usedAt: now });
        }
      }

      console.log('🚀 Starting confirmation notifications...');
      
      const client = await getClient();
      
      // Send SMS confirmation (async, don't wait for completion)
      console.log('📱 About to call SMS confirmation mutation');
      client.mutations.sendSmsConfirmation({
        registration: {
          firstName,
          lastName,
          email,
          phone: rawPhone,
          streetAddress,
          zipCode,
          city,
          state,
          timeSlot,
          numberOfKids,
          referredBy: referredBy || '',
          registrationDate: now
        }
      }).then(result => {
        console.log('📱 SMS mutation result received:', JSON.stringify(result, null, 2));
        if (result.data?.success) {
          console.log('✅ SMS confirmation sent successfully');
        } else {
          console.error('❌ SMS function failed:', result.errors);
        }
      }).catch(error => {
        console.error('SMS confirmation failed (non-blocking):', JSON.stringify(error, null, 2));
      });

      // Send email confirmation (async, don't wait for completion)
      console.log('📧 About to call email confirmation mutation');
      console.log('📧 Email mutation payload:', JSON.stringify({
        registration: {
          firstName,
          lastName,
          email,
          phone: rawPhone,
          streetAddress,
          zipCode,
          city,
          state,
          timeSlot,
          numberOfKids,
          referredBy: referredBy || '',
          children
        }
      }, null, 2));
      
      client.mutations.sendConfirmationEmail({
        registration: {
          firstName,
          lastName,
          email,
          phone: rawPhone,
          streetAddress,
          zipCode,
          city,
          state,
          timeSlot,
          numberOfKids,
          referredBy: referredBy || '',
          children: JSON.stringify(children)
        }
      }).then(result => {
        console.log('📧 Email mutation result received:', JSON.stringify(result, null, 2));
        if (result.data?.success) {
          console.log('✅ Email confirmation sent successfully');
        } else {
          console.error('❌ Email function failed:', result.errors);
        }
      }).catch(error => {
        console.error('📧 Email confirmation CAUGHT ERROR:', JSON.stringify(error, null, 2));
        console.error('📧 Error details:', error);
      });

      console.log('✅ Registration complete, returning response');
      return createSuccessResponse({ id: reg.id }, 201);
    });
  } catch (err) {
    console.error('Registration error:', err);
    return createErrorResponse('Server error', 'INTERNAL_ERROR', 500, err instanceof Error ? err.message : 'Unknown error');
  }
}
