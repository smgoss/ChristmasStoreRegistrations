interface LocationConfig {
  locationName: string;
  shortName: string;
  locationAddress: string;
  timeSlots: string[];
  defaultCapacity: number;
  contactEmail: string;
  fromEmail: string;
  branding: {
    primaryColor: string;
    secondaryColor: string;
    locationEmoji: string;
    campusColor: string;
  };
  churchInfo: {
    website: string;
    phone: string;
  };
}

// Import all configs
const location1Config = require('../../config/location1.json') as LocationConfig;
const location2Config = require('../../config/location2.json') as LocationConfig;
const location3Config = require('../../config/location3.json') as LocationConfig;

// Function to get current config based on environment
function getCurrentConfig(): LocationConfig {
  const location = process.env.NEXT_PUBLIC_LOCATION || 'location1';
  
  switch (location) {
    case 'location1':
      return location1Config;
    case 'location2':
      return location2Config;
    case 'location3':
      return location3Config;
    default:
      return location1Config;
  }
}

// Get current config
export const config = getCurrentConfig();

export const TIME_SLOTS = config.timeSlots;
export const DEFAULT_CAPACITY = config.defaultCapacity;
export const LOCATION_NAME = config.locationName;
export const SHORT_NAME = config.shortName;
export const LOCATION_ADDRESS = config.locationAddress;
export const CONTACT_EMAIL = config.contactEmail;
export const FROM_EMAIL = config.fromEmail;
export const BRANDING = config.branding;
export const CHURCH_INFO = config.churchInfo;