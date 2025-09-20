import { Amplify } from 'aws-amplify';

// Amplify Gen 2 configuration - use generated amplify_outputs.json
let configured = false;
let configurationPromise: Promise<void> | null = null;

async function configureAmplify(): Promise<void> {
  if (configured) return;
  if (configurationPromise) return configurationPromise;

  configurationPromise = (async () => {
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
          try {
            const response = await fetch('/amplify_outputs.json');
            if (!response.ok) throw new Error('Failed to fetch');
            const outputs = await response.json();
            Amplify.configure(outputs);
            configured = true;
            console.log('✅ Amplify configured from fetch /amplify_outputs.json');
          } catch (fetchError) {
            console.error('❌ Failed to configure Amplify:', fetchError);
            throw new Error('Amplify configuration failed - amplify_outputs.json not found');
          }
        } else {
          console.error('❌ Server-side Amplify configuration failed - amplify_outputs.json not found');
          throw new Error('Amplify configuration failed - amplify_outputs.json not found');
        }
      }
    }
  })();

  return configurationPromise;
}

// Configure immediately (but don't await in module scope)
configureAmplify().catch(console.error);

// Export for explicit configuration awaiting
export async function ensureAmplifyConfigured(): Promise<void> {
  await configureAmplify();
}
