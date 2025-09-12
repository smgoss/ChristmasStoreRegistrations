import { Amplify } from 'aws-amplify';

// Amplify Gen 2 configuration with fallback
let configured = false;

function configureAmplify() {
  if (configured) return;

  // Try to load amplify_outputs.json from various locations
  try {
    // Method 1: Root directory
    const outputs = require('../../amplify_outputs.json');
    Amplify.configure(outputs);
    configured = true;
    console.log('✅ Amplify configured from root amplify_outputs.json');
    return;
  } catch (rootError) {
    try {
      // Method 2: Public directory  
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
            // Method 4: Fallback to working sandbox configuration
            console.warn('⚠️ Using fallback sandbox configuration until Amplify Gen 2 backend deploys');
            const fallbackConfig = {
              "auth": {
                "user_pool_id": "us-east-1_vwgchbYC8",
                "aws_region": "us-east-1", 
                "user_pool_client_id": "1dsj6m1frqcp4lq23aeie2kaea",
                "identity_pool_id": "us-east-1:ce2d84ed-1506-42b9-8394-2e402b5fd311",
                "mfa_methods": [],
                "standard_required_attributes": ["email"],
                "username_attributes": ["email"],
                "user_verification_types": ["email"],
                "groups": [{"admin": {"precedence": 0}}],
                "mfa_configuration": "NONE",
                "password_policy": {
                  "min_length": 8,
                  "require_lowercase": true,
                  "require_numbers": true,
                  "require_symbols": true,
                  "require_uppercase": true
                },
                "unauthenticated_identities_enabled": true
              },
              "data": {
                "url": "https://ps5sezumsvcmloznr4nryeodka.appsync-api.us-east-1.amazonaws.com/graphql",
                "aws_region": "us-east-1",
                "api_key": "da2-aiwlbul6rrhxflgxabtagr7kfa",
                "default_authorization_type": "API_KEY",
                "authorization_types": ["AMAZON_COGNITO_USER_POOLS", "AWS_IAM"]
              },
              "version": "1.4"
            };
            
            Amplify.configure(fallbackConfig);
            configured = true;
            console.log('✅ Amplify configured with fallback sandbox configuration');
          });
      } else {
        // Server-side fallback
        console.warn('⚠️ Using server-side fallback sandbox configuration until Amplify Gen 2 backend deploys');
        const fallbackConfig = {
          "auth": {
            "user_pool_id": "us-east-1_vwgchbYC8",
            "aws_region": "us-east-1",
            "user_pool_client_id": "1dsj6m1frqcp4lq23aeie2kaea",
            "identity_pool_id": "us-east-1:ce2d84ed-1506-42b9-8394-2e402b5fd311",
            "mfa_methods": [],
            "standard_required_attributes": ["email"],
            "username_attributes": ["email"], 
            "user_verification_types": ["email"],
            "groups": [{"admin": {"precedence": 0}}],
            "mfa_configuration": "NONE",
            "password_policy": {
              "min_length": 8,
              "require_lowercase": true,
              "require_numbers": true,
              "require_symbols": true,
              "require_uppercase": true
            },
            "unauthenticated_identities_enabled": true
          },
          "data": {
            "url": "https://ps5sezumsvcmloznr4nryeodka.appsync-api.us-east-1.amazonaws.com/graphql",
            "aws_region": "us-east-1",
            "api_key": "da2-aiwlbul6rrhxflgxabtagr7kfa", 
            "default_authorization_type": "API_KEY",
            "authorization_types": ["AMAZON_COGNITO_USER_POOLS", "AWS_IAM"]
          },
          "version": "1.4"
        };
        
        Amplify.configure(fallbackConfig);
        configured = true;
        console.log('✅ Amplify configured with server-side fallback configuration');
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
