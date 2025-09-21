import { NextRequest, NextResponse } from 'next/server';
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

const SendMessageToAllSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(100, 'Subject must be 100 characters or less'),
  emailMessage: z.string().min(1, 'Email message is required').max(5000, 'Email message must be 5000 characters or less'),
  smsMessage: z.string().min(1, 'SMS message is required').max(160, 'SMS message must be 160 characters or less'),
  sendEmail: z.boolean().default(true),
  sendSms: z.boolean().default(true),
  targetStatus: z.enum(['all', 'registered', 'unconfirmed', 'confirmed']).default('all')
});

async function processRegistrationWithDelay(registration: any, index: number, subject: string, emailMessage: string, smsMessage: string, sendEmail: boolean, sendSms: boolean) {
  // Rate limit: wait index seconds to spread out requests
  await new Promise(resolve => setTimeout(resolve, index * 1000));
  
  const messageId = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  
  try {
    let emailSuccess = false;
    let smsSuccess = false;

    // Send email if requested
    if (sendEmail) {
      try {
        const emailResult = await (await getClient()).mutations.sendCustomEmail({
          registration: {
            firstName: registration.firstName,
            lastName: registration.lastName,
            email: registration.email,
            phone: registration.phone || '',
            timeSlot: registration.timeSlot,
            numberOfKids: registration.numberOfKids
          },
          subject,
          message: emailMessage,
          messageId
        });

        console.log('📧 Email result for', registration.firstName, ':', emailResult);
        emailSuccess = true;
      } catch (emailError) {
        console.error('📧 Email failed for', registration.firstName, ':', emailError);
      }
    }

    // Send SMS if requested and phone number exists
    if (sendSms && registration.phone) {
      try {
        const smsResult = await (await getClient()).mutations.sendCustomSms({
          registration: {
            firstName: registration.firstName,
            lastName: registration.lastName,
            email: registration.email,
            phone: registration.phone,
            timeSlot: registration.timeSlot,
            numberOfKids: registration.numberOfKids
          },
          message: smsMessage,
          messageId
        });

        console.log('📱 SMS result for', registration.firstName, ':', smsResult);
        smsSuccess = true;
      } catch (smsError) {
        console.error('📱 SMS failed for', registration.firstName, ':', smsError);
      }
    }

    return { 
      success: true, 
      id: registration.id, 
      name: `${registration.firstName} ${registration.lastName}`,
      emailSent: emailSuccess,
      smsSent: smsSuccess,
      messageId
    };
  } catch (error) {
    console.error(`Error processing message for ${registration.firstName} ${registration.lastName}:`, error);
    return { 
      success: false, 
      id: registration.id, 
      name: `${registration.firstName} ${registration.lastName}`,
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting - 1 request per 30 seconds for bulk messages
    const rateLimitResponse = applyRateLimit(request, 1, 30000);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate request body
    const validation = await validateRequestBody(request, SendMessageToAllSchema);
    if (!validation.success) {
      return validation.response;
    }
    
    const { subject, emailMessage, smsMessage, sendEmail, sendSms, targetStatus } = validation.data;

    console.log(`🚀 Starting message broadcast to ${targetStatus} users`);

    // Get all registrations based on target status
    const { data: allRegistrations } = await (await getClient()).models.Registration.list({
      filter: {
        isCancelled: { ne: true }
      }
    });

    if (!allRegistrations || allRegistrations.length === 0) {
      return createSuccessResponse({
        message: 'No registrations found to send messages to',
        sent: 0,
        failed: 0,
        results: []
      });
    }

    // Filter registrations based on target status
    const eligibleRegistrations = allRegistrations.filter(reg => {
      if (targetStatus === 'all') return true;
      if (targetStatus === 'registered') return !reg.registrationStatus || reg.registrationStatus === 'registered';
      if (targetStatus === 'unconfirmed') return reg.registrationStatus === 'unconfirmed';
      if (targetStatus === 'confirmed') return reg.registrationStatus === 'confirmed';
      return false;
    });

    console.log(`📋 Filtered ${allRegistrations.length} total registrations to ${eligibleRegistrations.length} eligible for status: ${targetStatus}`);

    if (eligibleRegistrations.length === 0) {
      return createSuccessResponse({
        message: `No registrations found with status: ${targetStatus}`,
        sent: 0,
        failed: 0,
        skipped: allRegistrations.length,
        results: []
      });
    }

    // Validate that at least one communication method is enabled
    if (!sendEmail && !sendSms) {
      return createErrorResponse('At least one communication method (email or SMS) must be enabled', 'NO_COMMUNICATION_METHOD', 400);
    }

    // Process registrations with rate limiting (1 per second)
    const results = await Promise.all(
      eligibleRegistrations.map((registration, index) => 
        processRegistrationWithDelay(registration, index, subject, emailMessage, smsMessage, sendEmail ?? true, sendSms ?? true)
      )
    );

    const successful = results.filter(r => r.success).length;
    const failed = results.filter(r => !r.success).length;
    const emailsSent = results.filter(r => r.success && r.emailSent).length;
    const smsSent = results.filter(r => r.success && r.smsSent).length;

    console.log(`✅ Message broadcast completed: ${successful} successful, ${failed} failed`);
    console.log(`📊 Delivery: ${emailsSent} emails, ${smsSent} SMS messages`);

    return createSuccessResponse({
      message: 'Message broadcast completed',
      sent: successful,
      failed: failed,
      emailsSent,
      smsSent,
      totalRecipients: eligibleRegistrations.length,
      results: results
    });

  } catch (error) {
    console.error('❌ Error in send-message-to-all API:', error);
    return createErrorResponse(
      'Internal server error',
      'INTERNAL_ERROR',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}