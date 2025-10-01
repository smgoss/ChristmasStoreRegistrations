'use client';

import { useState } from 'react';
import { getAdminClient } from '@/lib/amplify';

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

export default function FixConfigPage() {
  const [status, setStatus] = useState<string>('');
  const [isFixing, setIsFixing] = useState(false);

  const fixCurrentBranchConfig = async () => {
    setIsFixing(true);
    setStatus('🔧 Starting fix process...\n');
    
    try {
      const currentBranch = process.env.NEXT_PUBLIC_LOCATION || 'gray';
      const config = branchConfigs[currentBranch as keyof typeof branchConfigs];
      
      if (!config) {
        setStatus(prev => prev + `❌ No configuration found for branch: ${currentBranch}\n`);
        return;
      }
      
      setStatus(prev => prev + `📋 Fixing configuration for ${currentBranch} branch...\n`);
      
      const client = await getAdminClient();
      
      // Get existing configs
      setStatus(prev => prev + '🔍 Checking existing records...\n');
      const { data: existingConfigs } = await client.models.RegistrationConfig.list();
      
      // Delete existing records
      if (existingConfigs && existingConfigs.length > 0) {
        setStatus(prev => prev + `🗑️  Deleting ${existingConfigs.length} existing records...\n`);
        
        for (const existingConfig of existingConfigs) {
          await client.models.RegistrationConfig.delete({ id: existingConfig.id });
          setStatus(prev => prev + `   ✅ Deleted record: ${existingConfig.id}\n`);
        }
      }
      
      // Create new correct config
      setStatus(prev => prev + '\n✨ Creating new configuration...\n');
      
      const { data: newConfig } = await client.models.RegistrationConfig.create({
        id: config.id,
        locationName: config.locationName,
        eventAddress: config.eventAddress,
        contactEmail: config.contactEmail,
        fromEmail: config.fromEmail,
        contactPhone: config.contactPhone,
        registrationOpenDate: '2025-12-01T00:00:00.000Z',
        registrationDeadline: '2025-12-10T23:59:59.000Z', 
        finalConfirmationDeadline: '2025-12-11T23:59:59.000Z'
      });
      
      if (newConfig) {
        setStatus(prev => prev + '\n🎉 SUCCESS! Configuration fixed:\n');
        setStatus(prev => prev + `   ID: ${newConfig.id}\n`);
        setStatus(prev => prev + `   Location: ${newConfig.locationName}\n`);
        setStatus(prev => prev + `   Address: ${newConfig.eventAddress}\n`);
        setStatus(prev => prev + `   Contact: ${newConfig.contactEmail}\n\n`);
        setStatus(prev => prev + '📋 What this fixes:\n');
        setStatus(prev => prev + '   ✅ Cancellation emails will show correct location\n');
        setStatus(prev => prev + '   ✅ SMS messages will work properly\n');
        setStatus(prev => prev + '   ✅ Lambda functions will find branch-specific config\n');
      } else {
        setStatus(prev => prev + '❌ Failed to create new configuration\n');
      }
      
    } catch (error) {
      setStatus(prev => prev + `❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">
            🔧 Fix RegistrationConfig Database
          </h1>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <h2 className="font-bold text-yellow-800 mb-2">⚠️ What this fixes:</h2>
            <ul className="text-yellow-700 space-y-1">
              <li>• Cancellation emails showing wrong location (Orono/Lewiston instead of branch-specific)</li>
              <li>• SMS not working (Lambda functions can't find branch-specific config)</li>
              <li>• Admin interface and Lambda functions using different config records</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="font-bold text-blue-800 mb-2">🎯 Current Branch:</h2>
            <p className="text-blue-700">
              {process.env.NEXT_PUBLIC_LOCATION || 'gray'} - {branchConfigs[process.env.NEXT_PUBLIC_LOCATION as keyof typeof branchConfigs || 'gray']?.locationName}
            </p>
          </div>
          
          <button
            onClick={fixCurrentBranchConfig}
            disabled={isFixing}
            className={`px-6 py-3 rounded-lg font-semibold text-white ${
              isFixing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {isFixing ? '🔧 Fixing...' : '🔧 Fix Current Branch Configuration'}
          </button>
          
          {status && (
            <div className="mt-6">
              <h3 className="font-bold mb-2">Status:</h3>
              <pre className="bg-gray-100 p-4 rounded border text-sm whitespace-pre-wrap">
                {status}
              </pre>
            </div>
          )}
          
          <div className="mt-6 text-sm text-gray-600">
            <p><strong>Note:</strong> Run this on each branch to fix all configurations:</p>
            <ul className="mt-2 space-y-1">
              <li>• Gray branch: http://localhost:3004/admin/fix-config</li>
              <li>• Brunswick branch: Switch to brunswick branch and access admin</li>
              <li>• Lewiston branch: Switch to lewiston branch and access admin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}