import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { Handler } from 'aws-lambda';

const ses = new SESClient({ region: process.env.AWS_REGION });

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
  children?: Array<{ age: number | string; gender: string }> | string;
}

interface RegistrationConfig {
  id: string;
  locationName?: string;
  eventAddress?: string;
  replyToEmail?: string;
  contactPhone?: string;
}

interface GraphQLResponse {
  data?: {
    listRegistrationConfigs?: {
      items: RegistrationConfig[];
    };
  };
  errors?: Array<{ message: string }>;
}

async function getRegistrationConfig(): Promise<RegistrationConfig> {
  try {
    // Use GraphQL API to fetch config - it automatically uses the correct table
    const apiUrl = process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT;
    const apiKey = process.env.AMPLIFY_DATA_API_KEY;

    if (!apiUrl || !apiKey) {
      console.error('❌ GraphQL endpoint or API key not set');
      return {
        id: '',
        locationName: undefined,
        eventAddress: undefined,
        replyToEmail: undefined,
        contactPhone: undefined
      };
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
            replyToEmail
            contactPhone
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
      return {
        id: '',
        locationName: undefined,
        eventAddress: undefined,
        replyToEmail: undefined,
        contactPhone: undefined
      };
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
        replyToEmail: config.replyToEmail,
        contactPhone: config.contactPhone
      };
    }

    console.log('📋 No config found with ID', configId);
    return {
      id: '',
      locationName: undefined,
      eventAddress: undefined,
      replyToEmail: undefined,
      contactPhone: undefined
    };
  } catch (error) {
    console.error('❌ Error fetching registration config:', error);
    return {
      id: '',
      locationName: undefined,
      eventAddress: undefined,
      replyToEmail: undefined,
      contactPhone: undefined
    };
  }
}

