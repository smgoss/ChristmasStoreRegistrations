import { defineFunction } from '@aws-amplify/backend';

export const sendInviteEmail = defineFunction({
  name: 'send-invite-email',
  entry: './handler.ts'
});