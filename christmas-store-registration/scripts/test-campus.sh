#!/bin/bash

# Test Campus Configuration Script
# Usage: ./scripts/test-campus.sh location1
#        ./scripts/test-campus.sh location2  
#        ./scripts/test-campus.sh location3

LOCATION=$1
CAMPUS_NAMES=("location1:Lewiston" "location2:Brunswick" "location3:Gray-New_Gloucester")

if [ -z "$LOCATION" ]; then
  echo "🎄 Christmas Store Campus Tester"
  echo "================================"
  echo ""
  echo "Usage: $0 <location1|location2|location3>"
  echo ""
  echo "Available campuses:"
  echo "  location1 - 🟣 Lewiston Campus (Purple theme)"
  echo "  location2 - 🟢 Brunswick Campus (Green theme)"
  echo "  location3 - 🔴 Gray-New Gloucester Campus (Red theme)"
  echo ""
  echo "This will start the dev server with campus-specific configuration."
  exit 1
fi

if [ ! -f "config/${LOCATION}.json" ]; then
  echo "❌ Config file config/${LOCATION}.json not found!"
  exit 1
fi

# Get campus name for display
CAMPUS_NAME=""
for item in "${CAMPUS_NAMES[@]}"; do
  key="${item%%:*}"
  value="${item##*:}"
  if [ "$key" = "$LOCATION" ]; then
    CAMPUS_NAME="$value"
    break
  fi
done

# Load config for display
CONFIG_FILE="config/${LOCATION}.json"
LOCATION_NAME=$(jq -r '.locationName' $CONFIG_FILE)
LOCATION_ADDRESS=$(jq -r '.locationAddress' $CONFIG_FILE)
CONTACT_EMAIL=$(jq -r '.contactEmail' $CONFIG_FILE)
PRIMARY_COLOR=$(jq -r '.branding.primaryColor' $CONFIG_FILE)
CAMPUS_COLOR=$(jq -r '.branding.campusColor' $CONFIG_FILE)

echo "🎄 Testing Campus Configuration"
echo "==============================="
echo ""
echo "Campus: $LOCATION_NAME"
echo "Location: $LOCATION_ADDRESS"  
echo "Contact: $CONTACT_EMAIL"
echo "Theme: $CAMPUS_COLOR ($PRIMARY_COLOR)"
echo ""
echo "🌐 Frontend will be available at: http://localhost:3004"
echo "👑 Admin panel will be available at: http://localhost:3004/admin"
echo ""

# Set environment variable for this test
export NEXT_PUBLIC_LOCATION=$LOCATION

echo "✅ Environment variable set: NEXT_PUBLIC_LOCATION=$LOCATION"
echo ""

# Check if dev server is already running
if lsof -i :3004 >/dev/null 2>&1; then
    echo "⚠️  Dev server is already running on port 3004"
    echo ""
    echo "Options:"
    echo "1. Stop the current server (Ctrl+C in the terminal running it)"
    echo "2. Or visit http://localhost:3004 to see the $CAMPUS_NAME campus"
    echo ""
    echo "The configuration has been applied - refresh your browser to see changes!"
else
    echo "🚀 Starting development server for $CAMPUS_NAME campus..."
    echo ""
    echo "Press Ctrl+C to stop the server"
    echo ""
    
    # Start dev server with campus configuration on port 3004
    npm run dev -- -p 3004
fi
