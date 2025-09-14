import { defineFunction } from '@aws-amplify/backend';

export const sendConfirmationEmail = defineFunction({
  name: 'send-confirmation-email',
  entry: './handler.ts',
  environment: {
    FROM_EMAIL: 'christmas-store@pathwayvineyard.com'
  }
});