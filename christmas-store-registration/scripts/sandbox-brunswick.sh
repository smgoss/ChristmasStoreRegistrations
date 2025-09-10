#!/bin/bash

# Brunswick Campus Sandbox  
echo "🟢 Starting Brunswick Campus Sandbox"
echo "====================================="
echo ""

# Set campus configuration
export NEXT_PUBLIC_LOCATION=location2

echo "Campus: Pathway Vineyard Brunswick Campus"
echo "Theme: Green (#059669)" 
echo "Contact: brunswick@pathwayvineyard.com"
echo "Time Slots: 10:00 - 12:30"
echo "Capacity: 25 people per slot"
echo ""

# Start sandbox with unique identifier
echo "🚀 Starting Amplify sandbox for Brunswick..."
echo "   Sandbox ID: stephengoss-brunswick"
echo ""
echo "📱 Once ready, access at:"
echo "   Frontend: http://localhost:3004"
echo "   Admin: http://localhost:3004/admin"  
echo ""

npx ampx sandbox --identifier stephengoss-brunswick