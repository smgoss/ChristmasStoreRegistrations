#!/bin/bash

# Validate package-lock.json integrity
echo "🔒 Validating package-lock.json integrity..."

# Exit on any error
set -e

# Use npm ci --dry-run to check without actually installing
echo "📦 Running npm ci dry-run to validate lock file..."

if npm ci --dry-run > /dev/null 2>&1; then
    echo "✅ package-lock.json is valid and in sync with package.json"
    exit 0
else
    echo "❌ package-lock.json is out of sync or corrupted!"
    echo "   Run 'npm install' to regenerate it."
    echo ""
    echo "   To see the error details, run:"
    echo "   npm ci --dry-run"
    exit 1
fi