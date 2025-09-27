import { NextRequest, NextResponse } from 'next/server';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../../amplify/data/resource';
import { ensureAmplifyConfigured } from '@/lib/amplify';

let client: ReturnType<typeof generateClient<Schema>> | null = null;
const getClient = async () => {
  if (!client) {
    await ensureAmplifyConfigured();
    client = generateClient<Schema>();
  }
  return client;
};

export async function POST(request: NextRequest) {
  try {
    console.log('📤 Resend confirmation API called');
    
    const body = await request.json();
    console.log('📋 Request body:', body);
    
    const { type, registrationId, firstName, email } = body;
    
    if (!type || !registrationId) {
      return NextResponse.json(
        { error: 'Missing required fields: type and registrationId' },
        { status: 400 }
      );
    }
    
    const client = await getClient();
    
    if (type === 'sms') {
      console.log('📱 Sending SMS confirmation via GraphQL mutation');
      
      // Get full registration data first
      const { data: registrations } = await client.models.Registration.list({
        filter: { id: { eq: registrationId } }
      });
      
      const registration = registrations[0];
      if (!registration) {
        return NextResponse.json(
          { error: 'Registration not found' },
          { status: 404 }
        );
      }
      
      console.log('📱 Found registration for SMS:', registration.id);
      
      // Call the SMS confirmation mutation with full registration object
      const smsResult = await client.graphql({
        query: `
          mutation SendSmsConfirmation($registration: SendSmsConfirmationRegistrationInput!) {
            sendSmsConfirmation(registration: $registration) {
              success
              message
            }
          }
        `,
        variables: {
          registration: {
            firstName: registration.firstName,
            lastName: registration.lastName,
            email: registration.email,
            phone: registration.phone,
            streetAddress: registration.streetAddress || '',
            zipCode: registration.zipCode || '',
            city: registration.city || '',
            state: registration.state || '',
            timeSlot: registration.timeSlot,
            numberOfKids: registration.numberOfKids || 0,
            referredBy: registration.referredBy || '',
            registrationDate: registration.registrationDate || new Date().toISOString()
          }
        }
      });
      
      console.log('📱 SMS mutation result:', smsResult);
      
      if ('errors' in smsResult && smsResult.errors) {
        console.error('❌ SMS mutation errors:', smsResult.errors);
        return NextResponse.json(
          { error: 'Failed to send SMS', details: smsResult.errors },
          { status: 500 }
        );
      }
      
      const smsData = ('data' in smsResult) ? smsResult.data?.sendSmsConfirmation : undefined;
      if (!smsData?.success) {
        console.error('❌ SMS sending failed:', smsData?.message);
        return NextResponse.json(
          { error: 'SMS sending failed', message: smsData?.message },
          { status: 500 }
        );
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'SMS confirmation resent successfully',
        type: 'sms'
      });
    }
    
    if (type === 'email') {
      if (!email || !firstName) {
        return NextResponse.json(
          { error: 'Missing required email fields: email, firstName' },
          { status: 400 }
        );
      }
      
      console.log('📧 Sending email confirmation via GraphQL mutation');
      
      // Get full registration data first
      const { data: registrations } = await client.models.Registration.list({
        filter: { id: { eq: registrationId } }
      });
      
      const registration = registrations[0];
      if (!registration) {
        return NextResponse.json(
          { error: 'Registration not found' },
          { status: 404 }
        );
      }
      
      // Call the email confirmation mutation
      const emailResult = await client.graphql({
        query: `
          mutation SendConfirmationEmail($registration: SendConfirmationEmailRegistrationInput!) {
            sendConfirmationEmail(registration: $registration) {
              success
              message
            }
          }
        `,
        variables: {
          registration: {
            firstName: registration.firstName,
            lastName: registration.lastName,
            email: registration.email,
            phone: registration.phone,
            streetAddress: registration.streetAddress || '',
            zipCode: registration.zipCode || '',
            city: registration.city || '',
            state: registration.state || '',
            timeSlot: registration.timeSlot,
            numberOfKids: registration.numberOfKids || 0,
            referredBy: registration.referredBy || '',
            children: registration.children || []
          }
        }
      });
      
      console.log('📧 Email mutation result:', emailResult);
      
      if ('errors' in emailResult && emailResult.errors) {
        console.error('❌ Email mutation errors:', emailResult.errors);
        return NextResponse.json(
          { error: 'Failed to send email', details: emailResult.errors },
          { status: 500 }
        );
      }
      
      const emailData = ('data' in emailResult) ? emailResult.data?.sendConfirmationEmail : undefined;
      if (!emailData?.success) {
        console.error('❌ Email sending failed:', emailData?.message);
        return NextResponse.json(
          { error: 'Email sending failed', message: emailData?.message },
          { status: 500 }
        );
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Email confirmation resent successfully',
        type: 'email'
      });
    }
    
    return NextResponse.json(
      { error: 'Invalid type. Must be "sms" or "email"' },
      { status: 400 }
    );
    
  } catch (error) {
    console.error('❌ Resend confirmation error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}