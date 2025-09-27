import type { Handler } from 'aws-lambda';
import { SecretsManagerClient, GetSecretValueCommand } from '@aws-sdk/client-secrets-manager';
interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress?: string;
  zipCode?: string;
  city?: string;
  state?: string;
  timeSlot: string;
  numberOfKids: number;
  referredBy?: string;
  confirmationToken?: string;
  confirmationUrl?: string; // For final confirmation SMS
  registrationDate?: string;
}

export const handler: Handler = async (event: any) => {
  try {
    console.log('📱 Sending SMS confirmation:', event);
    
    const { registration, registrationId, message, messageId }: { 
      registration: RegistrationData; 
      registrationId?: string;
      message?: string;
      messageId?: string;
    } = event.arguments || event;
    
    if (!registration.phone) {
      console.log('ℹ️ No phone number provided, skipping SMS');
      return {
        success: true,
        message: 'No phone number provided, SMS skipped'
      };
    }

    // Clean phone number (ensure it has country code)
    const cleanPhone = cleanPhoneNumber(registration.phone);
    
    // Check if this is a custom message
    let smsContent: string;
    if (message && messageId) {
      console.log('📱 Sending custom SMS message:', { messageId });
      smsContent = generateCustomSmsContent(registration, message);
    } else {
      smsContent = generateSmsContent(registration);
    }
    
    const response = await sendClearstreamSms(cleanPhone, smsContent);
    
    if (response.success) {
      console.log('✅ SMS confirmation sent successfully');
      
      // Update registration with successful SMS delivery status
      if (registrationId) {
        console.log('✅ SMS sent successfully for registration:', registrationId);
        // TODO: Update registration record with smsDeliveryStatus: 'sent', smsDeliveryAttemptedAt: now
      }
      
      return {
        success: true,
        message: 'SMS confirmation sent successfully'
      };
    } else {
      console.error('❌ Failed to send SMS:', response.error);
      
      // Update registration with failed SMS delivery status
      if (registrationId) {
        console.log('❌ SMS delivery failed for registration:', registrationId);
        // TODO: Update registration record with smsDeliveryStatus: 'failed', smsFailureReason: response.error
      }
      
      return {
        success: false,
        message: 'Failed to send SMS confirmation',
        error: response.error
      };
    }
  } catch (error) {
    console.error('❌ Error in SMS confirmation handler:', error);
    
    // Update registration with failed SMS delivery status
    if (event.arguments?.registrationId || event.registrationId) {
      console.log('❌ SMS delivery failed with exception');
      // TODO: Update registration record with smsDeliveryStatus: 'failed', smsFailureReason: error.message
    }
    
    return {
      success: false,
      message: 'Error sending SMS confirmation',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

function cleanPhoneNumber(phone: string): string {
  // If it already has a + and looks like a valid international number, preserve it
  if (phone.startsWith('+') && phone.replace(/\D/g, '').length >= 10) {
    // For US numbers starting with +1, ensure they're formatted correctly
    if (phone.startsWith('+1') && phone.replace(/\D/g, '').length === 11) {
      return phone;
    }
    // For other international numbers, preserve as-is if they look valid
    if (!phone.startsWith('+1')) {
      return phone;
    }
  }
  
  // Remove all non-numeric characters
  const digits = phone.replace(/\D/g, '');
  
  // Add +1 if it's a 10-digit US number
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  
  // Add + if it starts with country code but missing +
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  
  // Default to adding +1 for US numbers
  return `+1${digits}`;
}

function formatTimeSlot(timeSlot: string): string {
  // Handle formats like "09:30" -> "9:30 AM" or "13:30" -> "1:30 PM"
  const timeParts = timeSlot.split(':');
  if (timeParts.length === 2) {
    let hour = parseInt(timeParts[0], 10);
    const minute = timeParts[1];
    
    if (hour === 0) {
      return `12:${minute} AM`;
    } else if (hour < 12) {
      return `${hour}:${minute} AM`;
    } else if (hour === 12) {
      return `12:${minute} PM`;
    } else {
      return `${hour - 12}:${minute} PM`;
    }
  }
  
  // If not in expected format, return as-is
  return timeSlot;
}

function generateCustomSmsContent(registration: RegistrationData, message: string): string {
  return `🎄 Pathway Christmas Store

Hi ${registration.firstName}!

${message}

Your Time: ${formatTimeSlot(registration.timeSlot)}
Event: Sat, Dec 13, 2025

Questions? Call (207) 746-9089

- Pathway Christmas Store`;
}

function generateSmsContent(registration: RegistrationData): string {
  const displayTimeSlot = formatTimeSlot(registration.timeSlot);
  
  // Check if this is a final confirmation SMS
  if (registration.confirmationUrl) {
    const cancelUrl = registration.confirmationUrl.replace('/confirm-final/', '/cancel-registration/');
    
    return `🚨 URGENT: Confirm Your Christmas Store Registration

Hi ${registration.firstName}! You MUST confirm your time slot or risk losing it to another family.

📅 Saturday, Dec 13th, 2025
🕘 Your Time: ${displayTimeSlot}  
👶 Children: ${registration.numberOfKids}

✅ CONFIRM NOW: ${registration.confirmationUrl}

❌ CAN'T ATTEND? CANCEL: ${cancelUrl}

Failure to confirm may result in your time slot being given to someone else.

Questions? Call (208) 746-9089

- Pathway Christmas Store`;
  }
  
  // Regular confirmation SMS
  return `🎄 Christmas Store Registration Confirmed!

Hello ${registration.firstName}!

Your registration is confirmed for:
📅 Saturday, December 13th, 2025
🕘 Time: ${displayTimeSlot}
📍 Location: 12 Foss Road, Lewiston, ME 04256
👶 Children: ${registration.numberOfKids}

We look forward to seeing you!

Questions? Call (208) 746-9089 or reply to this message.

- Pathway Vineyard Christmas Store`;
}

async function sendClearstreamSms(phone: string, message: string) {
  try {
    const textHeader = process.env.CLEARSTREAM_TEXT_HEADER || 'Pathway Christmas Store';
    
    // Try environment variable first
    let apiKey = process.env.CLEAR_STREAM_API_KEY;
    console.log('Environment variable API key:', JSON.stringify(apiKey?.substring(0, 10)));
    
    // If environment variable doesn't work, try getting from Secrets Manager directly
    if (!apiKey || apiKey.includes('<value')) {
      console.log('Environment variable failed, trying Secrets Manager...');
      const secretsClient = new SecretsManagerClient({ region: process.env.AWS_REGION });
      
      try {
        const secretName = `amplify-${process.env.AWS_AMPLIFY_IDENTIFIER || 'christmasstoreregistration'}-CLEAR_STREAM_API_KEY`;
        console.log('Trying secret name:', secretName);
        
        const command = new GetSecretValueCommand({ SecretId: secretName });
        const result = await secretsClient.send(command);
        apiKey = result.SecretString;
        console.log('Secrets Manager API key:', JSON.stringify(apiKey?.substring(0, 10)));
      } catch (secretError) {
        console.error('Secrets Manager error:', secretError);
        // Try alternative secret name format
        try {
          const alternativeSecretName = `CLEAR_STREAM_API_KEY`;
          console.log('Trying alternative secret name:', alternativeSecretName);
          const altCommand = new GetSecretValueCommand({ SecretId: alternativeSecretName });
          const altResult = await secretsClient.send(altCommand);
          apiKey = altResult.SecretString;
          console.log('Alternative Secrets Manager API key:', JSON.stringify(apiKey?.substring(0, 10)));
        } catch (altError) {
          console.error('Alternative Secrets Manager error:', altError);
        }
      }
    }
    
    console.log('Environment variables check:');
    console.log('CLEARSTREAM_TEXT_HEADER:', textHeader);
    console.log('CLEAR_STREAM_API_KEY exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length);
    console.log('API Key type:', typeof apiKey);
    console.log('Final API Key first 10 chars:', JSON.stringify(apiKey?.substring(0, 10)));
    
    // Log the exact body being sent to Clearstream
    const requestBody = new URLSearchParams({
      to: phone,
      text_header: textHeader,
      text_body: message,
    });
    console.log('Clearstream request body:', requestBody.toString());
    
    if (!apiKey || apiKey.includes('<value')) {
      console.error('Available environment variables:', Object.keys(process.env));
      throw new Error('CLEAR_STREAM_API_KEY not found in environment or Secrets Manager');
    }
    
    const response = await fetch('https://api.getclearstream.com/v1/texts', {
      method: 'POST',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        to: phone,
        text_header: textHeader,
        text_body: message,
      }),
    });
    
    if (response.ok) {
      const result = await response.text();
      console.log('Clearstream API response:', result);
      return { success: true, data: result };
    } else {
      const error = await response.text();
      console.error('Clearstream API error:', error);
      return { success: false, error: error };
    }
  } catch (error) {
    console.error('Error calling Clearstream API:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}