import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { AppSyncResolverEvent } from 'aws-lambda';

const ses = new SESClient({ region: process.env.AWS_REGION });

interface Registration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  timeSlot: string;
  numberOfKids: number;
  confirmationToken: string;
}

export const handler = async (event: AppSyncResolverEvent<{ registrations: Registration[] }>) => {
  try {
    const { registrations } = event.arguments;
    const results = [];

    for (const registration of registrations) {
      try {
        const emailContent = generateConfirmationEmail(registration);

        const command = new SendEmailCommand({
          Source: process.env.FROM_EMAIL || 'Pathway Vineyard Christmas Store <christmas-store@pathwayvineyard.com>',
          ReplyToAddresses: ['office@pathwayvineyard.com'],
          Destination: {
            ToAddresses: [registration.email],
          },
          Message: {
            Subject: {
              Data: '🎄 Please Confirm Your Christmas Store Visit - ' + registration.timeSlot,
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

        const result = await ses.send(command);
        results.push({
          registrationId: registration.id,
          success: true,
          messageId: result.MessageId,
        });
      } catch (error) {
        console.error(`Failed to send email to ${registration.email}:`, error);
        results.push({
          registrationId: registration.id,
          success: false,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Sent ${results.filter(r => r.success).length} of ${registrations.length} confirmation emails`,
        results
      }),
    };
  } catch (error) {
    console.error('Error in attendance confirmation handler:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to send confirmation emails',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};

function generateConfirmationEmail(registration: Registration): string {
  const baseUrl = process.env.FRONTEND_URL || 'http://localhost:3004';
  const confirmUrl = `${baseUrl}/confirm/${registration.confirmationToken}`;
  const cancelUrl = `${baseUrl}/cancel/${registration.confirmationToken}`;
  
  // Get location config from environment variables
  const locationName = process.env.LOCATION_NAME || 'Christmas Store';
  const locationAddress = process.env.LOCATION_ADDRESS || '';
  const contactEmail = process.env.CONTACT_EMAIL || 'info@pathwayvineyard.com';
  const primaryColor = process.env.PRIMARY_COLOR || '#7c3aed';
  const secondaryColor = process.env.SECONDARY_COLOR || '#059669';
  const locationEmoji = process.env.LOCATION_EMOJI || '🎄';

  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>Christmas Store - Confirm Your Visit - ${locationName}</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, ${primaryColor}, ${secondaryColor}); color: white; padding: 30px; border-radius: 10px; text-align: center; margin-bottom: 30px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 10px; margin-bottom: 30px; }
            .button { display: inline-block; padding: 15px 30px; margin: 10px 10px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px; text-align: center; }
            .confirm-btn { background: ${secondaryColor}; color: white; }
            .cancel-btn { background: #dc2626; color: white; }
            .info-box { background: #e8f4fd; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 20px 0; }
            .footer { text-align: center; color: #666; font-size: 14px; margin-top: 30px; }
            .church-info { background-color: #e8f4fd; padding: 15px; border-radius: 8px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="header">
            <div style="font-size: 48px; margin-bottom: 10px;">${locationEmoji}</div>
            <h1>🎄 Christmas Store Confirmation</h1>
            <h2>${locationName}</h2>
            <p>Please confirm your upcoming visit</p>
        </div>

        <div class="content">
            <h2>Hello ${registration.firstName} ${registration.lastName}!</h2>
            
            <p>We're excited about your upcoming visit to the Christmas Store! Please confirm your attendance or let us know if you can't make it.</p>

            <div class="info-box">
                <h3>📅 Your Registration Details:</h3>
                <p><strong>Time Slot:</strong> ${registration.timeSlot}</p>
                <p><strong>Number of Children:</strong> ${registration.numberOfKids}</p>
                <p><strong>Email:</strong> ${registration.email}</p>
            </div>

            <div style="text-align: center; margin: 30px 0;">
                <a href="${confirmUrl}" class="button confirm-btn">
                    ✅ Yes, I'll be there!
                </a>
                <br><br>
                <a href="${cancelUrl}" class="button cancel-btn">
                    ❌ Sorry, I can't make it
                </a>
            </div>

            <p><strong>Please respond by clicking one of the buttons above.</strong> This helps us prepare appropriately for your visit.</p>
            
            <p>If you have any questions, please don't hesitate to contact us.</p>
        </div>

        <div class="church-info">
            <h3>Contact Information:</h3>
            <p>📧 Email: ${contactEmail}</p>
            <p>🌐 Website: pathwayvineyard.com</p>
            <p>📍 Location: ${locationAddress}</p>
        </div>

        <div class="footer">
            <p>🎅 Thank you for being part of our ${locationName} Christmas Store community! 🤶</p>
            <p><em>This is an automated message. Please do not reply to this email.</em></p>
        </div>
    </body>
    </html>
  `;
}