import { NextRequest, NextResponse } from 'next/server';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

const lambda = new LambdaClient({ region: process.env.AWS_REGION || 'us-east-1' });

export async function POST(request: NextRequest) {
  try {
    const { email, inviteLink, token } = await request.json();

    if (!email || !inviteLink || !token) {
      return NextResponse.json(
        { error: 'Missing required fields: email, inviteLink, token' },
        { status: 400 }
      );
    }

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
        return NextResponse.json({ success: true, message: 'Invite email sent successfully' });
      } else {
        console.error('❌ Lambda function failed:', result);
        return NextResponse.json(
          { error: 'Failed to send invite email', details: result },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'No response from Lambda function' },
      { status: 500 }
    );

  } catch (error) {
    console.error('❌ Error in send-invite-email API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}