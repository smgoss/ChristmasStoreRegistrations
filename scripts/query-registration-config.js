#!/usr/bin/env node

import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import fs from 'fs';
import path from 'path';

// Load amplify outputs for Gray branch
const outputsPath = path.join(process.cwd(), 'amplify_outputs.json');
if (!fs.existsSync(outputsPath)) {
  console.error('❌ amplify_outputs.json not found. Make sure you are in the correct directory and have deployed the Gray branch.');
  process.exit(1);
}

const outputs = JSON.parse(fs.readFileSync(outputsPath, 'utf8'));

// Configure Amplify
Amplify.configure(outputs);

// Create client
const client = generateClient({ authMode: 'apiKey' });

async function queryRegistrationConfig() {
  try {
    console.log('🔍 Querying RegistrationConfig data for Gray branch...');
    console.log('');
    
    // Query all RegistrationConfig records
    const { data: configs } = await client.models.RegistrationConfig.list();
    
    if (!configs || configs.length === 0) {
      console.log('📋 No RegistrationConfig records found');
      return;
    }
    
    console.log(`📋 Found ${configs.length} RegistrationConfig record(s):`);
    console.log('');
    
    configs.forEach((config, index) => {
      console.log(`🏢 Record ${index + 1}:`);
      console.log(`   ID: ${config.id}`);
      console.log(`   Location Name: ${config.locationName || 'N/A'}`);
      console.log(`   Event Address: ${config.eventAddress || 'N/A'}`);
      console.log(`   Contact Email: ${config.contactEmail || 'N/A'}`);
      console.log(`   From Email: ${config.fromEmail || 'N/A'}`);
      console.log(`   Contact Phone: ${config.contactPhone || 'N/A'}`);
      console.log(`   Registration Open: ${config.registrationOpenDate || 'N/A'}`);
      console.log(`   Registration Deadline: ${config.registrationDeadline || 'N/A'}`);
      console.log(`   Final Confirmation Deadline: ${config.finalConfirmationDeadline || 'N/A'}`);
      console.log(`   Created At: ${config.createdAt || 'N/A'}`);
      console.log(`   Updated At: ${config.updatedAt || 'N/A'}`);
      console.log('');
    });
    
    // Check if there are multiple configs
    if (configs.length > 1) {
      console.log('⚠️  WARNING: Multiple RegistrationConfig records found!');
      console.log('   This can cause inconsistent behavior between admin interface and Lambda functions.');
      console.log('   Consider deleting duplicate records or purging the database.');
      console.log('');
    }
    
  } catch (error) {
    console.error('❌ Error querying RegistrationConfig:', error);
    
    if (error.message.includes('401') || error.message.includes('Unauthorized')) {
      console.error('   Make sure you have proper API access configured.');
    }
  }
}

// Run the query
queryRegistrationConfig();