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

const MoveWaitlistSchema = z.object({
  waitlistId: z.string().min(1, 'Waitlist ID is required'),
  timeSlot: z.string().min(1, 'Time slot is required'),
  increaseCapacity: z.boolean().default(false)
});

async function generateUniqueToken(): Promise<string> {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';
  
  for (let i = 0; i < 19; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  
  // Check if token already exists in database
  const { data: existingRegistration } = await (await getClient()).models.Registration.list({
    filter: { confirmationToken: { eq: token } }
  });
  
  if (existingRegistration && existingRegistration.length > 0) {
    // If token exists, generate a new one recursively
    return generateUniqueToken();
  }
  
  return token;
}

async function updateTimeSlotCapacity(timeSlot: string, increaseBy: number = 1): Promise<void> {
  try {
    // Get current time slot config
    const { data: timeSlotConfigs } = await (await getClient()).models.TimeSlotConfig.list({
      filter: { timeSlot: { eq: timeSlot } }
    });
    
    if (timeSlotConfigs && timeSlotConfigs.length > 0) {
      const config = timeSlotConfigs[0];
      
      // Update capacity and current registrations
      await (await getClient()).models.TimeSlotConfig.update({
        id: config.id,
        maxCapacity: (config.maxCapacity || 0) + increaseBy,
        currentRegistrations: (config.currentRegistrations || 0) + 1
      });
      
      console.log(`✅ Updated time slot ${timeSlot}: capacity increased by ${increaseBy}, registrations +1`);
    } else {
      // Create new time slot config if it doesn't exist
      await (await getClient()).models.TimeSlotConfig.create({
        timeSlot,
        maxCapacity: increaseBy + 1,
        currentRegistrations: 1,
        isActive: true
      });
      
      console.log(`✅ Created new time slot ${timeSlot} with capacity ${increaseBy + 1}`);
    }
  } catch (error) {
    console.error('Error updating time slot capacity:', error);
    throw error;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = applyRateLimit(request, 10, 60000); // 10 requests per minute
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate request body
    const validation = await validateRequestBody(request, MoveWaitlistSchema);
    if (!validation.success) {
      return validation.response;
    }
    
    const { waitlistId, timeSlot, increaseCapacity } = validation.data;
    console.log('🔄 Moving waitlist entry to registered:', { waitlistId, timeSlot, increaseCapacity });

    // Check if Waitlist model is available
    const client = await getClient();
    if (!client.models.Waitlist) {
      return createErrorResponse(
        'Waitlist feature is currently being deployed. Please try again in a few minutes.',
        'WAITLIST_NOT_AVAILABLE',
        503
      );
    }

    // Get waitlist entry
    const { data: waitlistEntry } = await client.models.Waitlist.get({ id: waitlistId });
    
    if (!waitlistEntry) {
      return createErrorResponse(
        'Waitlist entry not found',
        'WAITLIST_NOT_FOUND',
        404
      );
    }

    if (!waitlistEntry.isActive || waitlistEntry.movedToRegistration) {
      return createErrorResponse(
        'Waitlist entry is not active or already moved',
        'WAITLIST_INACTIVE',
        400
      );
    }

    // Check if email already exists in registrations
    const { data: existingRegistrations } = await (await getClient()).models.Registration.list({
      filter: { 
        email: { eq: waitlistEntry.email },
        isCancelled: { ne: true }
      }
    });
    
    if (existingRegistrations && existingRegistrations.length > 0) {
      return createErrorResponse(
        'Email address already has an active registration',
        'EMAIL_ALREADY_REGISTERED',
        400
      );
    }

    // Generate unique confirmation token
    const confirmationToken = await generateUniqueToken();
    
    // Parse children data
    let childrenData = [];
    if (waitlistEntry.children) {
      try {
        childrenData = JSON.parse(waitlistEntry.children as string);
      } catch (error) {
        console.error('Error parsing children data:', error);
      }
    }

    // Create registration
    const registrationData = {
      firstName: waitlistEntry.firstName,
      lastName: waitlistEntry.lastName,
      email: waitlistEntry.email,
      phone: waitlistEntry.phone,
      streetAddress: waitlistEntry.streetAddress,
      zipCode: waitlistEntry.zipCode,
      city: waitlistEntry.city,
      state: waitlistEntry.state,
      numberOfKids: waitlistEntry.numberOfKids,
      timeSlot,
      referredBy: waitlistEntry.referredBy || null,
      registrationStatus: 'registered' as const,
      isConfirmed: true,
      registrationDate: new Date().toISOString(),
      confirmationToken,
      isCancelled: false,
      inviteUsed: false
    };

    const { data: newRegistration } = await (await getClient()).models.Registration.create(registrationData);
    
    if (!newRegistration) {
      throw new Error('Failed to create registration');
    }

    console.log('✅ Registration created:', newRegistration.id);

    // Create child records if they exist
    if (childrenData.length > 0) {
      try {
        for (const child of childrenData) {
          await (await getClient()).models.Child.create({
            registrationId: newRegistration.id,
            age: child.age,
            gender: child.gender
          });
        }
        console.log(`✅ Created ${childrenData.length} child records`);
      } catch (childError) {
        console.error('Error creating child records:', childError);
        // Don't fail the entire operation for child record errors
      }
    }

    // Update time slot capacity
    try {
      await updateTimeSlotCapacity(timeSlot, increaseCapacity ? 1 : 0);
    } catch (capacityError) {
      console.error('Error updating time slot capacity:', capacityError);
      // Don't fail the operation for capacity update errors
    }

    // Update waitlist entry to mark as moved
    await (await getClient()).models.Waitlist.update({
      id: waitlistId,
      movedToRegistration: true,
      movedToRegistrationAt: new Date().toISOString(),
      registrationId: newRegistration.id,
      isActive: false
    });

    console.log('✅ Waitlist entry marked as moved');

    // Send confirmation email and SMS
    try {
      const emailResult = await (await getClient()).mutations.sendConfirmationEmail({
        registration: {
          firstName: newRegistration.firstName,
          lastName: newRegistration.lastName,
          email: newRegistration.email,
          phone: newRegistration.phone,
          streetAddress: newRegistration.streetAddress,
          zipCode: newRegistration.zipCode,
          city: newRegistration.city,
          state: newRegistration.state,
          timeSlot: newRegistration.timeSlot,
          numberOfKids: newRegistration.numberOfKids,
          referredBy: newRegistration.referredBy || '',
          children: childrenData.length > 0 ? JSON.stringify(childrenData) : null
        }
      });
      
      console.log('📧 Confirmation email result:', emailResult);
    } catch (emailError) {
      console.error('⚠️ Failed to send confirmation email:', emailError);
    }

    try {
      const smsResult = await (await getClient()).mutations.sendSmsConfirmation({
        registration: {
          firstName: newRegistration.firstName,
          lastName: newRegistration.lastName,
          email: newRegistration.email,
          phone: newRegistration.phone,
          streetAddress: newRegistration.streetAddress,
          zipCode: newRegistration.zipCode,
          city: newRegistration.city,
          state: newRegistration.state,
          timeSlot: newRegistration.timeSlot,
          numberOfKids: newRegistration.numberOfKids,
          referredBy: newRegistration.referredBy || '',
          registrationDate: newRegistration.registrationDate || new Date().toISOString()
        }
      });
      
      console.log('📱 SMS confirmation result:', smsResult);
    } catch (smsError) {
      console.error('⚠️ Failed to send SMS confirmation:', smsError);
    }

    return createSuccessResponse({
      message: 'Successfully moved from waitlist to registered',
      registration: {
        id: newRegistration.id,
        firstName: newRegistration.firstName,
        lastName: newRegistration.lastName,
        email: newRegistration.email,
        timeSlot: newRegistration.timeSlot,
        numberOfKids: newRegistration.numberOfKids
      }
    });

  } catch (error) {
    console.error('❌ Error moving waitlist to registered:', error);
    return createErrorResponse(
      'Internal server error',
      'INTERNAL_ERROR',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}