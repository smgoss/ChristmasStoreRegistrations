#!/bin/bash

# Purge Production Databases Script
# This will delete the backend stacks for each branch, clearing all data

APP_ID="d1xs3ocggddw3n"
BRANCHES=("gray" "brunswick" "lewiston" "main")

echo "🚨 WARNING: This will DELETE ALL DATA in production databases!"
echo "This includes:"
echo "  - All registrations"
echo "  - All waitlist entries" 
echo "  - All configuration data"
echo "  - All time slot configurations"
echo ""
echo "Branches to purge:"
for branch in "${BRANCHES[@]}"; do
  echo "  - $branch"
done
echo ""

read -p "Are you absolutely sure you want to continue? Type 'PURGE' to confirm: " -r
if [[ $REPLY != "PURGE" ]]; then
    echo "Operation cancelled."
    exit 1
fi

echo ""
echo "🗑️ Starting database purge process..."

for branch in "${BRANCHES[@]}"; do
    echo ""
    echo "🔥 Purging $branch branch database..."
    
    # Delete the branch (this removes the backend stack)
    aws amplify delete-branch \
        --app-id $APP_ID \
        --branch-name $branch \
        --no-cli-pager
    
    if [ $? -eq 0 ]; then
        echo "✅ $branch backend deleted successfully"
        
        # Wait a moment for cleanup
        echo "⏳ Waiting 30 seconds for cleanup..."
        sleep 30
        
        # Recreate the branch
        echo "🔄 Recreating $branch branch..."
        aws amplify create-branch \
            --app-id $APP_ID \
            --branch-name $branch \
            --no-cli-pager
            
        if [ $? -eq 0 ]; then
            echo "✅ $branch branch recreated successfully"
        else
            echo "❌ Failed to recreate $branch branch"
        fi
    else
        echo "❌ Failed to delete $branch backend"
    fi
done

echo ""
echo "🎉 Database purge complete!"
echo ""
echo "📋 Next steps:"
echo "1. Push latest code to trigger new deployments"
echo "2. Each branch will have a fresh, empty database"
echo "3. Configure application settings in each admin interface"
echo ""

