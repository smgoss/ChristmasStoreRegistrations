import { defineBackend } from '@aws-amplify/backend';
import { PolicyStatement, Effect } from 'aws-cdk-lib/aws-iam';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { sendConfirmationEmail } from './functions/send-confirmation-email/resource';
import { sendAttendanceConfirmation } from './functions/send-attendance-confirmation/resource';
import { reserveRegistration } from './functions/reserve-registration/resource';
import { autoCloseRegistration } from './functions/auto-close-registration/resource';
import { createAdminUser } from './functions/create-admin-user/resource';
import { sendInviteEmail } from './functions/send-invite-email/resource';

export const backend = defineBackend({
  auth,
  data,
  sendConfirmationEmail,
  sendAttendanceConfirmation,
  reserveRegistration,
  autoCloseRegistration,
  createAdminUser,
  sendInviteEmail,
});

// Grant the createAdminUser function access to Cognito User Pool
backend.createAdminUser.addEnvironment('AMPLIFY_AUTH_USERPOOL_ID', backend.auth.resources.userPool.userPoolId);
backend.createAdminUser.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: [
      'cognito-idp:AdminCreateUser',
      'cognito-idp:AdminAddUserToGroup', 
      'cognito-idp:CreateGroup'
    ],
    resources: [backend.auth.resources.userPool.userPoolArn]
  })
);
