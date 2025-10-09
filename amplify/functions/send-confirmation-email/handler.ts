import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { Handler } from 'aws-lambda';

const ses = new SESClient({ region: process.env.AWS_REGION });

// Helper function to get default frontend URL based on branch
function getDefaultFrontendUrl(): string {
  const branch = process.env.AMPLIFY_BRANCH || 'main';
  switch (branch) {
    case 'lewiston':
      return 'https://lew-christmas-store.pathwayvineyard.com';
    case 'brunswick':
      return 'https://brun-christmas-store.pathwayvineyard.com';
    case 'gray':
      return 'https://gng-christmas-store.pathwayvineyard.com';
    default:
      return 'https://lew-christmas-store.pathwayvineyard.com';
  }
}

interface RegistrationData {
  id?: string;
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
  children?: Array<{ age: number | string; gender: string }> | string;
  confirmationUrl?: string; // For final confirmation emails
}

interface RegistrationConfig {
  id: string;
  locationName?: string;
  eventAddress?: string;
  replyToEmail?: string;
  contactPhone?: string;
  frontendUrl?: string;
}

interface GraphQLResponse {
  data?: {
    listRegistrationConfigs?: {
      items: RegistrationConfig[];
    };
  };
  errors?: Array<{ message: string }>;
}

interface WaitlistEntry {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  numberOfKids: number;
  preferredTimeSlots?: string;
}

interface EventType {
  arguments?: {
    registration?: RegistrationData;
    registrationId?: string;
    subject?: string;
    message?: string;
    messageId?: string;
    waitlistEntry?: WaitlistEntry;
    waitlistId?: string;
  };
  registrationId?: string;
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
        contactPhone: undefined,
        frontendUrl: undefined
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
            frontendUrl
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
        contactPhone: undefined,
        frontendUrl: undefined
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
        contactPhone: config.contactPhone,
        frontendUrl: config.frontendUrl
      };
    }

    console.log('📋 No config found with ID', configId);
    return {
      id: '',
      locationName: undefined,
      eventAddress: undefined,
      replyToEmail: undefined,
      contactPhone: undefined,
      frontendUrl: undefined
    };
  } catch (error) {
    console.error('❌ Error fetching registration config:', error);
    return {
      id: '',
      locationName: undefined,
      eventAddress: undefined,
      replyToEmail: undefined,
      contactPhone: undefined,
      frontendUrl: undefined
    };
  }
}

