import { defineFunction } from '@aws-amplify/backend';

export const sendCancellationEmail = defineFunction({
  name: 'send-cancellation-email',
  entry: './handler.ts',
  environment: {
    FROM_EMAIL: 'Pathway Vineyard Christmas Store <christmas-store@pathwayvineyard.com>'
  }
});