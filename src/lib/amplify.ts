import { Amplify } from 'aws-amplify';

// Simplest approach - try to import outputs directly as per Amplify Gen 2 docs
try {
  // This should work when amplify_outputs.json exists in project root
  const outputs = require('../../amplify_outputs.json');
  Amplify.configure(outputs);
  console.log('✅ Amplify configured from root amplify_outputs.json');
} catch (rootError) {
  try {
    // Try public directory
    const outputs = require('../../public/amplify_outputs.json');
    Amplify.configure(outputs);
    console.log('✅ Amplify configured from public/amplify_outputs.json');
  } catch (publicError) {
    // For client-side, try fetching from public
    if (typeof window !== 'undefined') {
      fetch('/amplify_outputs.json')
        .then(response => {
          if (!response.ok) throw new Error('Failed to fetch');
          return response.json();
        })
        .then(outputs => {
          Amplify.configure(outputs);
          console.log('✅ Amplify configured from fetch /amplify_outputs.json');
        })
        .catch(fetchError => {
          console.error('❌ Failed to configure Amplify:', {
            rootError: rootError instanceof Error ? rootError.message : String(rootError),
            publicError: publicError instanceof Error ? publicError.message : String(publicError),
            fetchError: fetchError instanceof Error ? fetchError.message : String(fetchError)
          });
        });
    } else {
      console.error('❌ Could not find amplify_outputs.json on server side');
    }
  }
}

// Legacy export for compatibility
export async function ensureAmplifyConfigured(): Promise<void> {
  // In the new pattern, configuration happens immediately on import
  return Promise.resolve();
}
