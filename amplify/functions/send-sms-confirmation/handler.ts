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

interface RegistrationConfig {
  id: string;
  locationName?: string;
  eventAddress?: string;
  contactPhone?: string;
  textingNumber?: string;
  replyToEmail?: string;
}

interface GraphQLResponse {
  data?: {
    listRegistrationConfigs?: {
      items: RegistrationConfig[];
    };
  };
  errors?: Array<{ message: string }>;
}

async function getRegistrationConfig(): Promise<RegistrationConfig | null> {
  try {
    // Use GraphQL API to fetch config - it automatically uses the correct table
    const apiUrl = process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT;
    const apiKey = process.env.AMPLIFY_DATA_API_KEY;

    if (!apiUrl || !apiKey) {
      console.error('❌ GraphQL endpoint or API key not set');
      return null;
    }

    // Determine the config ID based on the branch
    const configId = process.env.AMPLIFY_BRANCH || 'main';
    console.log('📋 Fetching config for branch:', configId);

    const query = `
      query ListConfigs {
        listRegistrationConfigs {
          items {
            id
            locationName
            eventAddress
            contactPhone
            textingNumber
            replyToEmail
          }
        }
      }
    `;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        query
      })
    });

    const result = await response.json() as GraphQLResponse;

    if (result.errors) {
      console.error('❌ GraphQL errors:', result.errors);
      return null;
    }

    // Find the config that matches our branch ID
    const configs = result.data?.listRegistrationConfigs?.items || [];
    const config = configs.find(c => c.id === configId);

    if (config) {
      console.log('📋 Found config via GraphQL:', JSON.stringify(config, null, 2));
      return {
        id: config.id,
        locationName: config.locationName,
        eventAddress: config.eventAddress,
        contactPhone: config.contactPhone,
        textingNumber: config.textingNumber,
        replyToEmail: config.replyToEmail
      };
    }

    console.log('📋 No config found with ID', configId);
    return null;
  } catch (error) {
    console.error('❌ Error fetching registration config:', error);
    return null;
  }
}

interface SmsEvent {
  arguments?: {
    registration: RegistrationData;
    registrationId?: string;
    message?: string;
    messageId?: string;
  };
  registration?: RegistrationData;
  registrationId?: string;
  message?: string;
  messageId?: string;
}

