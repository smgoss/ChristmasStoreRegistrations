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

const SendEmailToAllSchema = z.object({
  subject: z.string().min(1, 'Subject is required').max(100, 'Subject must be 100 characters or less'),
  emailMessage: z.string().min(1, 'Email message is required').max(5000, 'Email message must be 5000 characters or less'),
  sendSmsNotification: z.boolean().default(true), // Send SMS to let users know to check email
  targetStatus: z.enum(['all', 'registered', 'unconfirmed', 'confirmed']).default('all')
});

async function sendEmailWithDelay(registration: any, index: number, subject: string, emailMessage: string): Promise<{ success: boolean; id: string; name: string; email?: string; error?: string; messageId?: string }> {
  // Rate limit: 1 email per second
  await new Promise(resolve => setTimeout(resolve, index * 1000));
  
  const messageId = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
  
  try {
    console.log(`📧 Sending email ${index + 1} to ${registration.firstName} ${registration.lastName} (${registration.email})`);
    console.log(`📧 Email params:`, { subject, messageLength: emailMessage.length, messageId });

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

    console.log(`📧 Email mutation result:`, JSON.stringify(emailResult, null, 2));

    if (emailResult.errors) {
      console.error(`❌ Email mutation errors:`, emailResult.errors);
      return {
        success: false,
        id: registration.id,
        name: `${registration.firstName} ${registration.lastName}`,
        email: registration.email,
        error: JSON.stringify(emailResult.errors)
      };
    }

    if (!emailResult.data?.success) {
      console.error(`❌ Email function returned failure:`, emailResult.data);
      return {
        success: false,
        id: registration.id,
        name: `${registration.firstName} ${registration.lastName}`,
        email: registration.email,
        error: emailResult.data?.message || 'Email function failed'
      };
    }

    console.log(`✅ Email sent successfully to ${registration.firstName} ${registration.lastName}`);

    return {
      success: true,
      id: registration.id,
      name: `${registration.firstName} ${registration.lastName}`,
      email: registration.email,
      messageId
    };
  } catch (error) {
    console.error(`❌ Email exception for ${registration.firstName} ${registration.lastName}:`, error);
    console.error(`❌ Error stack:`, error instanceof Error ? error.stack : 'No stack trace');
    return {
      success: false,
      id: registration.id,
      name: `${registration.firstName} ${registration.lastName}`,
      email: registration.email,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

async function sendSmsNotificationWithDelay(registration: any, index: number): Promise<{ success: boolean; id: string; name: string; phone?: string; error?: string }> {
  // Small delay after email (0.5 seconds per SMS)
  await new Promise(resolve => setTimeout(resolve, index * 500));
  
  if (!registration.phone) {
    return { 
      success: false, 
      id: registration.id, 
      name: `${registration.firstName} ${registration.lastName}`,
      error: 'No phone number available'
    };
  }
  
  try {
    console.log(`📱 Sending SMS notification ${index + 1} to ${registration.firstName} ${registration.lastName} (${registration.phone})`);

    const smsMessage = `Hi ${registration.firstName}! Please check your email for an important message from the Christmas Store. 🎄`;
    const smsMessageId = Math.random().toString(36).substring(2, 15) + Date.now().toString(36);

    console.log(`📱 SMS params:`, { message: smsMessage, messageId: smsMessageId });

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
      messageId: smsMessageId
    });

    console.log(`📱 SMS mutation result:`, JSON.stringify(smsResult, null, 2));

    if (smsResult.errors) {
      console.error(`❌ SMS mutation errors:`, smsResult.errors);
      return {
        success: false,
        id: registration.id,
        name: `${registration.firstName} ${registration.lastName}`,
        phone: registration.phone,
        error: JSON.stringify(smsResult.errors)
      };
    }

    if (!smsResult.data?.success) {
      console.error(`❌ SMS function returned failure:`, smsResult.data);
      return {
        success: false,
        id: registration.id,
        name: `${registration.firstName} ${registration.lastName}`,
        phone: registration.phone,
        error: smsResult.data?.message || 'SMS function failed'
      };
    }

    console.log(`✅ SMS notification sent successfully to ${registration.firstName} ${registration.lastName}`);

    return {
      success: true,
      id: registration.id,
      name: `${registration.firstName} ${registration.lastName}`,
      phone: registration.phone
    };
  } catch (error) {
    console.error(`❌ SMS exception for ${registration.firstName} ${registration.lastName}:`, error);
    console.error(`❌ Error stack:`, error instanceof Error ? error.stack : 'No stack trace');
    return {
      success: false,
      id: registration.id,
      name: `${registration.firstName} ${registration.lastName}`,
      phone: registration.phone,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting - shorter window for testing on gray branch
    const isGrayBranch = process.env.NEXT_PUBLIC_LOCATION === 'gray';
    const rateLimitWindow = isGrayBranch ? 30000 : 120000; // 30 seconds for gray, 2 minutes for production
    const rateLimitResponse = applyRateLimit(request, 1, rateLimitWindow);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate request body
    const validation = await validateRequestBody(request, SendEmailToAllSchema);
    if (!validation.success) {
      return validation.response;
    }
    
    const { subject, emailMessage, sendSmsNotification, targetStatus } = validation.data;

    console.log(`🚀 Starting email broadcast to ${targetStatus} users with subject: "${subject}"`);

    // Get all non-cancelled registrations
    const { data: allRegistrations } = await (await getClient()).models.Registration.list({
      filter: {
        isCancelled: { ne: true }
      }
    });

    if (!allRegistrations || allRegistrations.length === 0) {
      return createSuccessResponse({
        message: 'No registrations found to send emails to',
        emailsSent: 0,
        smsNotificationsSent: 0,
        failed: 0,
        results: []
      });
    }

    // Filter out null/undefined registrations first
    const validRegistrations = allRegistrations.filter(reg => reg != null);
    const nullCount = allRegistrations.length - validRegistrations.length;

    if (nullCount > 0) {
      console.warn(`⚠️ Found ${nullCount} null/undefined registrations in database - these will be skipped`);
    }

    // Filter registrations based on target status
    const statusFilteredRegistrations = validRegistrations.filter(reg => {
      if (targetStatus === 'all') return true;
      if (targetStatus === 'registered') return !reg.registrationStatus || reg.registrationStatus === 'registered';
      if (targetStatus === 'unconfirmed') return reg.registrationStatus === 'unconfirmed';
      if (targetStatus === 'confirmed') return reg.registrationStatus === 'confirmed';
      return false;
    });

    // Filter out registrations without email addresses
    const eligibleRegistrations = statusFilteredRegistrations.filter(reg => reg.email);
    const noEmailCount = statusFilteredRegistrations.length - eligibleRegistrations.length;

    if (noEmailCount > 0) {
      console.warn(`⚠️ Skipping ${noEmailCount} registrations with no email address`);
    }

    console.log(`📋 Filtered ${allRegistrations.length} total registrations (${nullCount} null, ${noEmailCount} no email) to ${eligibleRegistrations.length} eligible for email broadcast (status: ${targetStatus})`);

    if (eligibleRegistrations.length === 0) {
      return createSuccessResponse({
        message: `No registrations with email addresses found for status: ${targetStatus}`,
        emailsSent: 0,
        smsNotificationsSent: 0,
        failed: 0,
        skipped: allRegistrations.length,
        results: []
      });
    }

    // Phase 1: Send emails with rate limiting (1 per second)
    console.log('📧 Phase 1: Sending emails...');
    const emailResults = await Promise.all(
      eligibleRegistrations.map((registration, index) => 
        sendEmailWithDelay(registration, index, subject, emailMessage)
      )
    );

    const successfulEmails = emailResults.filter(r => r.success);
    const failedEmails = emailResults.filter(r => !r.success);

    console.log(`📊 Email phase completed: ${successfulEmails.length} sent, ${failedEmails.length} failed`);

    // Phase 2: Send SMS notifications (only to those who received emails successfully and have phone numbers)
    let smsResults: any[] = [];
    if (sendSmsNotification && successfulEmails.length > 0) {
      console.log('📱 Phase 2: Sending SMS notifications...');
      
      const emailRecipientsWithPhones = successfulEmails.filter(result => {
        const registration = eligibleRegistrations.find(reg => reg.id === result.id);
        return registration && registration.phone;
      });

      if (emailRecipientsWithPhones.length > 0) {
        smsResults = await Promise.all(
          emailRecipientsWithPhones.map((emailResult, index) => {
            const registration = eligibleRegistrations.find(reg => reg.id === emailResult.id);
            return sendSmsNotificationWithDelay(registration!, index);
          })
        );
      }
    }

    const successfulSms = smsResults.filter(r => r.success).length;
    const failedSms = smsResults.filter(r => !r.success).length;

    console.log(`📊 SMS notification phase completed: ${successfulSms} sent, ${failedSms} failed`);

    // Compile final results
    const totalTime = eligibleRegistrations.length; // seconds for emails
    const results = {
      emailResults,
      smsResults,
      summary: {
        totalRecipients: eligibleRegistrations.length,
        emailsSent: successfulEmails.length,
        emailsFailed: failedEmails.length,
        smsNotificationsSent: successfulSms,
        smsNotificationsFailed: failedSms,
        estimatedDurationSeconds: totalTime,
        targetStatus,
        sendSmsNotification
      }
    };

    console.log(`✅ Email broadcast completed! ${successfulEmails.length} emails sent, ${successfulSms} SMS notifications sent`);

    return createSuccessResponse({
      message: 'Email broadcast completed successfully',
      emailsSent: successfulEmails.length,
      emailsFailed: failedEmails.length,
      smsNotificationsSent: successfulSms,
      smsNotificationsFailed: failedSms,
      totalRecipients: eligibleRegistrations.length,
      estimatedDurationSeconds: totalTime,
      results: results
    });

  } catch (error) {
    console.error('❌ Error in send-email-to-all API:', error);
    return createErrorResponse(
      'Internal server error',
      'INTERNAL_ERROR',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}