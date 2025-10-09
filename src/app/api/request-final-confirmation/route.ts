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

const RegistrationSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  timeSlot: z.string(),
  numberOfKids: z.number()
});

const RequestFinalConfirmationSchema = z.object({
  registrations: z.array(RegistrationSchema)
});


async function processRegistrationWithDelay(registration: any, index: number) {
  // Rate limit: wait index seconds to spread out requests
  await new Promise(resolve => setTimeout(resolve, index * 1000));
  
  const finalConfirmationToken = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  const now = new Date().toISOString();
  
  try {
    // Update registration status to 'unconfirmed' and set token
    const updateResult = await (await getClient()).models.Registration.update({
      id: registration.id,
      registrationStatus: 'unconfirmed',
      finalConfirmationToken,
      finalConfirmationSentAt: now
    });

    if (updateResult.errors) {
      console.error(`Failed to update registration ${registration.id}:`, updateResult.errors);
      return { success: false, id: registration.id, error: 'Failed to update registration' };
    }

    const confirmationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3004'}/confirm-final/${finalConfirmationToken}`;

    // Send email confirmation
    try {
      const emailResult = await (await getClient()).mutations.sendFinalConfirmationEmail({
        registration: {
          firstName: registration.firstName,
          lastName: registration.lastName,
          email: registration.email,
          phone: registration.phone,
          timeSlot: registration.timeSlot,
          numberOfKids: registration.numberOfKids,
          confirmationUrl
        }
      });

      console.log('📧 Email result:', emailResult);
    } catch (emailError) {
      console.error('📧 Email failed:', emailError);
    }

    // Send SMS confirmation
    try {
      const smsResult = await (await getClient()).mutations.sendFinalConfirmationSms({
        registration: {
          firstName: registration.firstName,
          lastName: registration.lastName,
          email: registration.email,
          phone: registration.phone,
          timeSlot: registration.timeSlot,
          numberOfKids: registration.numberOfKids,
          confirmationUrl
        }
      });

      console.log('📱 SMS result:', smsResult);
    } catch (smsError) {
      console.error('📱 SMS failed:', smsError);
    }

    return { success: true, id: registration.id };
  } catch (error) {
    console.error(`Error processing registration ${registration.id}:`, error);
    return { success: false, id: registration.id, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = applyRateLimit(request, 1, 60000); // 1 request per minute
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate request body
    const validation = await validateRequestBody(request, RequestFinalConfirmationSchema);
    if (!validation.success) {
      return validation.response;
    }
    
    const { registrations } = validation.data;

    console.log(`🚀 Starting final confirmation process for ${registrations.length} registrations`);

    // Check if final confirmation is enabled
    const { data: configData } = await (await getClient()).models.RegistrationConfig.list();
    const config = configData?.[0];
    
    if (!config?.finalConfirmationEnabled) {
      return createErrorResponse('Final confirmation system is not enabled', 'FINAL_CONFIRMATION_DISABLED', 400);
    }

    if (!config?.finalConfirmationDeadline) {
      return createErrorResponse('Final confirmation deadline is not set', 'FINAL_CONFIRMATION_DEADLINE_NOT_SET', 400);
    }

    const now = new Date();
    const deadline = new Date(config.finalConfirmationDeadline);
    
    if (now < deadline) {
      return createErrorResponse('Final confirmation deadline has not been reached yet', 'FINAL_CONFIRMATION_TOO_EARLY', 400);
    }

    // Filter to only include registrations that are currently in 'registered' status
    // This prevents duplicate messages if the button is clicked multiple times
    const { data: currentRegistrations } = await (await getClient()).models.Registration.list({
      filter: {
        registrationStatus: { eq: 'registered' },
        isCancelled: { ne: true }
      }
    });

    const eligibleRegistrations = registrations.filter(reg => 
      currentRegistrations?.some(current => 
        current.id === reg.id && current.registrationStatus === 'registered'
      )
    );

    console.log(`📋 Filtered ${registrations.length} provided registrations to ${eligibleRegistrations.length} eligible (REGISTERED status only)`);

    if (eligibleRegistrations.length === 0) {
      return createSuccessResponse({
        message: 'No registrations found in REGISTERED status',
        sent: 0,
        failed: 0,
        skipped: registrations.length,
        results: []
      });
    }

    // Process only eligible registrations with rate limiting (1 per second)
    const results = await Promise.all(
      eligibleRegistrations.map((registration, index) => 
        processRegistrationWithDelay(registration, index)
      )
    );

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;

    console.log(`✅ Final confirmation process completed: ${successful} successful, ${failed} failed`);

    return createSuccessResponse({
      message: 'Final confirmation process completed',
      sent: successful,
      failed: failed,
      results: results
    });

  } catch (error) {
    console.error('❌ Error in request-final-confirmation API:', error);
    return createErrorResponse(
      'Internal server error',
      'INTERNAL_ERROR',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}