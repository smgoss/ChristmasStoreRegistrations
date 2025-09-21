import { NextRequest } from 'next/server';
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

const WaitlistRegistrationSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50, 'First name must be 50 characters or less'),
  lastName: z.string().min(1, 'Last name is required').max(50, 'Last name must be 50 characters or less'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  streetAddress: z.string().min(1, 'Street address is required').max(100, 'Street address must be 100 characters or less'),
  zipCode: z.string().min(5, 'Please enter a valid zip code').max(10, 'Zip code must be 10 characters or less'),
  city: z.string().min(1, 'City is required').max(50, 'City must be 50 characters or less'),
  state: z.string().min(2, 'Please enter a valid state').max(2, 'State must be 2 characters'),
  numberOfKids: z.number().int().min(1, 'Number of children must be at least 1').max(10, 'Number of children cannot exceed 10'),
  children: z.array(z.object({
    age: z.string().min(1, 'Child age is required'),
    gender: z.enum(['boy', 'girl'], { required_error: 'Child gender is required' })
  })).optional(),
  preferredTimeSlots: z.array(z.string()).optional(),
  referredBy: z.string().max(100, 'Referred by must be 100 characters or less').optional()
});

async function getNextWaitlistPosition(): Promise<number> {
  try {
    // Only try to get position if Waitlist model is available
    const client = await getClient();
    if (client.models.Waitlist) {
      const { data: waitlistEntries } = await client.models.Waitlist.list({
        filter: { isActive: { eq: true } }
      });
      
      if (!waitlistEntries || waitlistEntries.length === 0) {
        return 1; // First person on waitlist
      }
      
      // Find the highest position number and add 1
      const maxPosition = Math.max(...waitlistEntries.map(entry => entry.position || 0));
      return maxPosition + 1;
    }
    
    return 1; // Fallback when model not available
  } catch (error) {
    console.error('Error getting waitlist position:', error);
    return 1; // Fallback to position 1
  }
}

async function checkIfEmailExists(email: string): Promise<boolean> {
  try {
    // Check if email exists in registrations
    const { data: registrations } = await (await getClient()).models.Registration.list({
      filter: { 
        email: { eq: email },
        isCancelled: { ne: true }
      }
    });
    
    if (registrations && registrations.length > 0) {
      return true;
    }
    
    // Check if email exists in waitlist (only if Waitlist model is available)
    try {
      const client = await getClient();
      if (client.models.Waitlist) {
        const { data: waitlistEntries } = await client.models.Waitlist.list({
          filter: { 
            email: { eq: email },
            isActive: { eq: true }
          }
        });
        
        return waitlistEntries && waitlistEntries.length > 0;
      }
    } catch (waitlistError) {
      console.log('Waitlist model not yet available for email check:', waitlistError);
    }
    
    return false;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = applyRateLimit(request, 5, 60000); // 5 requests per minute
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate request body
    const validation = await validateRequestBody(request, WaitlistRegistrationSchema);
    if (!validation.success) {
      return validation.response;
    }
    
    const data = validation.data;
    console.log('📝 Processing waitlist registration for:', data.email);

    // Check if email already exists
    const emailExists = await checkIfEmailExists(data.email);
    if (emailExists) {
      return createErrorResponse(
        'This email address is already registered or on the waitlist',
        'EMAIL_ALREADY_EXISTS',
        400
      );
    }

    // Get next position in waitlist
    const position = await getNextWaitlistPosition();
    console.log('📋 Assigning waitlist position:', position);

    // Create waitlist entry
    const waitlistData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      streetAddress: data.streetAddress,
      zipCode: data.zipCode,
      city: data.city,
      state: data.state,
      numberOfKids: data.numberOfKids,
      children: data.children ? JSON.stringify(data.children) : null,
      preferredTimeSlots: data.preferredTimeSlots ? data.preferredTimeSlots.join(',') : null,
      referredBy: data.referredBy || null,
      waitlistDate: new Date().toISOString(),
      position,
      isActive: true,
      movedToRegistration: false
    };

    // Check if Waitlist model is available before creating
    const client = await getClient();
    if (!client.models.Waitlist) {
      return createErrorResponse(
        'Waitlist feature is currently being deployed. Please try again in a few minutes.',
        'WAITLIST_NOT_AVAILABLE',
        503
      );
    }

    const { data: waitlistEntry } = await client.models.Waitlist.create(waitlistData);
    
    if (!waitlistEntry) {
      throw new Error('Failed to create waitlist entry');
    }

    console.log('✅ Waitlist entry created:', waitlistEntry.id);

    // Send waitlist confirmation email
    try {
      if (client.mutations.sendWaitlistEmail) {
        const emailResult = await client.mutations.sendWaitlistEmail({
          waitlistEntry: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            numberOfKids: data.numberOfKids,
            preferredTimeSlots: data.preferredTimeSlots ? data.preferredTimeSlots.join(', ') : '',
            position
          },
          waitlistId: waitlistEntry.id
        });
        
        console.log('📧 Waitlist email result:', emailResult);
      } else {
        console.log('📧 Waitlist email function not yet available');
      }
    } catch (emailError) {
      console.error('⚠️ Failed to send waitlist email:', emailError);
      // Don't fail the registration if email fails
    }

    return createSuccessResponse({
      message: 'Successfully added to waitlist',
      waitlistEntry: {
        id: waitlistEntry.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        position,
        waitlistDate: waitlistData.waitlistDate
      }
    });

  } catch (error) {
    console.error('❌ Error in waitlist registration:', error);
    return createErrorResponse(
      'Internal server error',
      'INTERNAL_ERROR',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}