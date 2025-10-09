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
import lewistonConfig from '../../config/lewiston.json';
import brunswickConfig from '../../config/brunswick.json';
import grayConfig from '../../config/gray.json';

// Function to get current config based on environment
function getCurrentConfig(): LocationConfig {
  const location = process.env.NEXT_PUBLIC_LOCATION || 'lewiston';
  
  switch (location) {
    case 'lewiston':
      return lewistonConfig;
    case 'brunswick':
      return brunswickConfig;
    case 'gray':
      return grayConfig;
    default:
      return lewistonConfig;
  }
}

// Function to get default frontend URL based on location
export function getDefaultFrontendUrl(): string {
  const location = process.env.NEXT_PUBLIC_LOCATION || 'lewiston';

  switch (location) {
    case 'lewiston':
      return 'https://lew-christmas-store.pathwayvineyard.com';
    case 'brunswick':
      return 'https://brun-christmas-store.pathwayvineyard.com';
    case 'gray':
      return 'https://gng-christmas-store.pathwayvineyard.com';
    default:
      return 'https://lew-christmas-store.pathwayvineyard.com';
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
export const DEFAULT_FRONTEND_URL = getDefaultFrontendUrl();
