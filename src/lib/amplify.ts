import { Amplify } from 'aws-amplify';

// Amplify Gen 2 configuration - use generated amplify_outputs.json
let configured = false;

function configureAmplify() {
  if (configured) return;

  try {
    // Method 1: Root directory (server-side)
    const outputs = require('../../amplify_outputs.json');
    Amplify.configure(outputs);
    configured = true;
    console.log('✅ Amplify configured from root amplify_outputs.json');
    return;
  } catch (rootError) {
    try {
      // Method 2: Public directory (server-side)
      const outputs = require('../../public/amplify_outputs.json');
      Amplify.configure(outputs);
      configured = true;
      console.log('✅ Amplify configured from public/amplify_outputs.json');
      return;
    } catch (publicError) {
      // Method 3: Client-side fetch
      if (typeof window !== 'undefined') {
        fetch('/amplify_outputs.json')
          .then(response => {
            if (!response.ok) throw new Error('Failed to fetch');
            return response.json();
          })
          .then(outputs => {
            Amplify.configure(outputs);
            configured = true;
            console.log('✅ Amplify configured from fetch /amplify_outputs.json');
          })
          .catch(fetchError => {
            console.error('❌ Failed to configure Amplify:', fetchError);
            throw new Error('Amplify configuration failed - amplify_outputs.json not found');
          });
      } else {
        console.error('❌ Server-side Amplify configuration failed - amplify_outputs.json not found');
        throw new Error('Amplify configuration failed - amplify_outputs.json not found');
      }
    }
  }
}

// Configure immediately
configureAmplify();

// Legacy export for compatibility
export async function ensureAmplifyConfigured(): Promise<void> {
  // In the new pattern, configuration happens immediately on import
  return Promise.resolve();
}