export const handler: Handler = async (event: EventType) => {
  try {
    console.log('📱 Sending Email confirmation:', event);
    
    const { registration, registrationId, subject, message, messageId, waitlistEntry, waitlistId } = event.arguments || {};

    // Check if this is a custom message
    if (subject && message && messageId && registration) {
      console.log('📧 Sending custom message:', { subject, messageId });
      const customEmailContent = generateCustomEmailContent(registration, subject, message);
      
      const command = new SendEmailCommand({
        Source: process.env.FROM_EMAIL || 'Pathway Vineyard Christmas Store <christmas-store@pathwayvineyard.com>',
        ReplyToAddresses: ['office@pathwayvineyard.com'],
        Destination: {
          ToAddresses: [registration.email],
        },
        Message: {
          Subject: {
            Charset: 'UTF-8',
            Data: subject,
          },
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: customEmailContent,
            },
          },
        },
      });

      const result = await ses.send(command);
      console.log('✅ Custom email sent successfully:', result);

      return {
        success: true,
        message: 'Custom email sent successfully',
        messageId: messageId
      };
    }

    // Check if this is a waitlist email
    if (waitlistEntry && waitlistId) {
      console.log('📧 Sending waitlist confirmation email:', { waitlistId });
      const config = await getRegistrationConfig();
      const emailContent = generateWaitlistEmailContent(waitlistEntry, config);
      
      const command = new SendEmailCommand({
        Source: process.env.FROM_EMAIL || 'Pathway Vineyard Christmas Store <christmas-store@pathwayvineyard.com>',
        ReplyToAddresses: ['office@pathwayvineyard.com'],
        Destination: {
          ToAddresses: [waitlistEntry.email],
        },
        Message: {
          Subject: {
            Charset: 'UTF-8',
            Data: '📋 You\'re on the Christmas Store Waitlist',
          },
          Body: {
            Html: {
              Charset: 'UTF-8',
              Data: emailContent,
            },
          },
        },
      });

      const result = await ses.send(command);
      console.log('✅ Waitlist email sent successfully:', result);

      return {
        success: true,
        message: 'Waitlist email sent successfully',
        messageId: result.MessageId
      };
    }
    
    // Regular confirmation email logic
    const config = await getRegistrationConfig();
    console.log('🎯 Config retrieved in handler:', JSON.stringify(config, null, 2));
    console.log('🎯 Config locationName:', config.locationName);
    console.log('🎯 Config eventAddress:', config.eventAddress);
    
    // Check if registration exists
    if (!registration) {
      console.error('❌ No registration data provided');
      return {
        success: false,
        message: 'No registration data provided'
      };
    }

    // Type guard to ensure registration is defined for the rest of the function
    const validRegistration = registration;

    // Use registrationId if available, otherwise fall back to registration.id
    const regId = registrationId || validRegistration.id;
    const emailContent = generateEmailContent(validRegistration, config, regId);

    const command = new SendEmailCommand({
      Source: process.env.FROM_EMAIL || 'Pathway Vineyard Christmas Store <christmas-store@pathwayvineyard.com>',
      ReplyToAddresses: ['office@pathwayvineyard.com'],
      Destination: {
        ToAddresses: [validRegistration.email],
      },
      Message: {
        Subject: {
          Data: '🎄 Christmas Store Registration Confirmed - ' + validRegistration.timeSlot,
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

    console.log('📤 About to send email via SES...');
    const result = await ses.send(command);
    console.log('✅ SES send result:', result);
    
    // Update registration with successful email delivery status
    if (registrationId) {
      // Note: Would need to import and configure DynamoDB client to update the registration
      console.log('✅ Email sent successfully, MessageId:', result.MessageId);
      // TODO: Update registration record with emailDeliveryStatus: 'sent', emailDeliveryAttemptedAt: now
    }

    console.log('🎉 Email confirmation completed successfully');
    return {
      success: true,
      message: 'Confirmation email sent successfully',
      messageId: result.MessageId,
    };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    
    // Update registration with failed email delivery status
    if (event.arguments?.registrationId || event.registrationId) {
      console.log('❌ Email delivery failed, updating status');
      // TODO: Update registration record with emailDeliveryStatus: 'failed', emailFailureReason: error.message
    }
    
    return {
      success: false,
      message: 'Failed to send confirmation email',
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

function formatAddressForEmail(address: string): string {
  // Convert newlines to <br> tags for HTML email display
  return address.replace(/\n/g, '<br>');
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

function generateWaitlistEmailContent(waitlistEntry: {firstName: string; lastName: string; email: string; phone?: string; numberOfKids: number}, config: Partial<RegistrationConfig> = {}): string {
  console.log('📧 generateWaitlistEmailContent called');
  
  // Get location config
  const locationName = config.locationName || process.env.LOCATION_NAME || 'Pathway Christmas Store';
  const locationAddress = config.eventAddress || process.env.LOCATION_ADDRESS || 'Event Location TBD';
  const contactEmail = config.replyToEmail || process.env.CONTACT_EMAIL || 'office@pathwayvineyard.com';
  const contactPhone = config.contactPhone || process.env.CONTACT_PHONE || '(208) 746-9089';
  const locationEmoji = process.env.LOCATION_EMOJI || '';
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>You're on the Christmas Store Waitlist - ${locationName}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
          background: linear-gradient(rgba(245, 158, 11, 0.9), rgba(251, 191, 36, 0.9));
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
        .header .emoji { 
          font-size: 3rem; 
          margin-bottom: 1rem; 
          display: block; 
          filter: drop-shadow(0 4px 8px rgb(0 0 0 / 0.8)); 
        }
        .waitlist-info { background-color: #fef3c7; border: 3px solid #f59e0b; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .waitlist-info h2 { color: #92400e; margin-top: 0; }
        .position-badge {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          padding: 15px 25px;
          border-radius: 50px;
          font-size: 24px;
          font-weight: bold;
          display: inline-block;
          margin: 20px 0;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.4);
        }
        .registration-details { background-color: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
        .info-box { background-color: #e0f2fe; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .contact-info { background-color: #f0f9ff; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        ${locationEmoji ? `<span class="emoji">${locationEmoji}</span>` : ''}
        <h1>📋 You're on the Waitlist!</h1>
        <p style="font-size: 18px; font-weight: bold; margin-top: 15px;">Christmas Store 2025</p>
      </div>
      
      <div class="waitlist-info">
        <h2>✅ Successfully Added to Waitlist</h2>
        <p><strong>Dear ${waitlistEntry.firstName} ${waitlistEntry.lastName},</strong></p>
        
        <p>Thank you for your interest in the ${locationName}! While all time slots are currently full, we've added you to our waitlist.</p>
        
        
        <p><strong>What happens next?</strong></p>
        <ul>
          <li>🔔 We'll contact you if a spot opens up</li>
          <li>📧 You'll receive priority access to available time slots</li>
          <li>⏰ Please respond quickly when we reach out to secure your spot</li>
        </ul>
      </div>
      
      <div class="registration-details">
        <h3>📋 Your Waitlist Information</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Name:</strong> ${waitlistEntry.firstName} ${waitlistEntry.lastName}</li>
          <li><strong>Email:</strong> ${waitlistEntry.email}</li>
          <li><strong>Phone:</strong> ${waitlistEntry.phone}</li>
          <li><strong>Number of Children:</strong> ${waitlistEntry.numberOfKids}</li>
          ${(waitlistEntry as { preferredTimeSlots?: string }).preferredTimeSlots ? `<li><strong>Preferred Times:</strong> ${(waitlistEntry as { preferredTimeSlots?: string }).preferredTimeSlots}</li>` : ''}
        </ul>
      </div>
      
      <div class="info-box">
        <h3>📍 Event Information</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Event:</strong> ${locationName}</li>
          <li><strong>Date:</strong> Saturday, December 13th, 2025</li>
          <li><strong>Location:</strong> ${formatAddressForEmail(locationAddress)}</li>
        </ul>
      </div>
      
      <div class="contact-info">
        <h3>❓ Questions or Need to Update Your Information?</h3>
        <p>📧 Email: ${contactEmail}</p>
        <p>📞 Phone: ${contactPhone}</p>
        <p>🌐 Website: pathwayvineyard.com</p>
        
        <p style="font-size: 14px; margin-top: 15px;">
          <strong>Important:</strong> Please keep this email as confirmation of your waitlist registration. 
          We'll contact you at ${waitlistEntry.email} or ${waitlistEntry.phone} if a spot becomes available.
        </p>
      </div>
      
      <div class="footer">
        <p>Thank you for your patience and for being part of our Christmas Store community!</p>
        <p>This is an automated message. Please do not reply to this email.</p>
      </div>
    </body>
    </html>
  `;
}

function generateFinalConfirmationEmailContent(registration: RegistrationData, config: Partial<RegistrationConfig> = {}, registrationId?: string): string {
  console.log('📧 generateFinalConfirmationEmailContent called');

  // Get location config
  const locationName = config.locationName || process.env.LOCATION_NAME || 'Pathway Christmas Store';
  const locationAddress = config.eventAddress || process.env.LOCATION_ADDRESS || 'Event Location TBD';
  const contactEmail = config.replyToEmail || process.env.CONTACT_EMAIL || 'office@pathwayvineyard.com';
  const contactPhone = config.contactPhone || process.env.CONTACT_PHONE || '(208) 746-9089';
  const locationEmoji = process.env.LOCATION_EMOJI || '';
  const frontendUrl = config.frontendUrl || getDefaultFrontendUrl();

  // Format time slot for display
  const displayTimeSlot = formatTimeSlot(registration.timeSlot);
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>URGENT: Confirm Your Christmas Store Registration - ${locationName}</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
          background: linear-gradient(rgba(185, 28, 28, 0.9), rgba(220, 38, 38, 0.9));
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
        .header .emoji { 
          font-size: 3rem; 
          margin-bottom: 1rem; 
          display: block; 
          filter: drop-shadow(0 4px 8px rgb(0 0 0 / 0.8)); 
        }
        .urgent { background-color: #fef2f2; border: 3px solid #dc2626; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .urgent h2 { color: #dc2626; margin-top: 0; }
        .confirm-button { 
          background: #dc2626; 
          color: white; 
          padding: 20px 40px; 
          text-decoration: none; 
          border-radius: 8px; 
          font-size: 18px; 
          font-weight: bold; 
          display: inline-block;
          margin: 20px 0;
        }
        .confirm-button:hover { background: #b91c1c; }
        .registration-details { background-color: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
        .warning { background-color: #fff3cd; border: 2px solid #ffc107; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        ${locationEmoji ? `<span class="emoji">${locationEmoji}</span>` : ''}
        <h1>🚨 URGENT: Confirm Your Registration 🚨</h1>
        <p style="font-size: 18px; font-weight: bold; margin-top: 15px;">📅 Saturday, December 13th, 2025</p>
      </div>
      
      <div class="urgent">
        <h2>⏰ ACTION REQUIRED: Confirm Your Time Slot</h2>
        <p><strong>Dear ${registration.firstName} ${registration.lastName},</strong></p>
        
        <p>You must <strong>confirm your Christmas Store registration</strong> to keep your time slot. <strong>Failure to confirm may result in your time slot being given to someone else.</strong></p>
        
        <div style="text-align: left; margin: 30px 0;">
          <a href="${registration.confirmationUrl}"
             style="background: #059669; color: white; padding: 20px 40px; text-decoration: none; border-radius: 8px; font-size: 18px; font-weight: bold; display: inline-block; margin: 10px 0;">
            ✅ I Will Be There
          </a>
        </div>

        <div style="text-align: left; margin: 20px 0;">
          <a href="${registration.confirmationUrl ? registration.confirmationUrl.replace('/confirm-final/', '/cancel-registration/') : '#'}"
             style="background: #6b7280; color: white; padding: 20px 40px; text-decoration: none; border-radius: 8px; font-size: 18px; font-weight: bold; display: inline-block; margin: 10px 0;">
            ❌ I Can't Make It
          </a>
        </div>
        
        <p style="font-size: 14px; color: #666;">
          Can't click the buttons? Copy and paste these links into your browser:<br>
          <strong>I Will Be There:</strong> <a href="${registration.confirmationUrl}">${registration.confirmationUrl}</a><br>
          <strong>I Can't Make It:</strong> <a href="${registration.confirmationUrl ? registration.confirmationUrl.replace('/confirm-final/', '/cancel-registration/') : '#'}">${registration.confirmationUrl ? registration.confirmationUrl.replace('/confirm-final/', '/cancel-registration/') : 'Not available'}</a>
        </p>
      </div>
      
      <div class="registration-details">
        <h3>📋 Your Registration Details</h3>
        <ul style="list-style: none; padding: 0;">
          <li><strong>Name:</strong> ${registration.firstName} ${registration.lastName}</li>
          <li><strong>Time Slot:</strong> ${displayTimeSlot}</li>
          <li><strong>Number of Children:</strong> ${registration.numberOfKids}</li>
          <li><strong>Location:</strong> ${formatAddressForEmail(locationAddress)}</li>
          <li><strong>Event Date:</strong> Saturday, December 13th, 2025</li>
        </ul>
        
        ${registrationId ? `
        <div style="text-align: center; margin: 20px 0; padding: 15px; background: #f0f9ff; border-radius: 8px;">
          <h4 style="color: #0369a1; margin-top: 0;">📅 Add to Your Calendar</h4>
          <a href="${frontendUrl}/api/generate-ical?id=${registrationId}"
             style="background: #0369a1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            📅 Download Calendar Event
          </a>
          <p style="font-size: 14px; color: #666; margin: 10px 0 0 0;">Click to download a calendar event for your Christmas Store appointment</p>
        </div>
        ` : ''}
      </div>
      
      <div class="warning">
        <h3 style="color: #856404; margin-top: 0;">⚠️ Important Deadline Information</h3>
        <p style="color: #856404; margin-bottom: 0;">
          Please confirm your registration as soon as possible. Unconfirmed registrations may be released to other families who are waiting.
        </p>
      </div>
      
      <div style="background-color: #e8f4fd; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3>❓ Questions or Need Help?</h3>
        <p>📧 Email: ${contactEmail}</p>
        <p>📞 Phone: ${contactPhone}</p>
        <p>🌐 Website: pathwayvineyard.com</p>
      </div>
      
      <div class="footer">
        <p>Thank you for participating in our Christmas Store ministry!</p>
        <p>This is an automated message. Please do not reply to this email.</p>
      </div>
    </body>
    </html>
  `;
}

function generateCustomEmailContent(registration: RegistrationData, subject: string, message: string): string {
  // Convert line breaks to HTML
  const htmlMessage = message.replace(/\n/g, '<br>');
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${subject}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          background-color: #f5f5f5; 
          margin: 0; 
          padding: 20px; 
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          background: white; 
          border-radius: 10px; 
          overflow: hidden; 
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); 
        }
        .header { 
          background: linear-gradient(135deg, #059669, #047857); 
          color: white; 
          text-align: center; 
          padding: 30px 20px; 
        }
        .header h1 { 
          margin: 0; 
          font-size: 24px; 
          font-weight: bold; 
        }
        .content { 
          padding: 30px 20px; 
          line-height: 1.6; 
        }
        .message-content {
          background: #f8f9fa;
          border-left: 4px solid #059669;
          padding: 20px;
          margin: 20px 0;
          border-radius: 0 8px 8px 0;
        }
        .footer { 
          background: #f8f9fa; 
          padding: 20px; 
          text-align: center; 
          color: #666; 
          font-size: 14px; 
        }
        .emoji { font-size: 1.2em; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <span class="emoji">🎄</span>
          <h1>${subject}</h1>
          <p>Pathway Vineyard Christmas Store</p>
        </div>
        
        <div class="content">
          <h2>Hello ${registration.firstName}!</h2>
          
          <div class="message-content">
            ${htmlMessage}
          </div>
          
          <div style="margin-top: 30px; padding: 15px; background: #e6f3ff; border-radius: 8px;">
            <h3>📍 Your Registration Details:</h3>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li><strong>Name:</strong> ${registration.firstName} ${registration.lastName}</li>
              <li><strong>Time Slot:</strong> ${registration.timeSlot}</li>
              <li><strong>Number of Children:</strong> ${registration.numberOfKids}</li>
              <li><strong>Event Date:</strong> Saturday, December 13th, 2025</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p>Questions? Contact us at office@pathwayvineyard.com or call (207) 746-9089</p>
          <p><strong>Pathway Vineyard Christmas Store</strong><br>
          Lewiston, Maine</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateEmailContent(registration: RegistrationData, config: Partial<RegistrationConfig> = {}, registrationId?: string): string {
  console.log('📧 generateEmailContent called with config:', JSON.stringify(config, null, 2));

  // Check if this is a final confirmation email
  if (registration.confirmationUrl) {
    return generateFinalConfirmationEmailContent(registration, config, registrationId);
  }

  // Get location config from database with fallbacks to environment variables and defaults
  const locationName = config.locationName || process.env.LOCATION_NAME || 'Pathway Christmas Store';
  const locationAddress = config.eventAddress || process.env.LOCATION_ADDRESS || 'Event Location TBD';
  const contactEmail = config.replyToEmail || process.env.CONTACT_EMAIL || 'office@pathwayvineyard.com';
  const contactPhone = config.contactPhone || process.env.CONTACT_PHONE || '(208) 746-9089';
  const locationEmoji = process.env.LOCATION_EMOJI || '';
  const frontendUrl = config.frontendUrl || getDefaultFrontendUrl();

  console.log('📧 Using locationName:', locationName);
  console.log('📧 Using locationAddress:', locationAddress);
  console.log('📧 Using contactEmail:', contactEmail);
  console.log('📧 config.locationName was:', config.locationName);
  console.log('📧 config.eventAddress was:', config.eventAddress);
  
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
      <title>Christmas Store Registration Confirmation - ${locationName}</title>
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
        .content { background-color: #f9fafb; padding: 20px; margin: 20px 0; border-radius: 5px; }
        .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 20px; }
        .highlight { background-color: #fef3c7; padding: 15px; border-radius: 5px; margin: 15px 0; }
        ul { list-style-type: none; padding-left: 0; }
        li { margin: 5px 0; }
        .church-info { background-color: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="header">
        ${locationEmoji ? `<span class="emoji">${locationEmoji}</span>` : ''}
        <h1>🎄 Christmas Store Registration Confirmed! 🎁</h1>
        <h2>${locationName}</h2>
        <p>${locationAddress}</p>
        <p style="font-size: 18px; font-weight: bold; margin-top: 15px;">📅 Saturday, December 13th, 2025</p>
      </div>
      
      <div class="content">
        <h2>Dear ${registration.firstName} ${registration.lastName},</h2>
        
        <p>Thank you for registering for the Christmas Store event! Your registration has been confirmed.</p>
        
        <div class="highlight">
          <h3>📋 Registration Details:</h3>
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
        
        <h3>📍 Important Information:</h3>
        <ul>
          <li><strong>Event Date:</strong> Saturday, December 13th, 2025</li>
          <li><strong>Your Time Slot:</strong> ${displayTimeSlot}</li>
          <li><strong>Location:</strong> ${formatAddressForEmail(locationAddress)}</li>
          <li>Please contact the office if you need to change or cancel your registration.</li>
        </ul>
        
        ${registrationId ? `
        <div style="text-align: center; margin: 25px 0; padding: 20px; background: linear-gradient(135deg, #f0f9ff, #e0f2fe); border-radius: 10px; border: 2px solid #0369a1;">
          <h3 style="color: #0369a1; margin-top: 0; font-size: 20px;">📅 Add to Your Calendar</h3>
          <p style="color: #334155; margin: 10px 0;">Never miss your appointment! Download a calendar event with all the details.</p>
          <a href="${frontendUrl}/api/generate-ical?id=${registrationId}"
             style="background: linear-gradient(135deg, #0369a1, #0284c7); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 10px 0; box-shadow: 0 4px 6px rgba(3, 105, 161, 0.3); transition: all 0.3s ease;">
            📅 Download Calendar Event (.ics)
          </a>
          <p style="font-size: 14px; color: #64748b; margin: 10px 0 0 0;">Compatible with Google Calendar, Outlook, Apple Calendar, and more</p>
        </div>
        ` : ''}
        
        <p>If you need to make any changes to your registration or have questions, please contact us as soon as possible.</p>
        
        <p>We look forward to seeing you at the Christmas Store!</p>
        
        <p>Warm regards,<br>The Pathway Christmas Store Team<br>${locationName}</p>
      </div>
      
      <div class="church-info">
        <h3>Contact Information:</h3>
        <p>📧 Email: ${contactEmail}</p>
        <p>📞 Phone: ${contactPhone}</p>
        <p>🌐 Website: pathwayvineyard.com</p>
      </div>
      
      <div class="footer">
        <p>This is an automated confirmation email. Please do not reply to this message.</p>
      </div>
    </body>
    </html>
  `;
}