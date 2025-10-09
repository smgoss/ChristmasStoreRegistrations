import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import type { Handler } from 'aws-lambda';

const ses = new SESClient({ region: process.env.AWS_REGION });

interface InviteData {
  email: string;
  token: string;
  inviteUrl: string;
  isAgencyInvite?: boolean;
  agencyName?: string;
  agencyContact?: string;
  maxUsageCount?: number;
}

interface RegistrationConfig {
  id: string;
  fromEmail?: string;
  replyToEmail?: string;
  locationName?: string;
  eventAddress?: string;
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
        fromEmail: undefined,
        replyToEmail: undefined,
        locationName: undefined,
        eventAddress: undefined,
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
            fromEmail
            replyToEmail
            locationName
            eventAddress
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
        fromEmail: undefined,
        replyToEmail: undefined,
        locationName: undefined,
        eventAddress: undefined,
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
        fromEmail: config.fromEmail,
        replyToEmail: config.replyToEmail,
        locationName: config.locationName,
        eventAddress: config.eventAddress,
        contactPhone: config.contactPhone
      };
    }

    console.log('📋 No config found with ID', configId);
    return {
      id: '',
      fromEmail: undefined,
      replyToEmail: undefined,
      locationName: undefined,
      eventAddress: undefined,
      contactPhone: undefined
    };
  } catch (error) {
    console.error('❌ Error fetching registration config:', error);
    return {
      id: '',
      fromEmail: undefined,
      replyToEmail: undefined,
      locationName: undefined,
      eventAddress: undefined,
      contactPhone: undefined
    };
  }
}

