import { defineFunction } from '@aws-amplify/backend';

export const sendAttendanceConfirmation = defineFunction({
  name: 'send-attendance-confirmation',
  entry: './handler.ts',
  environment: {
    FROM_EMAIL: 'christmas-store@pathwayvineyard.com',
    FRONTEND_URL: 'http://localhost:3004' // Update this for production
  }
});