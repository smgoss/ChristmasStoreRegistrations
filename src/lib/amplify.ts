import { Amplify } from 'aws-amplify';
import outputs from '../../amplify_outputs.json';

// Single place to configure Amplify on both client/server where needed
if (!Amplify.getConfig()?.Auth) {
  Amplify.configure(outputs);
}

export {}; // side-effect module

