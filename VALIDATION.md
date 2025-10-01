# 🔍 Local Build Validation

This document explains how to catch build issues locally before they hit production.

## Quick Commands

```bash
# Fast TypeScript-only validation (recommended during development)
npm run validate:quick

# Full validation (TypeScript + ESLint + Build)
npm run validate

# Individual checks
npm run typecheck    # TypeScript only
npm run lint         # ESLint only  
npm run build        # Build only
```

## Automatic Pre-Push Validation

A git pre-push hook is configured to automatically run full validation before pushing to prevent production failures.

To bypass in emergencies (not recommended):
```bash
git push --no-verify
```

## What Gets Validated

### Quick Validation (`npm run validate:quick`)
- ✅ TypeScript compilation errors
- ✅ Type safety issues
- ⏱️ ~5-10 seconds

### Full Validation (`npm run validate`)  
- ✅ TypeScript compilation errors
- ✅ ESLint rule violations
- ✅ Production build success
- ⏱️ ~30-60 seconds

## Common Issues Caught

1. **Import errors** - Missing exports, wrong paths
2. **Type mismatches** - Using wrong field names in models
3. **Syntax errors** - Missing braces, semicolons
4. **Lint violations** - Code style issues
5. **Build failures** - Runtime compilation errors

## Best Practices

1. **During development**: Run `npm run validate:quick` before committing
2. **Before pushing**: Full validation runs automatically via git hook
3. **Fix issues immediately**: Don't accumulate validation errors
4. **Update types**: When changing data models, update TypeScript interfaces

## Files

- `scripts/quick-validate.sh` - Fast TypeScript validation
- `scripts/pre-push-validation.sh` - Complete validation suite
- `.husky/pre-push` - Git pre-push hook configuration

This setup prevents the type errors and build failures that were reaching production.