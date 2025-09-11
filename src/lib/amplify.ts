import { Amplify } from 'aws-amplify';

let configured = false;
let configPromise: Promise<void> | null = null;

async function configureAmplify(): Promise<void> {
  if (configured) return;
  
  try {
    // If already configured, skip
    const cfg: any = Amplify.getConfig();
    if (cfg && (cfg.Auth || cfg.API)) {
      configured = true;
      return;
    }

    // Try server-side load of amplify_outputs.json (when present in env)
    if (typeof window === 'undefined') {
      try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const path = require('node:path');
        const fs = require('node:fs');
        const p = path.join(process.cwd(), 'amplify_outputs.json');
        if (fs.existsSync(p)) {
          const data = JSON.parse(fs.readFileSync(p, 'utf8'));
          Amplify.configure(data);
          configured = true;
          return;
        }
      } catch {
        // ignore
      }
    } else {
      // Try client-side fetch
      try {
        const res = await fetch('/amplify_outputs.json');
        if (res.ok) {
          const data = await res.json();
          Amplify.configure(data);
          configured = true;
          return;
        }
      } catch {
        // ignore
      }
    }
  } catch {
    // ignore
  }
}

// Export a function to ensure Amplify is configured before use
export async function ensureAmplifyConfigured(): Promise<void> {
  if (configured) return;
  
  if (!configPromise) {
    configPromise = configureAmplify();
  }
  
  await configPromise;
}

// Immediately configure on server side if possible
if (typeof window === 'undefined') {
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const path = require('node:path');
    const fs = require('node:fs');
    const p = path.join(process.cwd(), 'amplify_outputs.json');
    if (fs.existsSync(p)) {
      const data = JSON.parse(fs.readFileSync(p, 'utf8'));
      Amplify.configure(data);
      configured = true;
    }
  } catch {
    // ignore
  }
}

// Fire and forget; consumers can import this module for side-effect
void configureAmplify();
