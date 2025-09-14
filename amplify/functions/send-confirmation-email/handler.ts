import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { AppSyncResolverEvent } from 'aws-lambda';

const ses = new SESClient({ region: process.env.AWS_REGION });

interface RegistrationData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  timeSlot: string;
  numberOfKids: number;
  referredBy?: string;
  children: Array<{ age: number; gender: string }>;
}

export const handler = async (event: AppSyncResolverEvent<{ registration: RegistrationData }>) => {
  try {
    const { registration } = event.arguments;

    const emailContent = generateEmailContent(registration);

    const command = new SendEmailCommand({
      Source: process.env.FROM_EMAIL || 'christmas-store@pathwayvineyard.com',
      ReplyToAddresses: ['office@pathwayvineyard.com'],
      Destination: {
        ToAddresses: [registration.email],
      },
      Message: {
        Subject: {
          Data: '🎄 Christmas Store Registration Confirmed - ' + registration.timeSlot,
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

    await ses.send(command);

    return {
      success: true,
      message: 'Confirmation email sent successfully',
    };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return {
      success: false,
      message: 'Failed to send confirmation email',
    };
  }
};

function generateEmailContent(registration: RegistrationData): string {
  // Get location config from environment variables
  const locationName = process.env.LOCATION_NAME || 'Christmas Store';
  const locationAddress = process.env.LOCATION_ADDRESS || '';
  const contactEmail = process.env.CONTACT_EMAIL || 'info@pathwayvineyard.com';
  const primaryColor = process.env.PRIMARY_COLOR || '#7c3aed';
  const secondaryColor = process.env.SECONDARY_COLOR || '#059669';
  const locationEmoji = process.env.LOCATION_EMOJI || '⛪';
  
  const childrenInfo = registration.children.map(
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
        .header { background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); color: white; text-align: center; padding: 30px; border-radius: 10px; }
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
        <div style="font-size: 48px; margin-bottom: 10px;">${locationEmoji}</div>
        <h1>🎄 Christmas Store Registration Confirmed! 🎁</h1>
        <h2>${locationName}</h2>
        <p>${locationAddress}</p>
      </div>
      
      <div class="content">
        <h2>Dear ${registration.firstName} ${registration.lastName},</h2>
        
        <p>Thank you for registering for the Christmas Store event! Your registration has been confirmed.</p>
        
        <div class="highlight">
          <h3>📋 Registration Details:</h3>
          <ul>
            <li><strong>Name:</strong> ${registration.firstName} ${registration.lastName}</li>
            <li><strong>Email:</strong> ${registration.email}</li>
            <li><strong>Phone:</strong> ${registration.phone}</li>
            <li><strong>Time Slot:</strong> ${registration.timeSlot}</li>
            <li><strong>Number of Children:</strong> ${registration.numberOfKids}</li>
            ${registration.referredBy ? `<li><strong>Referred by:</strong> ${registration.referredBy}</li>` : ''}
          </ul>
          
          ${registration.numberOfKids > 0 ? `
            <h4>👶 Children Information:</h4>
            <ul>
              ${childrenInfo}
            </ul>
          ` : ''}
        </div>
        
        <h3>📍 Important Information:</h3>
        <ul>
          <li>Please arrive 15 minutes before your scheduled time slot</li>
          <li>Bring a valid photo ID</li>
          <li>Children must be accompanied by a parent or guardian</li>
        </ul>
        
        <p>If you need to make any changes to your registration or have questions, please contact us as soon as possible.</p>
        
        <p>We look forward to seeing you at the Christmas Store!</p>
        
        <p>Warm regards,<br>The Christmas Store Team<br>${locationName}</p>
      </div>
      
      <div class="church-info">
        <h3>Contact Information:</h3>
        <p>📧 Email: ${contactEmail}</p>
        <p>🌐 Website: pathwayvineyard.com</p>
      </div>
      
      <div class="footer">
        <p>This is an automated confirmation email. Please do not reply to this message.</p>
      </div>
    </body>
    </html>
  `;
}