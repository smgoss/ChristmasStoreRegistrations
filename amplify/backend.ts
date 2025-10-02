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
import { sendSmsConfirmation } from './functions/send-sms-confirmation/resource';
import { sendCancellationEmail } from './functions/send-cancellation-email/resource';

export const backend = defineBackend({
  auth,
  data,
  sendConfirmationEmail,
  sendAttendanceConfirmation,
  reserveRegistration,
  autoCloseRegistration,
  createAdminUser,
  sendInviteEmail,
  sendSmsConfirmation,
  sendCancellationEmail,
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

// Grant email functions access to SES
[backend.sendConfirmationEmail, backend.sendAttendanceConfirmation, backend.sendInviteEmail, backend.sendCancellationEmail].forEach(emailFunction => {
  emailFunction.resources.lambda.addToRolePolicy(
    new PolicyStatement({
      effect: Effect.ALLOW,
      actions: [
        'ses:SendEmail',
        'ses:SendRawEmail'
      ],
      resources: ['*']
    })
  );
});

// Grant SMS function access to Secrets Manager
backend.sendSmsConfirmation.resources.lambda.addToRolePolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: [
      'secretsmanager:GetSecretValue'
    ],
    resources: ['*']
  })
);

// Note: Functions that use GraphQL API are assigned to 'data' stack via resourceGroupName
// They automatically get access to AMPLIFY_DATA_GRAPHQL_ENDPOINT and AMPLIFY_DATA_API_KEY environment variables
