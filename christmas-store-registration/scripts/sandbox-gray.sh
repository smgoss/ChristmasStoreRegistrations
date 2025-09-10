#!/bin/bash

# Gray-New Gloucester Campus Sandbox
echo "🔴 Starting Gray-New Gloucester Campus Sandbox"
echo "=============================================="
echo ""

# Set campus configuration
export NEXT_PUBLIC_LOCATION=location3

echo "Campus: Pathway Vineyard Gray-New Gloucester Campus"
echo "Theme: Red (#dc2626)"
echo "Contact: gray@pathwayvineyard.com"
echo "Time Slots: 08:30 - 11:00"
echo "Capacity: 15 people per slot"
echo ""

# Start sandbox with unique identifier
echo "🚀 Starting Amplify sandbox for Gray-New Gloucester..."
echo "   Sandbox ID: stephengoss-gray"
echo ""
echo "📱 Once ready, access at:"
echo "   Frontend: http://localhost:3004"
echo "   Admin: http://localhost:3004/admin"
echo ""

npx ampx sandbox --identifier stephengoss-gray