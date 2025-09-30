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
import lewistonConfig from '../../config/lewiston.json';
import brunswickConfig from '../../config/brunswick.json';
import grayConfig from '../../config/gray.json';

export function useLocationConfig(): LocationConfig {
  const [config, setConfig] = useState<LocationConfig>(lewistonConfig);

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
      return process.env.NEXT_PUBLIC_LOCATION || 'lewiston';
    };

    const location = getLocationFromEnvironment();
    
    switch (location) {
      case 'lewiston':
        setConfig(lewistonConfig);
        break;
      case 'brunswick':
        setConfig(brunswickConfig);
        break;
      case 'gray':
        setConfig(grayConfig);
        break;
      default:
        setConfig(lewistonConfig);
    }
  }, []);

  return config;
}
