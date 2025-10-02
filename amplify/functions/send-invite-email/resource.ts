import { defineFunction } from '@aws-amplify/backend';

// Get location from environment variable (set during deployment)
const location = process.env.NEXT_PUBLIC_LOCATION || 'lewiston';

// Location-specific configurations
const locationConfigs = {
  lewiston: {
    LOCATION_NAME: 'Pathway Vineyard Lewiston Campus',
    LOCATION_ADDRESS: 'Lewiston, Maine',
    CONTACT_EMAIL: 'lewiston@pathwayvineyard.com',
    CONTACT_PHONE: '(207) 555-0100',
    LOCATION_EMOJI: '🎄'
  },
  brunswick: {
    LOCATION_NAME: 'Pathway Vineyard Brunswick Campus', 
    LOCATION_ADDRESS: 'Brunswick, Maine',
    CONTACT_EMAIL: 'brunswick@pathwayvineyard.com',
    CONTACT_PHONE: '(207) 555-0200',
    LOCATION_EMOJI: '🎄'
  },
  gray: {
    LOCATION_NAME: 'Pathway Vineyard Gray-New Gloucester Campus',
    LOCATION_ADDRESS: 'Gray-New Gloucester, Maine', 
    CONTACT_EMAIL: 'gray@pathwayvineyard.com',
    CONTACT_PHONE: '(207) 555-0300',
    LOCATION_EMOJI: '🎄'
  }
};

const currentLocationConfig = locationConfigs[location as keyof typeof locationConfigs] || locationConfigs.lewiston;

export const sendInviteEmail = defineFunction({
  name: 'send-invite-email',
  entry: './handler.ts',
  resourceGroupName: 'data',
  environment: {
    // LOCATION_NAME and LOCATION_ADDRESS are now fetched from database via GraphQL
    CONTACT_EMAIL: currentLocationConfig.CONTACT_EMAIL,
    CONTACT_PHONE: currentLocationConfig.CONTACT_PHONE,
    LOCATION_EMOJI: currentLocationConfig.LOCATION_EMOJI
  }
});