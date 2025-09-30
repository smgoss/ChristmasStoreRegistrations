#!/bin/bash

# Deploy All Pathway Vineyard Campuses
# This will create 3 separate Amplify apps, one for each campus

echo "🎄 Deploying Christmas Store for ALL Pathway Vineyard Campuses"
echo "============================================================"
echo ""

# Check prerequisites
echo "🔍 Checking prerequisites..."

# Check if jq is installed
if ! command -v jq &> /dev/null; then
    echo "❌ jq is required but not installed."
    echo "   Install with: brew install jq (macOS) or apt-get install jq (Ubuntu)"
    exit 1
fi

# Check if AWS CLI is configured
if ! aws sts get-caller-identity &> /dev/null; then
    echo "❌ AWS CLI not configured or no valid credentials."
    echo "   Run: aws configure"
    exit 1
fi

# Check if Amplify CLI is installed
if ! command -v amplify &> /dev/null; then
    echo "❌ Amplify CLI is required but not installed."
    echo "   Install with: npm install -g @aws-amplify/cli"
    exit 1
fi

echo "✅ All prerequisites met!"
echo ""

# Confirm deployment
echo "This will create 3 separate AWS Amplify applications:"
echo "  🟣 Lewiston Campus (Purple theme)"
echo "  🟢 Brunswick Campus (Green theme)"  
echo "  🔴 Gray-New Gloucester Campus (Red theme)"
echo ""
read -p "Continue with deployment? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 1
fi

echo ""
echo "🚀 Starting deployment process..."
echo ""

# Array of locations and their display names
locations=("lewiston:Lewiston" "brunswick:Brunswick" "gray:Gray-New_Gloucester")
success_count=0
total_count=${#locations[@]}

for location_info in "${locations[@]}"; do
    location="${location_info%%:*}"
    campus="${location_info##*:}"
    
    echo "================================================"
    echo "🎯 Deploying ${campus} Campus (${location})"
    echo "================================================"
    
    # Call the individual deployment script
    if ./scripts/deploy-location.sh "$location"; then
        echo "✅ ${campus} Campus deployed successfully!"
        ((success_count++))
    else
        echo "❌ ${campus} Campus deployment failed!"
        echo "   Check the error messages above."
        echo "   You can retry with: ./scripts/deploy-location.sh ${location}"
    fi
    
    echo ""
    
    # Add delay between deployments to avoid rate limits
    if [ $location != "gray" ]; then
        echo "⏳ Waiting 30 seconds before next deployment..."
        sleep 30
    fi
done

# Summary
echo "============================================================"
echo "🎄 Deployment Summary"
echo "============================================================"

if [ $success_count -eq $total_count ]; then
    echo "🎉 SUCCESS! All $total_count campuses deployed successfully!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. 📧 Set up Amazon SES for noreply@pathwayvineyard.com"
    echo "2. 👥 Create admin users for each campus"
    echo "3. 🧪 Test each campus registration system"
    echo "4. 🎨 Verify campus-specific branding"
    echo ""
    echo "📱 Access your apps:"
    echo "   Check the URLs displayed above for each campus"
    echo ""
else
    echo "⚠️  Partial deployment: $success_count/$total_count campuses deployed"
    echo ""
    echo "🔧 To retry failed deployments:"
    
    for location_info in "${locations[@]}"; do
        location="${location_info%%:*}"
        campus="${location_info##*:}"
        echo "   ./scripts/deploy-location.sh $location  # $campus Campus"
    done
fi

echo ""
echo "📚 For detailed configuration, see:"
echo "   - AMPLIFY-DEPLOYMENT.md"  
echo "   - DEPLOYMENT-GUIDE.md"
echo ""