import { defineFunction } from '@aws-amplify/backend';

// NOTE: This function is intended to enforce capacity atomically using DynamoDB
// transactions. You should set environment variables with your table names and
// enable this path from the app server via RESERVE_FUNCTION_NAME.

export const reserveRegistration = defineFunction({
  name: 'reserve-registration',
  entry: './handler.ts',
  environment: {
    // Optional: set these to your DynamoDB table names for a transactional write
    REGISTRATION_TABLE: process.env.REGISTRATION_TABLE || '',
    TIMESLOT_TABLE: process.env.TIMESLOT_TABLE || '',
  },
});

