import { defineFunction } from '@aws-amplify/backend';

export const autoCloseRegistration = defineFunction({
  name: 'auto-close-registration',
  entry: './handler.ts',
  resourceGroupName: 'data'
});