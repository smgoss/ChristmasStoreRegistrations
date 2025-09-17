import type { Handler } from 'aws-lambda';
interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  zipCode: string;
  city: string;
  state: string;
  timeSlot: string;
  numberOfKids: number;
  referredBy?: string;
  confirmationToken?: string;
  registrationDate: string;
}

export const handler: Handler = async (event: any) => {
  try {
    console.log('📱 Sending SMS confirmation:', event);
    
    const { registration, registrationId }: { registration: RegistrationData; registrationId?: string } = event.arguments || event;
    
    if (!registration.phone) {
      console.log('ℹ️ No phone number provided, skipping SMS');
      return {
        success: true,
        message: 'No phone number provided, SMS skipped'
      };
    }

    // Clean phone number (ensure it has country code)
    const cleanPhone = cleanPhoneNumber(registration.phone);
    
    const smsContent = generateSmsContent(registration);
    
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
  
  return phone; // Return as-is if already formatted
}

function generateSmsContent(registration: RegistrationData): string {
  return `🎄 Christmas Store Registration Confirmed!

Hello ${registration.firstName}!

Your registration is confirmed for:
📅 Friday, December 6th, 2024
🕘 Time: ${registration.timeSlot}
👶 Children: ${registration.numberOfKids}

We look forward to seeing you!

Questions? Reply to this message or call the office.

- Pathway Christmas Store Team`;
}

async function sendClearstreamSms(phone: string, message: string) {
  try {
    // Get API key from environment variable (populated by Amplify secret)
    const apiKey = process.env.CLEAR_STREAM_API_KEY;
    const textHeader = process.env.CLEARSTREAM_TEXT_HEADER || 'Pathway Christmas Store';
    
    console.log('Environment variables check:');
    console.log('CLEARSTREAM_TEXT_HEADER:', textHeader);
    console.log('CLEAR_STREAM_API_KEY exists:', !!apiKey);
    
    if (!apiKey) {
      console.error('Available environment variables:', Object.keys(process.env));
      throw new Error('CLEAR_STREAM_API_KEY environment variable not found');
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