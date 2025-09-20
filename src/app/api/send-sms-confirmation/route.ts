import { NextRequest, NextResponse } from 'next/server';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { z } from 'zod';
import { createErrorResponse, createSuccessResponse, validateRequestBody, applyRateLimit } from '@/lib/api-utils';

const lambda = new LambdaClient({ region: process.env.AWS_REGION || 'us-east-1' });

const RegistrationDataSchema = z.object({
  registration: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(7),
    streetAddress: z.string().min(1),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
    city: z.string().min(1),
    state: z.string().min(1),
    timeSlot: z.string().min(1),
    numberOfKids: z.number().int().min(0),
    referredBy: z.string().optional(),
    registrationDate: z.string()
  })
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = applyRateLimit(request, 20, 60000);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate request body
    const validation = await validateRequestBody(request, RegistrationDataSchema);
    if (!validation.success) {
      return validation.response;
    }
    
    const { registration } = validation.data;

    console.log('📱 Invoking send-sms-confirmation Lambda function');

    // Invoke the Lambda function
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
        return createSuccessResponse({ message: 'SMS confirmation sent successfully' });
      } else {
        console.error('❌ Lambda function failed:', result);
        return createErrorResponse('Failed to send SMS confirmation', 'SMS_SEND_FAILED', 500, result);
      }
    }

    return createErrorResponse('No response from Lambda function', 'NO_LAMBDA_RESPONSE', 500);

  } catch (error) {
    console.error('❌ Error in send-sms-confirmation API:', error);
    return createErrorResponse('Internal server error', 'INTERNAL_ERROR', 500, error instanceof Error ? error.message : 'Unknown error');
  }
}