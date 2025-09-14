import { defineFunction, secret } from '@aws-amplify/backend';

export const sendSmsConfirmation = defineFunction({
  name: 'send-sms-confirmation',
  entry: './handler.ts',
  environment: {
    CLEARSTREAM_TEXT_HEADER: 'Christmas Store',
    CLEAR_STREAM_API_KEY: secret('CLEAR_STREAM_API_KEY')
  }
});