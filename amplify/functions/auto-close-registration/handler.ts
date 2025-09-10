import type { Schema } from "../../data/resource";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/auto-close-registration';

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(env);

Amplify.configure(resourceConfig, libraryOptions);
const client = generateClient<Schema>({
  authMode: "identityPool",
});

export const handler = async (event: any) => {
  try {
    console.log('🔍 Checking for registrations to auto-close...');
    
    // Get registration configuration
    const { data: configData } = await client.models.RegistrationConfig.list();
    const config = configData?.[0];
    
    if (!config) {
      console.log('⚠️ No registration configuration found');
      return { statusCode: 404, body: 'No registration configuration found' };
    }
    
    // Only process if auto-close is enabled and registration is currently open
    if (!config.autoCloseEnabled || !config.isRegistrationOpen || !config.scheduledCloseDate) {
      console.log('ℹ️ Auto-close not enabled or registration already closed');
      return { statusCode: 200, body: 'No action needed' };
    }
    
    const now = new Date();
    const scheduledDate = new Date(config.scheduledCloseDate);
    
    console.log(`⏰ Current time: ${now.toISOString()}`);
    console.log(`📅 Scheduled close time: ${scheduledDate.toISOString()}`);
    
    if (now >= scheduledDate) {
      console.log('🔒 Time to close registration!');
      
      // Close registration
      await client.models.RegistrationConfig.update({
        id: config.id,
        isRegistrationOpen: false,
        updatedAt: now.toISOString(),
        updatedBy: 'auto-close-system'
      });
      
      console.log('✅ Registration closed successfully');
      
      return { 
        statusCode: 200, 
        body: JSON.stringify({ 
          message: 'Registration closed automatically',
          closedAt: now.toISOString()
        })
      };
    } else {
      const timeUntilClose = scheduledDate.getTime() - now.getTime();
      const minutesUntilClose = Math.round(timeUntilClose / (1000 * 60));
      
      console.log(`⏳ Registration will close in ${minutesUntilClose} minutes`);
      
      return { 
        statusCode: 200, 
        body: JSON.stringify({ 
          message: 'Registration still open',
          minutesUntilClose 
        })
      };
    }
    
  } catch (error) {
    console.error('❌ Error in auto-close handler:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Failed to process auto-close',
        details: error instanceof Error ? error.message : 'Unknown error'
      }),
    };
  }
};