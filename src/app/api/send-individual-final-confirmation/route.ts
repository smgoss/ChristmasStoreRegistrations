import { NextRequest, NextResponse } from 'next/server';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { ensureAmplifyConfigured } from '@/lib/amplify';
import { z } from 'zod';
import { createErrorResponse, createSuccessResponse, validateRequestBody, applyRateLimit } from '@/lib/api-utils';
import { DEFAULT_FRONTEND_URL } from '@/config/locationConfig';

let client: ReturnType<typeof generateClient<Schema>> | null = null;

const getClient = async () => {
  if (!client) {
    await ensureAmplifyConfigured();
    client = generateClient<Schema>();
  }
  return client;
};

const SendIndividualFinalConfirmationSchema = z.object({
  registrationId: z.string()
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = applyRateLimit(request, 1, 5000); // 1 request per 5 seconds
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate request body
    const validation = await validateRequestBody(request, SendIndividualFinalConfirmationSchema);
    if (!validation.success) {
      return validation.response;
    }
    
    const { registrationId } = validation.data;

    console.log(`🚀 Starting individual final confirmation for registration: ${registrationId}`);

    // Check if final confirmation is enabled
    const { data: configData } = await (await getClient()).models.RegistrationConfig.list();
    const config = configData?.[0];
    
    if (!config?.finalConfirmationEnabled) {
      return createErrorResponse('Final confirmation system is not enabled', 'FINAL_CONFIRMATION_DISABLED', 400);
    }

    // Get the specific registration
    const registrationResult = await (await getClient()).models.Registration.get({ id: registrationId });
    const registration = registrationResult.data;
    
    if (!registration) {
      return createErrorResponse('Registration not found', 'REGISTRATION_NOT_FOUND', 404);
    }

    if (registration.isCancelled) {
      return createErrorResponse('Cannot send final confirmation to cancelled registration', 'REGISTRATION_CANCELLED', 400);
    }

    // Check if registration is in REGISTERED or UNCONFIRMED status
    // Treat null/undefined status as 'registered' for existing registrations
    const currentStatus = registration.registrationStatus || 'registered';
    if (currentStatus !== 'registered' && currentStatus !== 'unconfirmed') {
      return createErrorResponse(
        `Cannot send final confirmation to registration in ${currentStatus} status`,
        'INVALID_STATUS',
        400
      );
    }

    const finalConfirmationToken = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
    const now = new Date().toISOString();
    
    try {
      // Update registration status to 'unconfirmed' and set token
      console.log(`📝 Updating registration ${registrationId} to unconfirmed status...`);
      console.log(`📝 Update data:`, {
        id: registrationId,
        registrationStatus: 'unconfirmed',
        finalConfirmationToken,
        finalConfirmationSentAt: now
      });
      
      const updateResult = await (await getClient()).models.Registration.update({
        id: registrationId,
        registrationStatus: 'unconfirmed',
        finalConfirmationToken,
        finalConfirmationSentAt: now
      });

      console.log(`📝 Update result:`, updateResult);

      if (updateResult.errors) {
        console.error(`Failed to update registration ${registrationId}:`, updateResult.errors);
        return createErrorResponse('Failed to update registration', 'UPDATE_FAILED', 500);
      }

      console.log(`✅ Successfully updated registration ${registrationId} to unconfirmed status`);
      console.log(`✅ Updated registration data:`, updateResult.data);

      // Use frontendUrl from config, fallback to location-specific default
      const frontendUrl = config.frontendUrl || DEFAULT_FRONTEND_URL;
      const confirmationUrl = `${frontendUrl}/confirm-final/${finalConfirmationToken}`;

      // Send email confirmation
      let emailSuccess = false;
      try {
        const emailResult = await (await getClient()).mutations.sendFinalConfirmationEmail({
          registration: {
            firstName: registration.firstName,
            lastName: registration.lastName,
            email: registration.email,
            phone: registration.phone || '',
            timeSlot: registration.timeSlot,
            numberOfKids: registration.numberOfKids,
            confirmationUrl
          }
        });

        console.log('📧 Email result:', emailResult);
        emailSuccess = true;
      } catch (emailError) {
        console.error('📧 Email failed:', emailError);
      }

      // Send SMS confirmation
      let smsSuccess = false;
      try {
        if (registration.phone) {
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
          smsSuccess = true;
        }
      } catch (smsError) {
        console.error('📱 SMS failed:', smsError);
      }

      const message = emailSuccess && smsSuccess ? 
        'Final confirmation sent via email and SMS' :
        emailSuccess ? 'Final confirmation sent via email only' :
        smsSuccess ? 'Final confirmation sent via SMS only' :
        'Final confirmation request processed but delivery may have failed';

      console.log(`✅ Individual final confirmation completed for ${registrationId}`);

      return createSuccessResponse({
        message,
        registrationId,
        emailSent: emailSuccess,
        smsSent: smsSuccess,
        confirmationToken: finalConfirmationToken
      });

    } catch (error) {
      console.error(`Error processing individual final confirmation for ${registrationId}:`, error);
      return createErrorResponse(
        'Failed to process final confirmation',
        'PROCESSING_FAILED',
        500,
        error instanceof Error ? error.message : 'Unknown error'
      );
    }

  } catch (error) {
    console.error('❌ Error in send-individual-final-confirmation API:', error);
    return createErrorResponse(
      'Internal server error',
      'INTERNAL_ERROR',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}