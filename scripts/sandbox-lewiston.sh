#!/bin/bash

# Lewiston Campus Sandbox
echo "🟣 Starting Lewiston Campus Sandbox"
echo "===================================="
echo ""

# Set campus configuration
export NEXT_PUBLIC_LOCATION=lewiston

echo "Campus: Pathway Vineyard Lewiston Campus"
echo "Theme: Purple (#7c3aed)"
echo "Contact: lewiston@pathwayvineyard.com"
echo "Time Slots: 09:00 - 11:30"
echo "Capacity: 20 people per slot"
echo ""

# Start sandbox with unique identifier
echo "🚀 Starting Amplify sandbox for Lewiston..."
echo "   Sandbox ID: stephengoss-lewiston"
echo ""
echo "📱 Once ready, access at:"
echo "   Frontend: http://localhost:3004"
echo "   Admin: http://localhost:3004/admin"
echo ""

npx ampx sandbox --identifier stephengoss-lewiston