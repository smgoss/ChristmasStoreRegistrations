import { NextRequest, NextResponse } from 'next/server';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';
import { z } from 'zod';
import { createErrorResponse, createSuccessResponse, validateRequestBody, applyRateLimit } from '@/lib/api-utils';

const lambda = new LambdaClient({ region: process.env.AWS_REGION || 'us-east-1' });

const InviteEmailSchema = z.object({
  email: z.string().email('Invalid email format'),
  inviteLink: z.string().url('Invalid invite link URL'),
  token: z.string().min(1, 'Token is required')
});

export async function POST(request: NextRequest) {
  try {
    // Apply rate limiting
    const rateLimitResponse = applyRateLimit(request, 15, 60000);
    if (rateLimitResponse) {
      return rateLimitResponse;
    }

    // Validate request body
    const validation = await validateRequestBody(request, InviteEmailSchema);
    if (!validation.success) {
      return validation.response;
    }
    
    const { email, inviteLink, token } = validation.data;

    console.log('📧 Invoking send-invite-email Lambda function');

    // Invoke the Lambda function
    const command = new InvokeCommand({
      FunctionName: process.env.SEND_INVITE_EMAIL_FUNCTION_NAME || 'send-invite-email',
      Payload: JSON.stringify({
        email,
        inviteLink,
        token
      }),
    });

    const response = await lambda.send(command);
    
    if (response.Payload) {
      const result = JSON.parse(new TextDecoder().decode(response.Payload));
      
      if (result.statusCode === 200) {
        console.log('✅ Invite email sent successfully');
        return createSuccessResponse({ message: 'Invite email sent successfully' });
      } else {
        console.error('❌ Lambda function failed:', result);
        return createErrorResponse('Failed to send invite email', 'EMAIL_SEND_FAILED', 500, result);
      }
    }

    return createErrorResponse('No response from Lambda function', 'NO_LAMBDA_RESPONSE', 500);

  } catch (error) {
    console.error('❌ Error in send-invite-email API:', error);
    return createErrorResponse('Internal server error', 'INTERNAL_ERROR', 500, error instanceof Error ? error.message : 'Unknown error');
  }
}