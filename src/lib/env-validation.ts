/**
 * Centralized environment variable validation
 * Validates and exports typed environment variables with runtime checks
 */

// Required environment variables
const requiredEnvVars = {
  NEXT_PUBLIC_LOCATION: process.env.NEXT_PUBLIC_LOCATION,
  CLEAR_STREAM_API_KEY: process.env.CLEAR_STREAM_API_KEY,
  FROM_EMAIL: process.env.FROM_EMAIL,
  AWS_REGION: process.env.AWS_REGION,
} as const;

// Optional environment variables with defaults
const optionalEnvVars = {
  CLEARSTREAM_TEXT_HEADER: process.env.CLEARSTREAM_TEXT_HEADER || 'Christmas Store',
  NODE_ENV: process.env.NODE_ENV || 'development',
  NEXT_TELEMETRY_DISABLED: process.env.NEXT_TELEMETRY_DISABLED || '1',
} as const;

// Validation function
function validateEnvironment() {
  const errors: string[] = [];
  
  // Check required variables
  Object.entries(requiredEnvVars).forEach(([key, value]) => {
    if (!value || value.trim() === '') {
      errors.push(`Missing required environment variable: ${key}`);
    }
  });
  
  // Validate NEXT_PUBLIC_LOCATION format
  if (requiredEnvVars.NEXT_PUBLIC_LOCATION) {
    const validLocations = ['location1', 'location2', 'location3'];
    if (!validLocations.includes(requiredEnvVars.NEXT_PUBLIC_LOCATION)) {
      errors.push(`Invalid NEXT_PUBLIC_LOCATION: ${requiredEnvVars.NEXT_PUBLIC_LOCATION}. Must be one of: ${validLocations.join(', ')}`);
    }
  }
  
  // Validate email format
  if (requiredEnvVars.FROM_EMAIL) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(requiredEnvVars.FROM_EMAIL)) {
      errors.push(`Invalid FROM_EMAIL format: ${requiredEnvVars.FROM_EMAIL}`);
    }
  }
  
  // Validate AWS region
  if (requiredEnvVars.AWS_REGION) {
    const validRegions = ['us-east-1', 'us-west-2', 'eu-west-1', 'ap-southeast-1'];
    if (!validRegions.includes(requiredEnvVars.AWS_REGION)) {
      console.warn(`⚠️ Uncommon AWS region: ${requiredEnvVars.AWS_REGION}`);
    }
  }
  
  if (errors.length > 0) {
    console.error('❌ Environment validation failed:');
    errors.forEach(error => console.error(`  - ${error}`));
    
    if (typeof window === 'undefined') {
      // Server-side: fail fast
      throw new Error(`Environment validation failed: ${errors.join(', ')}`);
    } else {
      // Client-side: warn but don't crash
      console.warn('⚠️ Client-side environment issues detected');
    }
  } else {
    console.log('✅ Environment validation passed');
  }
}

// Run validation immediately (but catch errors in development)
try {
  validateEnvironment();
} catch (error) {
  if (optionalEnvVars.NODE_ENV === 'development') {
    console.warn('⚠️ Development mode: Environment validation failed but continuing');
    console.warn(error);
  } else {
    throw error;
  }
}

// Export validated environment variables
export const env = {
  ...requiredEnvVars,
  ...optionalEnvVars,
  
  // Computed values
  isProduction: optionalEnvVars.NODE_ENV === 'production',
  isDevelopment: optionalEnvVars.NODE_ENV === 'development',
  isTest: optionalEnvVars.NODE_ENV === 'test',
} as const;

// Re-export validation function for testing
export { validateEnvironment };

// Type exports
export type EnvironmentVariables = typeof env;
export type RequiredEnvVars = typeof requiredEnvVars;
export type OptionalEnvVars = typeof optionalEnvVars;