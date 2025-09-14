import { secret } from '@aws-amplify/backend';

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timeSlot: string;
  numberOfKids: number;
  referredBy?: string;
  confirmationToken?: string;
  registrationDate: string;
}

export const handler = async (event: any) => {
  try {
    console.log('📱 Sending SMS confirmation:', event);
    
    const { registration }: { registration: RegistrationData } = event.arguments || event;
    
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
      return {
        success: true,
        message: 'SMS confirmation sent successfully'
      };
    } else {
      console.error('❌ Failed to send SMS:', response.error);
      return {
        success: false,
        message: 'Failed to send SMS confirmation'
      };
    }
  } catch (error) {
    console.error('❌ Error in SMS confirmation handler:', error);
    return {
      success: false,
      message: 'Error sending SMS confirmation'
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
📅 Time: ${registration.timeSlot}
👶 Children: ${registration.numberOfKids}

We look forward to seeing you! Please arrive 15 minutes early and bring a photo ID.

Questions? Reply to this message or call the office.

- Christmas Store Team`;
}

async function sendClearstreamSms(phone: string, message: string) {
  try {
    // Get API key from environment variable (populated by Amplify secret)
    const apiKey = secret('CLEAR_STREAM_API_KEY');
    const textHeader = 'Pathway Christmas Store';
    
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
        'X-Api-Key': apiKey.resolve.toString(),
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