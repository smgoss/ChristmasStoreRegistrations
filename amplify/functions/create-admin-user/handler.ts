import { CognitoIdentityProviderClient, AdminCreateUserCommand, AdminAddUserToGroupCommand, CreateGroupCommand } from '@aws-sdk/client-cognito-identity-provider';

const cognito = new CognitoIdentityProviderClient({ region: process.env.AWS_REGION });

export const handler = async (event: any) => {
  try {
    const userPoolId = process.env.AMPLIFY_AUTH_USERPOOL_ID;
    
    if (!userPoolId) {
      throw new Error('AMPLIFY_AUTH_USERPOOL_ID environment variable not found');
    }

    console.log('🔧 Setting up admin user for User Pool:', userPoolId);

    // 1. Create admin group if it doesn't exist
    try {
      await cognito.send(new CreateGroupCommand({
        UserPoolId: userPoolId,
        GroupName: 'admin',
        Description: 'Administrators with full access',
        Precedence: 0
      }));
      console.log('✅ Admin group created');
    } catch (error: any) {
      if (error.name === 'GroupExistsException') {
        console.log('ℹ️ Admin group already exists');
      } else {
        throw error;
      }
    }

    // 2. Create admin user
    try {
      await cognito.send(new AdminCreateUserCommand({
        UserPoolId: userPoolId,
        Username: 'stephen@pathwayvineyard.com',
        UserAttributes: [
          { Name: 'email', Value: 'stephen@pathwayvineyard.com' },
          { Name: 'email_verified', Value: 'true' }
        ],
        MessageAction: 'SUPPRESS' // Don't send welcome email - user will use forgot password
      }));
      console.log('✅ Admin user created');
    } catch (error: any) {
      if (error.name === 'UsernameExistsException') {
        console.log('ℹ️ Admin user already exists');
      } else {
        throw error;
      }
    }

    // 3. Add user to admin group
    try {
      await cognito.send(new AdminAddUserToGroupCommand({
        UserPoolId: userPoolId,
        Username: 'stephen@pathwayvineyard.com',
        GroupName: 'admin'
      }));
      console.log('✅ Admin user added to admin group');
    } catch (error: any) {
      if (error.name === 'UserNotConfirmedException') {
        console.log('ℹ️ User exists but not confirmed yet - group assignment will work after confirmation');
      } else {
        console.warn('⚠️ Could not add user to group:', error.message);
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Admin user setup completed',
        userPoolId,
        adminUser: 'stephen@pathwayvineyard.com'
      })
    };

  } catch (error) {
    console.error('❌ Error setting up admin user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to setup admin user',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
};