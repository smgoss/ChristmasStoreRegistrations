import { useState, useEffect } from 'react';

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

export function useLocationConfig(): LocationConfig {
  const [config, setConfig] = useState<LocationConfig>(location1Config);

  useEffect(() => {
    // Get location from environment variable or URL parameter or localStorage
    const getLocationFromEnvironment = () => {
      // Check environment variable first
      if (typeof window !== 'undefined') {
        // Check URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const urlLocation = urlParams.get('location');
        if (urlLocation) {
          localStorage.setItem('selectedLocation', urlLocation);
          return urlLocation;
        }

        // Check localStorage
        const savedLocation = localStorage.getItem('selectedLocation');
        if (savedLocation) {
          return savedLocation;
        }
      }

      // Fall back to environment variable
      return process.env.NEXT_PUBLIC_LOCATION || 'location1';
    };

    const location = getLocationFromEnvironment();
    
    switch (location) {
      case 'location1':
        setConfig(location1Config);
        break;
      case 'location2':
        setConfig(location2Config);
        break;
      case 'location3':
        setConfig(location3Config);
        break;
      default:
        setConfig(location1Config);
    }
  }, []);

  return config;
}