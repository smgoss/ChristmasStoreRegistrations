import { defineFunction, secret } from '@aws-amplify/backend';

export const sendSmsConfirmation = defineFunction({
  name: 'send-sms-confirmation',
  entry: './handler.ts',
  environment: {
    CLEARSTREAM_TEXT_HEADER: 'Pathway Christmas Store',
    CLEAR_STREAM_API_KEY: 'CLEAR_STREAM_API_KEY'
  }
});