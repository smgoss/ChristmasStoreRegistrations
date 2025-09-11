import { DynamoDBClient, ScanCommand, UpdateItemCommand } from '@aws-sdk/client-dynamodb';

const dynamodb = new DynamoDBClient({ region: process.env.AWS_REGION });

export const handler = async (event: any) => {
  try {
    console.log('🔍 Checking for registrations to auto-close...');
    
    // Get the table name from environment variables
    const tableName = `RegistrationConfig-${process.env.AMPLIFY_BRANCH || 'main'}-${process.env.AMPLIFY_APP_ID || 'sandbox'}`;
    
    // Get registration configuration
    const scanResult = await dynamodb.send(new ScanCommand({
      TableName: tableName,
      Limit: 1
    }));
    
    const config = scanResult.Items?.[0];
    
    if (!config) {
      console.log('⚠️ No registration configuration found');
      return { statusCode: 404, body: 'No registration configuration found' };
    }
    
    const autoCloseEnabled = config.autoCloseEnabled?.BOOL;
    const isRegistrationOpen = config.isRegistrationOpen?.BOOL;
    const scheduledCloseDate = config.scheduledCloseDate?.S;
    const configId = config.id?.S;
    
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
      
      // Close registration
      await dynamodb.send(new UpdateItemCommand({
        TableName: tableName,
        Key: { id: { S: configId! } },
        UpdateExpression: 'SET isRegistrationOpen = :false, updatedAt = :now, updatedBy = :system',
        ExpressionAttributeValues: {
          ':false': { BOOL: false },
          ':now': { S: now.toISOString() },
          ':system': { S: 'auto-close-system' }
        }
      }));
      
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