#!/bin/bash

# Quick validation script - TypeScript only (fastest feedback)
echo "🔍 Quick validation (TypeScript only)..."

# Exit on any error
set -e

# TypeScript type checking (fastest)
echo "📝 Checking TypeScript types..."
npx tsc --noEmit --skipLibCheck

echo "✅ TypeScript validation passed!"
echo ""
echo "💡 For full validation (ESLint + Build), run: npm run validate"
echo ""