export const handler: Handler = async (event: SmsEvent) => {
  try {
    console.log('📱 Sending SMS confirmation:', event);
    
    const eventData = event.arguments || event;
    const registration = eventData.registration;
    const registrationId = eventData.registrationId;
    const message = eventData.message;
    const messageId = eventData.messageId;
    
    if (!registration) {
      throw new Error('Registration data is required');
    }
    
    if (!registration.phone) {
      console.log('ℹ️ No phone number provided, skipping SMS');
      return {
        success: true,
        message: 'No phone number provided, SMS skipped'
      };
    }

    // Clean phone number (ensure it has country code)
    const cleanPhone = cleanPhoneNumber(registration.phone);
    
    // Fetch registration configuration for location-specific info
    const config = await getRegistrationConfig();
    console.log('📱 Fetched registration config:', config);
    
    // Check if this is a custom message
    let smsContent: string;
    if (message && messageId) {
      console.log('📱 Sending custom SMS message:', { messageId });
      smsContent = generateCustomSmsContent(registration, message, config);
    } else {
      smsContent = generateSmsContent(registration, config);
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
    const hour = parseInt(timeParts[0], 10);
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

function generateCustomSmsContent(registration: RegistrationData, message: string, config: RegistrationConfig | null): string {
  const locationName = config?.locationName || 'Pathway Christmas Store';
  const contactPhone = config?.contactPhone || '(207) 746-9089';
  
  return `🎄 ${locationName}

Hi ${registration.firstName}!

${message}

Your Time: ${formatTimeSlot(registration.timeSlot)}
Event: Sat, Dec 13, 2025

Questions? Call ${contactPhone}

- ${locationName}`;
}

function generateSmsContent(registration: RegistrationData, config: RegistrationConfig | null): string {
  const displayTimeSlot = formatTimeSlot(registration.timeSlot);
  const locationName = config?.locationName || 'Pathway Christmas Store';
  const eventAddress = config?.eventAddress || 'Event Location TBD';
  const contactPhone = config?.contactPhone || '(208) 746-9089';
  
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

Questions? Call ${contactPhone}

- ${locationName}`;
  }
  
  // Regular confirmation SMS
  return `🎄 Registration Confirmed!

Hi ${registration.firstName}!

📅 Sat, Dec 13, 2025
🕘 ${displayTimeSlot}
📍 ${eventAddress}
👶 Children: ${registration.numberOfKids}

Questions? ${contactPhone}

- ${locationName}`;
}

async function sendClearstreamSms(phone: string, message: string) {
  try {
    const textHeader = 'Pathway Christmas Store';

    const apiKey = await getApiKey();

    console.log('Environment variables check:');
    console.log('CLEARSTREAM_TEXT_HEADER:', textHeader);
    console.log('CLEAR_STREAM_API_KEY exists:', !!apiKey);
    console.log('API Key length:', apiKey?.length);
    console.log('API Key type:', typeof apiKey);
    console.log('Final API Key first 10 chars:', JSON.stringify(apiKey?.substring(0, 10)));

    // Split message into chunks if needed
    // Clearstream limit is 335 chars total (header + body)
    // Account for header length and separator
    const CLEARSTREAM_TOTAL_LIMIT = 335;
    const headerLength = textHeader.length;
    const separatorLength = 2; // Clearstream adds separator between header and body
    const maxBodyLength = CLEARSTREAM_TOTAL_LIMIT - headerLength - separatorLength;

    const chunks = splitMessage(message, maxBodyLength);
    console.log(`Message split into ${chunks.length} chunk(s) (max body length: ${maxBodyLength} chars)`);

    const results = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      const partInfo = chunks.length > 1 ? ` (${i + 1}/${chunks.length})` : '';
      console.log(`Sending chunk ${i + 1}/${chunks.length} (${chunk.length} chars)${partInfo}`);

      // Log the exact body being sent to Clearstream
      const requestBody = new URLSearchParams({
        to: phone,
        text_header: textHeader,
        text_body: chunk,
      });
      console.log('Clearstream request body:', requestBody.toString());

      const result = await sendSingleSms(phone, chunk, apiKey);
      results.push(result);

      if (!result.success) {
        console.error(`Failed to send chunk ${i + 1}/${chunks.length}`);
        return { success: false, error: result.error };
      }

      // Wait 1 second between sends (except for the last one)
      if (i < chunks.length - 1) {
        console.log('Waiting 1 second before next chunk...');
        await delay(1000);
      }
    }

    return { success: true, data: `Sent ${chunks.length} message(s) successfully` };
  } catch (error) {
    console.error('Error sending SMS:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Helper function to get API key from environment or Secrets Manager
async function getApiKey(): Promise<string> {
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

  if (!apiKey || apiKey.includes('<value')) {
    console.error('Available environment variables:', Object.keys(process.env));
    throw new Error('CLEAR_STREAM_API_KEY not found in environment or Secrets Manager');
  }

  return apiKey;
}

// Helper function to send a single SMS chunk
async function sendSingleSms(phone: string, message: string, apiKey: string) {
  const textHeader = process.env.CLEARSTREAM_TEXT_HEADER || 'Pathway Christmas Store';

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
}

// Helper function to split message into chunks
// maxLength should account for the header and separator that Clearstream adds
function splitMessage(message: string, maxLength: number = 309): string[] {
  if (message.length <= maxLength) {
    return [message];
  }

  const chunks: string[] = [];
  let remaining = message;

  while (remaining.length > 0) {
    if (remaining.length <= maxLength) {
      chunks.push(remaining);
      break;
    }

    // Find the last space before maxLength to avoid breaking words
    let splitIndex = maxLength;
    const lastSpace = remaining.lastIndexOf(' ', maxLength);
    if (lastSpace > maxLength * 0.7) { // Only use space if it's not too far back
      splitIndex = lastSpace;
    }

    chunks.push(remaining.substring(0, splitIndex).trim());
    remaining = remaining.substring(splitIndex).trim();
  }

  return chunks;
}

// Helper function to delay execution
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}