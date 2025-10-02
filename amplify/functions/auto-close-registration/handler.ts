interface RegistrationConfig {
  id: string;
  autoCloseEnabled?: boolean;
  isRegistrationOpen?: boolean;
  scheduledCloseDate?: string;
}

interface GraphQLResponse {
  data?: {
    listRegistrationConfigs?: {
      items: RegistrationConfig[];
    };
    updateRegistrationConfig?: {
      id: string;
      isRegistrationOpen?: boolean;
      updatedAt?: string;
    };
  };
  errors?: Array<{ message: string }>;
}

export const handler = async () => {
  try {
    console.log('🔍 Checking for registrations to auto-close...');

    // Use GraphQL API to fetch config
    const apiUrl = process.env.AMPLIFY_DATA_GRAPHQL_ENDPOINT;
    const apiKey = process.env.AMPLIFY_DATA_API_KEY;

    if (!apiUrl || !apiKey) {
      console.error('❌ GraphQL endpoint or API key not set');
      return { statusCode: 500, body: 'GraphQL configuration missing' };
    }

    // Determine the config ID based on the branch
    const configId = process.env.AMPLIFY_BRANCH || 'main';
    console.log('📋 Fetching config for branch:', configId);

    const query = `
      query ListConfigs {
        listRegistrationConfigs {
          items {
            id
            autoCloseEnabled
            isRegistrationOpen
            scheduledCloseDate
          }
        }
      }
    `;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        query
      })
    });

    const result = await response.json() as GraphQLResponse;

    if (result.errors) {
      console.error('❌ GraphQL errors:', result.errors);
      return { statusCode: 500, body: 'Failed to fetch config' };
    }

    // Find the config that matches our branch ID
    const configs = result.data?.listRegistrationConfigs?.items || [];
    const config = configs.find(c => c.id === configId);

    if (!config) {
      console.log('⚠️ No registration configuration found');
      return { statusCode: 404, body: 'No registration configuration found' };
    }

    const autoCloseEnabled = config.autoCloseEnabled;
    const isRegistrationOpen = config.isRegistrationOpen;
    const scheduledCloseDate = config.scheduledCloseDate;
    
    // Only process if auto-close is enabled and registration is currently open
    if (!autoCloseEnabled || !isRegistrationOpen || !scheduledCloseDate) {
      console.log('ℹ️ Auto-close not enabled or registration already closed');
      return { statusCode: 200, body: 'No action needed' };
    }
    
    const now = new Date();
    const scheduledDate = new Date(scheduledCloseDate);
    
    console.log(`⏰ Current time: ${now.toISOString()}`);
    console.log(`📅 Scheduled close time: ${scheduledDate.toISOString()}`);
    
    if (now >= scheduledDate) {
      console.log('🔒 Time to close registration!');

      // Close registration using GraphQL mutation
      const mutation = `
        mutation CloseRegistration($id: String!) {
          updateRegistrationConfig(input: {
            id: $id
            isRegistrationOpen: false
            updatedAt: "${now.toISOString()}"
            updatedBy: "auto-close-system"
          }) {
            id
            isRegistrationOpen
            updatedAt
          }
        }
      `;

      const updateResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey
        },
        body: JSON.stringify({
          query: mutation,
          variables: { id: configId }
        })
      });

      const updateResult = await updateResponse.json() as GraphQLResponse;

      if (updateResult.errors) {
        console.error('❌ Failed to close registration:', updateResult.errors);
        return {
          statusCode: 500,
          body: JSON.stringify({ error: 'Failed to close registration' })
        };
      }

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