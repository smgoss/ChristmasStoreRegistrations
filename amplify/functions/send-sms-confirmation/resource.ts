import { defineFunction } from '@aws-amplify/backend';

export const sendSmsConfirmation = defineFunction({
  name: 'send-sms-confirmation',
  entry: './handler.ts',
  environment: {
    CLEARSTREAM_API_KEY: process.env.CLEARSTREAM_API_KEY || 'your-clearstream-api-key-here',
    CLEARSTREAM_TEXT_HEADER: 'Christmas Store'
  }
});