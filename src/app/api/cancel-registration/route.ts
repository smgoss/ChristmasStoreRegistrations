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

const CancelRegistrationSchema = z.object({
  token: z.string().min(1, 'Cancellation token is required')
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = applyRateLimit(request, 10, 60000);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate request body
    const validation = await validateRequestBody(request, CancelRegistrationSchema);
    if (!validation.success) {
      return validation.response;
    }
    
    const { token } = validation.data;

    console.log(`🔍 Processing cancellation for token: ${token.substring(0, 8)}...`);

    // Find registration by final confirmation token
    const { data: registrations } = await (await getClient()).models.Registration.list({
      filter: { finalConfirmationToken: { eq: token } }
    });

    const registration = registrations?.[0];
    if (!registration) {
      return createErrorResponse('Invalid or expired cancellation token', 'INVALID_TOKEN', 404);
    }

    console.log('📋 Found registration:', {
      id: registration.id,
      firstName: registration.firstName,
      lastName: registration.lastName,
      timeSlot: registration.timeSlot,
      registrationStatus: registration.registrationStatus
    });

    if (registration.registrationStatus === 'cancelled') {
      return createSuccessResponse({
        message: 'Registration already cancelled',
        registration: {
          firstName: registration.firstName,
          lastName: registration.lastName,
          timeSlot: registration.timeSlot,
          status: 'cancelled'
        }
      });
    }

    if (registration.registrationStatus !== 'unconfirmed' && registration.registrationStatus !== 'confirmed') {
      return createErrorResponse('Registration cannot be cancelled in its current status', 'INVALID_STATUS', 400);
    }

    // Update registration status to cancelled
    const now = new Date().toISOString();
    const updateResult = await (await getClient()).models.Registration.update({
      id: registration.id,
      registrationStatus: 'cancelled',
      isCancelled: true,
      cancelledAt: now
    });

    if (updateResult.errors) {
      console.error('Failed to cancel registration:', updateResult.errors);
      return createErrorResponse('Failed to cancel registration', 'UPDATE_FAILED', 500);
    }

    console.log(`✅ Registration cancelled for ${registration.firstName} ${registration.lastName} - ${registration.timeSlot}`);

    const responseData = {
      message: 'Registration cancelled successfully',
      registration: {
        firstName: registration.firstName,
        lastName: registration.lastName,
        timeSlot: registration.timeSlot,
        numberOfKids: registration.numberOfKids,
        status: 'cancelled',
        cancelledAt: now
      }
    };
    
    console.log('📤 Returning cancellation response:', JSON.stringify(responseData, null, 2));
    return createSuccessResponse(responseData);

  } catch (error) {
    console.error('❌ Error in cancel-registration API:', error);
    return createErrorResponse(
      'Internal server error',
      'INTERNAL_ERROR',
      500,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}

// Also handle GET requests for direct link clicks
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const token = url.searchParams.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/?error=missing-token', request.url));
  }

  // Redirect to the cancellation confirmation page
  return NextResponse.redirect(new URL(`/cancel-registration/${token}`, request.url));
}