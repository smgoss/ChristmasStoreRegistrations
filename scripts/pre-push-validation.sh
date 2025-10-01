#!/bin/bash

# Pre-push validation script to catch issues before production
echo "🔍 Running pre-push validation..."

# Exit on any error
set -e

# 1. TypeScript type checking
echo "📝 Checking TypeScript types..."
npx tsc --noEmit --skipLibCheck

# 2. ESLint validation 
echo "🔧 Running ESLint..."
npm run lint

# 3. Build validation
echo "🏗️  Testing production build..."
npm run build

echo "✅ All validations passed! Safe to push."
echo ""
echo "📋 What was validated:"
echo "  ✅ TypeScript compilation"
echo "  ✅ ESLint rules"
echo "  ✅ Production build"
echo ""