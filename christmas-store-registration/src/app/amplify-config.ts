import { Amplify } from 'aws-amplify';

const amplifyConfig = {
  "auth": {
    "user_pool_id": "us-east-1_vwgchbYC8",
    "aws_region": "us-east-1",
    "user_pool_client_id": "1dsj6m1frqcp4lq23aeie2kaea",
    "identity_pool_id": "us-east-1:ce2d84ed-1506-42b9-8394-2e402b5fd311",
    "mfa_methods": [],
    "standard_required_attributes": [
      "email"
    ],
    "username_attributes": [
      "email"
    ],
    "user_verification_types": [
      "email"
    ],
    "groups": [
      {
        "admin": {
          "precedence": 0
        }
      }
    ],
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
    "authorization_types": [
      "AMAZON_COGNITO_USER_POOLS",
      "AWS_IAM"
    ]
  },
  "version": "1.4"
};

Amplify.configure(amplifyConfig);