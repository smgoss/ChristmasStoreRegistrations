import { NextRequest, NextResponse } from 'next/server';
import { LambdaClient, InvokeCommand } from '@aws-sdk/client-lambda';

const lambda = new LambdaClient({ region: process.env.AWS_REGION || 'us-east-1' });

export async function POST(request: NextRequest) {
  try {
    const { registration } = await request.json();

    if (!registration) {
      return NextResponse.json(
        { error: 'Missing registration data' },
        { status: 400 }
      );
    }

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
        return NextResponse.json({ success: true, message: 'SMS confirmation sent successfully' });
      } else {
        console.error('❌ Lambda function failed:', result);
        return NextResponse.json(
          { error: 'Failed to send SMS confirmation', details: result },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'No response from Lambda function' },
      { status: 500 }
    );

  } catch (error) {
    console.error('❌ Error in send-sms-confirmation API:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}