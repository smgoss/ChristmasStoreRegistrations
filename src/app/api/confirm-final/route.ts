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

const ConfirmFinalSchema = z.object({
  token: z.string().min(1, 'Confirmation token is required')
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = applyRateLimit(request, 10, 60000);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate request body
    const validation = await validateRequestBody(request, ConfirmFinalSchema);
    if (!validation.success) {
      return validation.response;
    }
    
    const { token } = validation.data;

    console.log(`🔍 Processing final confirmation for token: ${token.substring(0, 8)}...`);

    // Find registration by final confirmation token
    const { data: registrations } = await (await getClient()).models.Registration.list({
      filter: { finalConfirmationToken: { eq: token } }
    });

    const registration = registrations?.[0];
    if (!registration) {
      return createErrorResponse('Invalid or expired confirmation token', 'INVALID_TOKEN', 404);
    }

    console.log('📋 Found registration:', {
      id: registration.id,
      firstName: registration.firstName,
      lastName: registration.lastName,
      timeSlot: registration.timeSlot,
      numberOfKids: registration.numberOfKids,
      registrationStatus: registration.registrationStatus
    });

    if (registration.registrationStatus === 'confirmed') {
      return createSuccessResponse({
        message: 'Registration already confirmed',
        registration: {
          firstName: registration.firstName,
          lastName: registration.lastName,
          timeSlot: registration.timeSlot,
          numberOfKids: registration.numberOfKids,
          status: 'confirmed'
        }
      });
    }

    if (registration.registrationStatus === 'cancelled') {
      return createErrorResponse('Registration has been cancelled', 'REGISTRATION_CANCELLED', 400);
    }

    if (registration.registrationStatus !== 'unconfirmed') {
      return createErrorResponse('Registration is not in unconfirmed status', 'INVALID_STATUS', 400);
    }

    // Update registration status to confirmed
    const now = new Date().toISOString();
    const updateResult = await (await getClient()).models.Registration.update({
      id: registration.id,
      registrationStatus: 'confirmed',
      finalConfirmedAt: now
    });

    if (updateResult.errors) {
      console.error('Failed to update registration:', updateResult.errors);
      return createErrorResponse('Failed to confirm registration', 'UPDATE_FAILED', 500);
    }

    console.log(`✅ Registration confirmed for ${registration.firstName} ${registration.lastName} - ${registration.timeSlot}`);

    const responseData = {
      message: 'Registration confirmed successfully',
      registration: {
        firstName: registration.firstName,
        lastName: registration.lastName,
        timeSlot: registration.timeSlot,
        numberOfKids: registration.numberOfKids,
        status: 'confirmed',
        confirmedAt: now
      }
    };
    
    console.log('📤 Returning response data:', JSON.stringify(responseData, null, 2));
    return createSuccessResponse(responseData);

  } catch (error) {
    console.error('❌ Error in confirm-final API:', error);
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

  try {
    // Process the confirmation
    const confirmResponse = await POST(new NextRequest('http://localhost/api/confirm-final', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token })
    }));

    const result = await confirmResponse.json();

    if (confirmResponse.ok) {
      // Redirect to success page with registration details
      const params = new URLSearchParams({
        confirmed: 'true',
        firstName: result.registration.firstName,
        lastName: result.registration.lastName,
        timeSlot: result.registration.timeSlot
      });
      return NextResponse.redirect(new URL(`/confirm-final/success?${params}`, request.url));
    } else {
      // Redirect to error page with error details
      const params = new URLSearchParams({
        error: result.code || 'confirmation_failed',
        message: result.message || 'Failed to confirm registration'
      });
      return NextResponse.redirect(new URL(`/confirm-final/error?${params}`, request.url));
    }

  } catch (error) {
    console.error('Error processing GET confirmation:', error);
    return NextResponse.redirect(new URL('/confirm-final/error?error=server_error', request.url));
  }
}