export const handler: Handler = async (event: {arguments?: {invite: InviteData; inviteId?: string}, inviteId?: string, invite?: InviteData}) => {
  try {
    console.log('📧 Sending invite email:', event);
    // Force redeploy to update FROM_EMAIL environment variable
    
    let invite: InviteData;
    let inviteId: string | undefined;
    
    if (event.arguments?.invite) {
      invite = event.arguments.invite;
      inviteId = event.arguments.inviteId || event.inviteId;
    } else if ('invite' in event && event.invite) {
      invite = event.invite;
      inviteId = event.inviteId;
    } else {
      console.error('❌ No invite data provided');
      return {
        success: false,
        message: 'No invite data provided',
        error: 'Invite data is required'
      };
    }
    
    if (!invite.email) {
      console.log('ℹ️ No email provided, skipping email send');
      return {
        success: true,
        message: 'No email provided, invite email skipped'
      };
    }

    // Load dynamic configuration
    const config = await getRegistrationConfig();
    const fromEmail = config.fromEmail || 'Pathway Vineyard Christmas Store <christmas-store@pathwayvineyard.com>';
    const replyToEmail = config.replyToEmail || 'office@pathwayvineyard.com';
    
    console.log('📋 Using from email:', fromEmail);
    console.log('📋 Using reply-to email:', replyToEmail);

    const emailContent = generateInviteEmailContent(invite, config);
    const emailSubject = invite.isAgencyInvite
      ? `🏢 Agency Registration Links for ${invite.agencyName || 'Your Agency'} - Christmas Store`
      : '🎄 You\'re Invited to Register for Christmas Store!';

    const command = new SendEmailCommand({
      Source: fromEmail,
      ReplyToAddresses: [replyToEmail],
      Destination: {
        ToAddresses: [invite.email],
      },
      Message: {
        Subject: {
          Data: emailSubject,
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

function generateInviteEmailContent(invite: InviteData, config: RegistrationConfig): string {
  // Generate agency invite email if this is an agency invite
  if (invite.isAgencyInvite) {
    return generateAgencyInviteEmail(invite, config);
  }

  // Otherwise generate regular invite email
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
        <p style="font-size: 18px; font-weight: bold; margin-top: 10px;">📅 Saturday, December 13th, 2025</p>
    </div>

    <div class="content">
        <p><strong>Hello!</strong></p>

        <p>You have been personally invited to register for our <strong>Christmas Store</strong> event on <strong>Saturday, December 13th, 2025</strong>. This is a special opportunity to provide Christmas gifts for children in need in our community.</p>

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

        <p><strong>Questions?</strong> Please contact us or simply reply to this email.</p>

        <p>Thank you for being part of our Christmas Store community!</p>

        <p><strong>With warm wishes,<br>The ${config.locationName || 'Pathway Christmas Store'} Team</strong></p>
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

function generateAgencyInviteEmail(invite: InviteData, config: RegistrationConfig): string {
  const slotCount = invite.maxUsageCount || 1;
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Christmas Store Agency Registration Link</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header {
          background: linear-gradient(rgba(59, 130, 246, 0.9), rgba(37, 99, 235, 0.9)), url('https://images.unsplash.com/photo-1545048702-79362596cdc9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
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
        .invite-link { background: #2563eb; color: white; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; }
        .invite-link a { color: white; text-decoration: none; font-weight: bold; font-size: 16px; word-break: break-all; }
        .invite-link a:hover { text-decoration: underline; }
        .info-box { background: #dbeafe; border-left: 4px solid #2563eb; padding: 15px; margin: 20px 0; }
        .warning-box { background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; border-top: 1px solid #ddd; padding-top: 20px; }
        ul { padding-left: 20px; }
        li { margin-bottom: 8px; }
        .slot-count { background: #2563eb; color: white; display: inline-block; padding: 8px 16px; border-radius: 20px; font-weight: bold; font-size: 16px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏢 Agency Registration Link</h1>
        <p>Christmas Store - ${config.locationName || 'Pathway Christmas Store'}</p>
        <p style="font-size: 18px; font-weight: bold; margin-top: 10px;">📅 Saturday, December 13th, 2025</p>
    </div>

    <div class="content">
        <p><strong>Hello${invite.agencyContact ? ' ' + invite.agencyContact : ''},</strong></p>

        <p>Thank you for partnering with us to serve families in need. We've generated a special registration link for <strong>${invite.agencyName || 'your agency'}</strong> that you can share with your clients.</p>

        <div class="info-box">
            <h3 style="margin-top: 0; color: #2563eb;">📊 Your Registration Allocation</h3>
            <p style="text-align: center; margin: 10px 0;">
                <span class="slot-count">${slotCount} Registration${slotCount === 1 ? '' : 's'} Available</span>
            </p>
            <p style="margin: 10px 0 0 0;">This link can be used <strong>${slotCount} time${slotCount === 1 ? '' : 's'}</strong> to register families for the Christmas Store event.</p>
        </div>

        <div class="invite-link">
            <p style="margin: 0 0 10px 0;"><strong>Your Agency Registration Link:</strong></p>
            <a href="${invite.inviteUrl}" target="_blank">${invite.inviteUrl}</a>
        </div>

        <div class="info-box">
            <h3 style="margin-top: 0; color: #2563eb;">📋 How to Use This Link</h3>
            <ul>
                <li><strong>Share with clients:</strong> You can share this link directly with families you're working with</li>
                <li><strong>Multiple uses:</strong> The link can be used up to ${slotCount} time${slotCount === 1 ? '' : 's'} before it expires</li>
                <li><strong>Tracks usage:</strong> Each time a family completes registration, one slot is used</li>
                <li><strong>Time slots:</strong> Families will select their preferred time slot during registration</li>
            </ul>
        </div>

        <div class="warning-box">
            <h3 style="margin-top: 0; color: #f59e0b;">⚠️ Important - Maintain a Waitlist</h3>
            <p><strong>Please keep a waitlist of additional clients who may need assistance.</strong></p>
            <p>If more slots become available later in the season, we may be able to send you additional registration links. Having a waitlist ready will help us serve more families quickly if spots open up.</p>
        </div>

        <p><strong>Questions?</strong> Please contact us or simply reply to this email. We're here to help!</p>

        <p>Thank you for your partnership in serving our community.</p>

        <p><strong>With gratitude,<br>The ${config.locationName || 'Pathway Christmas Store'} Team</strong></p>
    </div>

    <div class="footer">
        <p>This agency link was sent to: ${invite.email}</p>
        <p>Agency: ${invite.agencyName || 'N/A'}</p>
    </div>
</body>
</html>
`;

  return html;
}