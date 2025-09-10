import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { sendConfirmationEmail } from './functions/send-confirmation-email/resource';
import { sendAttendanceConfirmation } from './functions/send-attendance-confirmation/resource';
import { autoCloseRegistration } from './functions/auto-close-registration/resource';

export const backend = defineBackend({
  auth,
  data,
  sendConfirmationEmail,
  sendAttendanceConfirmation,
  autoCloseRegistration,
});