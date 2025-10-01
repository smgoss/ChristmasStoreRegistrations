#!/usr/bin/env node

import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import fs from 'fs';
import path from 'path';

// Load amplify outputs
const outputsPath = path.join(process.cwd(), 'amplify_outputs.json');
if (!fs.existsSync(outputsPath)) {
  console.error('❌ amplify_outputs.json not found. Make sure you are in the correct directory and have deployed.');
  process.exit(1);
}

const outputs = JSON.parse(fs.readFileSync(outputsPath, 'utf8'));

// Configure Amplify
Amplify.configure(outputs);

// Create client with API key for script access
const client = generateClient({ authMode: 'apiKey' });

// Configuration data for each branch
const branchConfigs = {
  gray: {
    id: 'gray',
    locationName: 'Pathway Vineyard Gray-New Gloucester Campus',
    eventAddress: 'Gray-New Gloucester, Maine',
    contactEmail: 'gray@pathwayvineyard.com',
    fromEmail: 'noreply@pathwayvineyard.com',
    contactPhone: '(207) 555-0300'
  },
  brunswick: {
    id: 'brunswick', 
    locationName: 'Pathway Vineyard Brunswick Campus',
    eventAddress: '2 Columbus Dr, Brunswick, ME 04011',
    contactEmail: 'brunswick@pathwayvineyard.com',
    fromEmail: 'noreply@pathwayvineyard.com',
    contactPhone: '(207) 555-0200'
  },
  lewiston: {
    id: 'lewiston',
    locationName: 'Pathway Vineyard Lewiston Campus', 
    eventAddress: '12 Foss Road, Lewiston, ME 04240',
    contactEmail: 'lewiston@pathwayvineyard.com',
    fromEmail: 'noreply@pathwayvineyard.com',
    contactPhone: '(207) 555-0100'
  }
};

async function fixRegistrationConfig() {
  try {
    // Determine which branch we're on based on environment or directory
    const currentBranch = process.env.AMPLIFY_BRANCH || process.env.NEXT_PUBLIC_LOCATION || 'gray';
    
    console.log(`🔧 Fixing RegistrationConfig for ${currentBranch} branch...`);
    console.log('');
    
    if (!branchConfigs[currentBranch]) {
      console.error(`❌ No configuration found for branch: ${currentBranch}`);
      process.exit(1);
    }
    
    // Get current config records
    console.log('📋 Querying existing RegistrationConfig records...');
    const { data: existingConfigs } = await client.models.RegistrationConfig.list();
    
    console.log(`   Found ${existingConfigs?.length || 0} existing records`);
    
    // Delete all existing records
    if (existingConfigs && existingConfigs.length > 0) {
      console.log('🗑️  Deleting existing RegistrationConfig records...');
      for (const config of existingConfigs) {
        try {
          await client.models.RegistrationConfig.delete({ id: config.id });
          console.log(`   ✅ Deleted record with ID: ${config.id}`);
        } catch (deleteError) {
          console.log(`   ⚠️  Could not delete record ${config.id}:`, deleteError.message);
        }
      }
    }
    
    // Create new correct config
    console.log('');
    console.log('✨ Creating new RegistrationConfig with correct data...');
    
    const newConfig = branchConfigs[currentBranch];
    
    const { data: createdConfig } = await client.models.RegistrationConfig.create({
      id: newConfig.id,
      locationName: newConfig.locationName,
      eventAddress: newConfig.eventAddress,
      contactEmail: newConfig.contactEmail,
      fromEmail: newConfig.fromEmail,
      contactPhone: newConfig.contactPhone,
      registrationOpenDate: '2025-12-01T00:00:00.000Z',
      registrationDeadline: '2025-12-10T23:59:59.000Z', 
      finalConfirmationDeadline: '2025-12-11T23:59:59.000Z'
    });
    
    if (createdConfig) {
      console.log('✅ Successfully created new RegistrationConfig:');
      console.log(`   ID: ${createdConfig.id}`);
      console.log(`   Location: ${createdConfig.locationName}`);
      console.log(`   Address: ${createdConfig.eventAddress}`);
      console.log(`   Contact: ${createdConfig.contactEmail}`);
      console.log('');
      console.log('🎉 RegistrationConfig fixed successfully!');
      console.log('');
      console.log('📋 Next steps:');
      console.log('1. Test cancellation emails - should now show correct location');
      console.log('2. Test SMS - should now work properly');
      console.log('3. Verify admin interface shows correct data');
    } else {
      console.error('❌ Failed to create new RegistrationConfig');
    }
    
  } catch (error) {
    console.error('❌ Error fixing RegistrationConfig:', error);
    
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.error('   Make sure you have proper admin access configured.');
      console.error('   You may need to run this from the admin interface or configure authentication.');
    }
  }
}

// Run the fix
fixRegistrationConfig();