import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { Handler } from 'aws-lambda';

const ses = new SESClient({ region: process.env.AWS_REGION });

interface InviteData {
  email: string;
  token: string;
  inviteUrl: string;
}

export const handler: Handler = async (event: any) => {
  try {
    console.log('📧 Sending invite email:', event);
    
    const { invite, inviteId }: { invite: InviteData; inviteId?: string } = event.arguments || event;
    
    if (!invite.email) {
      console.log('ℹ️ No email provided, skipping email send');
      return {
        success: true,
        message: 'No email provided, invite email skipped'
      };
    }

    const emailContent = generateInviteEmailContent(invite);

    const command = new SendEmailCommand({
      Source: process.env.FROM_EMAIL || 'Pathway Christmas Store <christmas-store@pathwayvineyard.com>',
      ReplyToAddresses: ['office@pathwayvineyard.com'],
      Destination: {
        ToAddresses: [invite.email],
      },
      Message: {
        Subject: {
          Data: '🎄 You\'re Invited to Register for Christmas Store!',
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
    
    // Update invite link with successful email delivery status
    if (inviteId) {
      console.log('✅ Invite email sent successfully, MessageId:', result.MessageId);
      // TODO: Update invite link record with emailDeliveryStatus: 'sent', emailDeliveryAttemptedAt: now
    }

    return {
      success: true,
      message: 'Invite email sent successfully',
      messageId: result.MessageId,
    };
  } catch (error) {
    console.error('Error sending invite email:', error);
    
    // Update invite link with failed email delivery status
    if (event.arguments?.inviteId || event.inviteId) {
      console.log('❌ Invite email delivery failed, updating status');
      // TODO: Update invite link record with emailDeliveryStatus: 'failed', emailFailureReason: error.message
    }
    
    return {
      success: false,
      message: 'Failed to send invite email',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

function generateInviteEmailContent(invite: InviteData): string {
  const text = `
🎄 You're Invited to the Christmas Store! 🎄

Hello!

You have been personally invited to register for our Christmas Store event on Friday, December 6th, 2025. This is a special opportunity to provide Christmas gifts for children in need in our community.

Your personal invitation link:
${invite.inviteUrl}

Important Information:
- This invitation link is unique to you and can only be used once
- Please register as soon as possible as spots are limited
- You'll be able to select your preferred time slot during registration
- Bring the whole family - childcare may be available during your shopping time

What to Expect:
- Browse through toys, clothes, and gifts organized by age and gender
- Select items for the children in your family
- Enjoy a warm, welcoming environment with volunteers ready to help
- Experience the joy of Christmas giving in our community

Questions? Please contact us or simply reply to this email.

Thank you for being part of our Christmas Store community!

With warm wishes,
The Pathway Christmas Store Team

---
This invitation was sent to: ${invite.email}
Invitation ID: ${invite.token.slice(0, 8)}...
`;

  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Christmas Store Invitation</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { 
          background: linear-gradient(rgba(185, 28, 28, 0.7), rgba(5, 150, 105, 0.7)), url('https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          color: white; 
          padding: 48px 30px; 
          text-align: center; 
          border-radius: 16px; 
          margin-bottom: 30px; 
          position: relative;
          overflow: hidden;
        }
        .header h1 { 
          margin: 0; 
          font-size: 2rem; 
          font-weight: 700; 
          text-shadow: 0 2px 8px rgb(0 0 0 / 0.8), 0 0 20px rgb(0 0 0 / 0.5); 
        }
        .header p { 
          margin: 10px 0 0 0; 
          font-size: 18px; 
          opacity: 0.9; 
          text-shadow: 0 2px 6px rgb(0 0 0 / 0.7); 
        }
        .content { background: #f9f9f9; padding: 30px; border-radius: 10px; margin-bottom: 20px; }
        .invite-link { background: #228b22; color: white; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; }
        .invite-link a { color: white; text-decoration: none; font-weight: bold; font-size: 18px; }
        .invite-link a:hover { text-decoration: underline; }
        .info-box { background: #e8f5e8; border-left: 4px solid #228b22; padding: 15px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎄 You're Invited! 🎄</h1>
        <p>Christmas Store Registration</p>
        <p style="font-size: 18px; font-weight: bold; margin-top: 10px;">📅 Friday, December 6th, 2025</p>
    </div>
    
    <div class="content">
        <p><strong>Hello!</strong></p>
        
        <p>You have been personally invited to register for our <strong>Christmas Store</strong> event on <strong>Friday, December 6th, 2025</strong>. This is a special opportunity to provide Christmas gifts for children in need in our community.</p>
        
        <div class="invite-link">
            <p style="margin: 0 0 10px 0;">Your Personal Invitation Link:</p>
            <a href="${invite.inviteUrl}" target="_blank">${invite.inviteUrl}</a>
        </div>
        
        <div class="info-box">
            <h3 style="margin-top: 0; color: #228b22;">📋 Important Information</h3>
            <ul>
                <li>This invitation link is <strong>unique to you</strong> and can only be used once</li>
                <li>Please register as soon as possible as spots are limited</li>
                <li>You'll be able to select your preferred time slot during registration</li>
                <li>Bring the whole family - childcare may be available during your shopping time</li>
            </ul>
        </div>
        
        <div class="info-box">
            <h3 style="margin-top: 0; color: #c41e3a;">🎁 What to Expect</h3>
            <ul>
                <li>Browse through toys, clothes, and gifts organized by age and gender</li>
                <li>Select items for the children in your family</li>
                <li>Enjoy a warm, welcoming environment with volunteers ready to help</li>
                <li>Experience the joy of Christmas giving in our community</li>
            </ul>
        </div>
        
        <p><strong>Questions?</strong> Please contact us or simply reply to this email.</p>
        
        <p>Thank you for being part of our Christmas Store community!</p>
        
        <p><strong>With warm wishes,<br>The Pathway Christmas Store Team</strong></p>
    </div>
    
    <div class="footer">
        <p>This invitation was sent to: ${invite.email}</p>
        <p>Invitation ID: ${invite.token.slice(0, 8)}...</p>
    </div>
</body>
</html>
`;

  return html;
}