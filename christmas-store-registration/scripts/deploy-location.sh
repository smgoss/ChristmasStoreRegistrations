#!/bin/bash

# Amplify Multi-Campus Deployment Script
# Usage: ./scripts/deploy-location.sh location1
#        ./scripts/deploy-location.sh location2  
#        ./scripts/deploy-location.sh location3

LOCATION=$1
CAMPUS_NAMES=("location1:lewiston" "location2:brunswick" "location3:gray")

if [ -z "$LOCATION" ]; then
  echo "Usage: $0 <location1|location2|location3>"
  echo "Available locations:"
  echo "  location1 - Lewiston Campus"
  echo "  location2 - Brunswick Campus"
  echo "  location3 - Gray-New Gloucester Campus"
  exit 1
fi

if [ ! -f "config/${LOCATION}.json" ]; then
  echo "❌ Config file config/${LOCATION}.json not found!"
  exit 1
fi

# Get campus name for app naming
CAMPUS_NAME=""
for item in "${CAMPUS_NAMES[@]}"; do
  key="${item%%:*}"
  value="${item##*:}"
  if [ "$key" = "$LOCATION" ]; then
    CAMPUS_NAME="$value"
    break
  fi
done

echo "🎄 Deploying Christmas Store for ${CAMPUS_NAME} campus (${LOCATION})..."

# Load config for environment variables
CONFIG_FILE="config/${LOCATION}.json"
LOCATION_NAME=$(jq -r '.locationName' $CONFIG_FILE)
LOCATION_ADDRESS=$(jq -r '.locationAddress' $CONFIG_FILE)
CONTACT_EMAIL=$(jq -r '.contactEmail' $CONFIG_FILE)
FROM_EMAIL=$(jq -r '.fromEmail' $CONFIG_FILE)
PRIMARY_COLOR=$(jq -r '.branding.primaryColor' $CONFIG_FILE)
SECONDARY_COLOR=$(jq -r '.branding.secondaryColor' $CONFIG_FILE)
LOCATION_EMOJI=$(jq -r '.branding.locationEmoji' $CONFIG_FILE)

# Set environment variables for build
export NEXT_PUBLIC_LOCATION=$LOCATION
export LOCATION_NAME="$LOCATION_NAME"
export LOCATION_ADDRESS="$LOCATION_ADDRESS"
export CONTACT_EMAIL="$CONTACT_EMAIL"
export FROM_EMAIL="$FROM_EMAIL"
export PRIMARY_COLOR="$PRIMARY_COLOR"
export SECONDARY_COLOR="$SECONDARY_COLOR" 
export LOCATION_EMOJI="$LOCATION_EMOJI"

APP_NAME="pathway-vineyard-christmas-${CAMPUS_NAME}"

echo "📝 Setting up Amplify app: ${APP_NAME}"

# Check if this is a new deployment or existing
if [ ! -f "amplify/.config/project-config.json" ]; then
  echo "🔧 Initializing new Amplify app..."
  
  # Initialize Amplify with specific app name
  amplify init \
    --appname "$APP_NAME" \
    --envname "${CAMPUS_NAME}" \
    --yes
    
  echo "✅ Amplify app initialized!"
else
  echo "🔄 Using existing Amplify configuration..."
fi

# Deploy backend and frontend
echo "☁️ Deploying to AWS..."
amplify push --yes

# Get the app ID for setting environment variables
APP_ID=$(amplify status --json | jq -r '.providers.awscloudformation.AmplifyAppId' 2>/dev/null)

if [ "$APP_ID" != "null" ] && [ -n "$APP_ID" ]; then
  echo "🔧 Setting environment variables for app: $APP_ID"
  
  # Set environment variables in Amplify Console
  aws amplify put-app \
    --app-id "$APP_ID" \
    --environment-variables \
      NEXT_PUBLIC_LOCATION="$LOCATION" \
      LOCATION_NAME="$LOCATION_NAME" \
      LOCATION_ADDRESS="$LOCATION_ADDRESS" \
      CONTACT_EMAIL="$CONTACT_EMAIL" \
      FROM_EMAIL="$FROM_EMAIL" \
      PRIMARY_COLOR="$PRIMARY_COLOR" \
      SECONDARY_COLOR="$SECONDARY_COLOR" \
      LOCATION_EMOJI="$LOCATION_EMOJI" \
    --no-cli-pager

  # Trigger a new build with updated environment variables
  BRANCH_NAME=$(git branch --show-current)
  aws amplify start-job \
    --app-id "$APP_ID" \
    --branch-name "$BRANCH_NAME" \
    --job-type RELEASE \
    --no-cli-pager

  echo "✅ Deployment complete for ${CAMPUS_NAME} campus!"
  echo "🌐 App URL: https://${BRANCH_NAME}.${APP_ID}.amplifyapp.com"
  echo "👑 Admin URL: https://${BRANCH_NAME}.${APP_ID}.amplifyapp.com/admin"
else
  echo "⚠️  Could not get app ID. Environment variables not set."
  echo "   Please set them manually in the Amplify Console."
fi

echo ""
echo "📋 Next Steps:"
echo "1. 📧 Configure SES for: $FROM_EMAIL"
echo "2. 👥 Create admin user for: $CONTACT_EMAIL" 
echo "3. 🧪 Test registration at the app URL above"
echo ""