export const handler: Handler = async (event: {arguments?: {registration: RegistrationData; registrationId?: string}}) => {
  try {
    console.log('📧 Sending cancellation email:', event);
    
    const { registration } = event.arguments || {};

    if (!registration) {
      console.error('❌ No registration data provided');
      return {
        success: false,
        message: 'No registration data provided',
        error: 'Registration data is required'
      };
    }

    // Fetch location config from database
    const config = await getRegistrationConfig();
    console.log('🎯 Config retrieved in handler:', JSON.stringify(config, null, 2));
    
    const emailContent = generateCancellationEmailContent(registration, config);

    const command = new SendEmailCommand({
      Source: process.env.FROM_EMAIL || 'Pathway Vineyard Christmas Store <christmas-store@pathwayvineyard.com>',
      ReplyToAddresses: [config.replyToEmail || 'office@pathwayvineyard.com'],
      Destination: {
        ToAddresses: [registration.email],
      },
      Message: {
        Subject: {
          Data: '🚫 Christmas Store Registration Cancelled - ' + registration.timeSlot,
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: emailContent,
            Charset: 'UTF-8',
          },
        },
      },
    });

    console.log('📤 About to send cancellation email via SES...');
    const result = await ses.send(command);
    console.log('✅ SES send result:', result);

    console.log('🎉 Cancellation email completed successfully');
    return {
      success: true,
      message: 'Cancellation email sent successfully',
      messageId: result.MessageId,
    };
  } catch (error) {
    console.error('Error sending cancellation email:', error);
    
    return {
      success: false,
      message: 'Failed to send cancellation email',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

function formatPhoneForDisplay(phone: string): string {
  // Remove all non-numeric characters
  const digits = phone.replace(/\D/g, '');
  
  // For 10-digit US numbers, return as-is
  if (digits.length === 10) {
    return digits;
  }
  
  // If it's 11 digits starting with 1, remove the leading 1
  if (digits.length === 11 && digits.startsWith('1')) {
    return digits.substring(1);
  }
  
  // If it starts with +1, remove the +1 prefix
  if (phone.startsWith('+1')) {
    return phone.substring(2).replace(/\D/g, '');
  }
  
  // For other formats, just return the cleaned digits
  return digits;
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

function generateCancellationEmailContent(registration: RegistrationData, config: Partial<RegistrationConfig> = {}): string {
  console.log('📧 generateCancellationEmailContent called with config:', JSON.stringify(config, null, 2));
  
  // Get location config from database with fallbacks to environment variables and defaults
  const locationName = config.locationName || process.env.LOCATION_NAME || 'Pathway Christmas Store';
  const locationAddress = config.eventAddress || process.env.LOCATION_ADDRESS || 'Event Location TBD';
  const contactEmail = config.replyToEmail || process.env.CONTACT_EMAIL || 'office@pathwayvineyard.com';
  const contactPhone = config.contactPhone || process.env.CONTACT_PHONE || '(208) 746-9089';
  const locationEmoji = process.env.LOCATION_EMOJI || '';
  
  console.log('📧 Using locationName:', locationName);
  console.log('📧 Using locationAddress:', locationAddress);
  console.log('📧 Using contactEmail:', contactEmail);
  
  // Format phone number for display (remove +1 if present)
  const displayPhone = formatPhoneForDisplay(registration.phone);
  console.log('📧 Original phone:', registration.phone);
  console.log('📧 Display phone:', displayPhone);
  
  // Format time slot for display (remove leading 0 and add AM/PM)
  const displayTimeSlot = formatTimeSlot(registration.timeSlot);
  console.log('📧 Original time slot:', registration.timeSlot);
  console.log('📧 Display time slot:', displayTimeSlot);
  
  // Handle children data safely - it might be JSON string or array
  let childrenArray: Array<{ age: number | string; gender: string }> = [];
  
  if (registration.children) {
    try {
      // If children is a string (JSON), parse it
      if (typeof registration.children === 'string') {
        childrenArray = JSON.parse(registration.children);
      } else if (Array.isArray(registration.children)) {
        childrenArray = registration.children;
      } else {
        console.log('Unexpected children format:', typeof registration.children, registration.children);
      }
    } catch (error) {
      console.error('Error parsing children data:', error);
      childrenArray = [];
    }
  }

  const childrenInfo = childrenArray.map(
    (child, index) => `<li>Child ${index + 1}: Age ${child.age}, ${child.gender}</li>`
  ).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Christmas Store Registration Cancelled - ${locationName}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
          background: linear-gradient(rgba(185, 28, 28, 0.7), rgba(5, 150, 105, 0.7)), url('https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          color: white; 
          text-align: center; 
          padding: 48px 30px; 
          border-radius: 16px; 
          position: relative;
          overflow: hidden;
        }
        .header h1 { 
          font-size: 2rem; 
          font-weight: 700; 
          margin: 0 0 1rem 0; 
          text-shadow: 0 2px 8px rgb(0 0 0 / 0.8), 0 0 20px rgb(0 0 0 / 0.5); 
        }
        .header h2 { 
          font-size: 1.25rem; 
          font-weight: 600; 
          margin: 0 0 0.5rem 0; 
          opacity: 0.95; 
          text-shadow: 0 2px 6px rgb(0 0 0 / 0.7); 
        }
        .header p { 
          margin: 0; 
          opacity: 0.9; 
          text-shadow: 0 2px 6px rgb(0 0 0 / 0.7); 
        }
        .header .emoji { 
          font-size: 3rem; 
          margin-bottom: 1rem; 
          display: block; 
          filter: drop-shadow(0 4px 8px rgb(0 0 0 / 0.8)); 
        }
        .content { background-color: #fef2f2; padding: 20px; margin: 20px 0; border-radius: 5px; border: 1px solid #fecaca; }
        .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
        .highlight { background-color: #fee2e2; padding: 15px; border-radius: 5px; margin: 15px 0; border: 1px solid #fca5a5; }
        ul { list-style-type: none; padding-left: 0; }
        li { margin: 5px 0; }
        .church-info { background-color: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
        .important-notice { background-color: #fef3c7; padding: 15px; border-radius: 5px; margin: 15px 0; border: 1px solid #fbbf24; }
      </style>
    </head>
    <body>
      <div class="header">
        ${locationEmoji ? `<span class="emoji">${locationEmoji}</span>` : ''}
        <h1>🚫 Christmas Store Registration Cancelled</h1>
        <h2>${locationName}</h2>
        <p>${locationAddress}</p>
        <p style="font-size: 18px; font-weight: bold; margin-top: 15px;">📅 Saturday, December 13th, 2025</p>
      </div>
      
      <div class="content">
        <h2>Dear ${registration.firstName} ${registration.lastName},</h2>
        
        <p>We're writing to confirm that your Christmas Store registration has been <strong>cancelled</strong> as requested.</p>
        
        <div class="highlight">
          <h3>📋 Cancelled Registration Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${registration.firstName} ${registration.lastName}</li>
            <li><strong>Email:</strong> ${registration.email}</li>
            <li><strong>Phone:</strong> ${displayPhone}</li>
            <li><strong>Address:</strong> ${registration.streetAddress}, ${registration.city}, ${registration.state} ${registration.zipCode}</li>
            <li><strong>Time Slot:</strong> ${displayTimeSlot}</li>
            <li><strong>Number of Children:</strong> ${registration.numberOfKids}</li>
            ${registration.referredBy ? `<li><strong>Referred by:</strong> ${registration.referredBy}</li>` : ''}
          </ul>
          
          ${registration.numberOfKids > 0 ? `
            <h4>Children Information:</h4>
            <ul>
              ${childrenInfo}
            </ul>
          ` : ''}
        </div>
        
        <p>If you cancelled by mistake or need to register again, please contact us as soon as possible. We may be able to help you secure another time slot if available.</p>
        
        <p>We're sorry we won't be seeing you at this year's Christmas Store. We hope you'll consider joining us next year!</p>
        
        <p>Warm regards,<br>The Pathway Christmas Store Team<br>${locationName}</p>
      </div>
      
      <div class="church-info">
        <h3>Contact Information:</h3>
        <p>📧 Email: ${contactEmail}</p>
        <p>📞 Phone: ${contactPhone}</p>
        <p>🌐 Website: pathwayvineyard.com</p>
      </div>
      
      <div class="footer">
        <p>This is an automated cancellation confirmation email. If you have questions, please contact us using the information above.</p>
      </div>
    </body>
    </html>
  `;
}