import { defineFunction, secret } from '@aws-amplify/backend';

// Get location from environment variable (set during deployment)
const location = process.env.NEXT_PUBLIC_LOCATION || 'lewiston';

// Location-specific configurations
const locationConfigs = {
  lewiston: {
    LOCATION_NAME: 'Pathway Vineyard Lewiston Campus',
    LOCATION_ADDRESS: 'Lewiston, Maine',
    CONTACT_EMAIL: 'office@pathwayvineyard.com',
    CONTACT_PHONE: '(207) 784-9500',
    LOCATION_EMOJI: '🎄',
    SMS_HEADER: 'Pathway Lewiston Christmas Store'
  },
  brunswick: {
    LOCATION_NAME: 'Pathway Vineyard Brunswick Campus', 
    LOCATION_ADDRESS: 'Brunswick, Maine',
    CONTACT_EMAIL: 'office@pathwayvineyard.com',
    CONTACT_PHONE: '(207) 784-9500',
    LOCATION_EMOJI: '🎄',
    SMS_HEADER: 'Pathway Brunswick Christmas Store'
  },
  gray: {
    LOCATION_NAME: 'Pathway Vineyard Gray-New Gloucester Campus',
    LOCATION_ADDRESS: 'Gray-New Gloucester, Maine', 
    CONTACT_EMAIL: 'office@pathwayvineyard.com',
    CONTACT_PHONE: '(207) 784-9500',
    LOCATION_EMOJI: '🎄',
    SMS_HEADER: 'Pathway Gray Christmas Store'
  }
};

const currentLocationConfig = locationConfigs[location as keyof typeof locationConfigs] || locationConfigs.lewiston;

export const sendSmsConfirmation = defineFunction({
  name: 'send-sms-confirmation',
  entry: './handler.ts',
  resourceGroupName: 'data',
  environment: {
    CLEARSTREAM_TEXT_HEADER: currentLocationConfig.SMS_HEADER,
    CLEAR_STREAM_API_KEY: secret('CLEAR_STREAM_API_KEY'),
    // LOCATION_NAME and LOCATION_ADDRESS are now fetched from database via GraphQL
    CONTACT_EMAIL: currentLocationConfig.CONTACT_EMAIL,
    CONTACT_PHONE: currentLocationConfig.CONTACT_PHONE,
    LOCATION_EMOJI: currentLocationConfig.LOCATION_EMOJI
  }
});