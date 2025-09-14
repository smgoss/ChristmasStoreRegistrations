import { NextResponse } from 'next/server';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { ensureAmplifyConfigured } from '@/lib/amplify';
import { z } from 'zod';

let client: ReturnType<typeof generateClient<Schema>> | null = null;
const getClient = async () => {
  if (!client) {
    await ensureAmplifyConfigured();
    client = generateClient<Schema>();
  }
  return client;
};

// In-memory rate limiting (best-effort; use durable store in production)
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 10; // max requests per window per IP
const rateMap = new Map<string, { count: number; windowStart: number }>();

function getClientIp(req: Request) {
  const xff = req.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  const xfci = req.headers.get('x-client-ip');
  if (xfci) return xfci;
  return 'unknown';
}

function checkRateLimit(req: Request) {
  const ip = getClientIp(req);
  const now = Date.now();
  const rec = rateMap.get(ip);
  if (!rec || now - rec.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateMap.set(ip, { count: 1, windowStart: now });
    return true;
  }
  if (rec.count >= RATE_LIMIT_MAX) return false;
  rec.count += 1;
  return true;
}

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

// Async SMS sending function
async function sendSmsConfirmationAsync(registration: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timeSlot: string;
  numberOfKids: number;
  referredBy?: string;
  registrationDate: string;
}) {
  try {
    const { LambdaClient, InvokeCommand } = await import('@aws-sdk/client-lambda');
    const lambda = new LambdaClient({ region: process.env.AWS_REGION || 'us-east-1' });
    
    const command = new InvokeCommand({
      FunctionName: process.env.SEND_SMS_CONFIRMATION_FUNCTION_NAME || 'send-sms-confirmation',
      Payload: JSON.stringify({
        arguments: { registration }
      }),
    });

    const response = await lambda.send(command);
    
    if (response.Payload) {
      const result = JSON.parse(new TextDecoder().decode(response.Payload));
      if (result.success) {
        console.log('✅ SMS confirmation sent successfully');
      } else {
        throw new Error(`SMS Lambda failed: ${result.message}`);
      }
    }
  } catch (error) {
    console.error('❌ Failed to send SMS confirmation:', error);
    throw error;
  }
}

export async function POST(req: Request) {
  try {
    console.log('Registration API called');
    if (!checkRateLimit(req)) {
      return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const json = await req.json();
    console.log('Received registration data:', json);
    const parsed = RegistrationSchema.safeParse(json);
    if (!parsed.success) {
      console.log('Schema validation failed:', parsed.error);
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }
    const { firstName, lastName, email, phone: rawPhone, numberOfKids, timeSlot, referredBy, inviteToken, children = [] } = parsed.data;
    
    // Format phone number to E.164 format for database storage
    const phone = formatPhoneForStorage(rawPhone);
    console.log('Parsed registration data:', { firstName, lastName, email, phone, numberOfKids, timeSlot, referredBy, inviteToken });

    // Check duplicates on server (check both formatted and raw phone)
    const [emailCheck, phoneCheck, rawPhoneCheck] = await Promise.all([
      (await getClient()).models.Registration.list({ filter: { email: { eq: email } } }),
      (await getClient()).models.Registration.list({ filter: { phone: { eq: phone } } }),
      (await getClient()).models.Registration.list({ filter: { phone: { eq: rawPhone } } }),
    ]);

    if (emailCheck.data?.length) {
      return NextResponse.json({ error: 'Someone is already registered with this email address' }, { status: 409 });
    }
    if (phoneCheck.data?.length || rawPhoneCheck.data?.length) {
      return NextResponse.json({ error: 'Someone is already registered with this phone number' }, { status: 409 });
    }

    // Enforce registration status
    const { data: configData } = await (await getClient()).models.RegistrationConfig.list();
    const config = configData?.[0];
    if (config) {
      if (!config.isRegistrationOpen) {
        return NextResponse.json({ error: config.closureMessage || 'Registration is currently closed.' }, { status: 403 });
      }
      if (config.inviteOnlyMode && !inviteToken) {
        return NextResponse.json({ error: 'Registration is invite-only. An invite token is required.' }, { status: 403 });
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
          return NextResponse.json({ id: payload.id }, { status: 201 });
        } else {
          return NextResponse.json({ error: payload?.error || 'Reservation failed' }, { status: 409 });
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
        return NextResponse.json({ error: 'Selected time slot is not available' }, { status: 400 });
      }

      const { data: regsInSlot } = await (await getClient()).models.Registration.list({
        filter: { timeSlot: { eq: timeSlot }, isCancelled: { ne: true } },
      });
      const currentCount = regsInSlot?.length ?? 0;
      if (currentCount >= (slot.maxCapacity || 0)) {
        return NextResponse.json({ error: 'This time slot is full' }, { status: 409 });
      }

      // If invite token is present, validate not used
      if (inviteToken) {
        const { data: invites } = await (await getClient()).models.InviteLink.list({ filter: { token: { eq: inviteToken } } });
        const invite = invites?.[0];
        if (!invite || invite.isUsed) {
          return NextResponse.json({ error: 'Invalid or already used invite token' }, { status: 400 });
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
          numberOfKids,
          timeSlot,
          needsChildcare: false, // Temporary: until schema migration completes
          referredBy: referredBy || undefined,
          inviteToken,
          registrationDate: now,
        });
      } catch (createError) {
        console.error('Error during registration creation:', createError);
        return NextResponse.json({ error: 'Database error during registration creation', details: createError instanceof Error ? createError.message : 'Unknown error' }, { status: 500 });
      }

      console.log('Registration creation result:', regResult);
      const reg = regResult.data;
      if (!reg) {
        console.error('Registration creation failed - no data returned');
        return NextResponse.json({ error: 'Failed to create registration' }, { status: 500 });
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
        return NextResponse.json({ error: 'This time slot just filled up. Please choose another.' }, { status: 409 });
      }

      // Mark invite as used (best effort) if applicable
      if (inviteToken) {
        const { data: invites2 } = await (await getClient()).models.InviteLink.list({ filter: { token: { eq: inviteToken } } });
        const invite2 = invites2?.[0];
        if (invite2 && !invite2.isUsed) {
          await (await getClient()).models.InviteLink.update({ id: invite2.id, isUsed: true, usedAt: now });
        }
      }

      // Send SMS confirmation (async, don't wait for completion)
      sendSmsConfirmationAsync({
        firstName,
        lastName,
        email,
        phone: rawPhone, // Use raw phone for SMS (it handles formatting internally)
        timeSlot,
        numberOfKids,
        referredBy,
        registrationDate: now
      }).catch(error => {
        console.error('SMS confirmation failed (non-blocking):', error);
      });

      return NextResponse.json({ id: reg.id }, { status: 201 });
    });
  } catch (err) {
    console.error('Registration error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
