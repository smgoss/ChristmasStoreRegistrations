# GraphQL Lambda Integration Tests

This directory contains integration tests that verify all Lambda functions can successfully access RegistrationConfig via GraphQL without errors.

## Prerequisites

1. **Amplify Sandbox Running**: You must have an active Amplify sandbox running
   ```bash
   npm run sandbox
   ```

2. **amplify_outputs.json**: The tests automatically load configuration from `amplify_outputs.json` in the project root

3. **Test Configuration**: Tests will use the location specified in `NEXT_PUBLIC_LOCATION` env var (defaults to 'gray')

## Running Tests

### Basic Integration Tests
```bash
npm run test:integration
```

### Verbose Mode (see all logs)
```bash
npm run test:integration:verbose
```

### Run specific test file
```bash
npm run test:integration -- graphql-lambdas.integration.test.ts
```

## What the Tests Verify

### 1. **RegistrationConfig GraphQL Access**
   - Verifies config can be fetched via GraphQL `listRegistrationConfigs` query
   - Validates all required fields are present in the config

### 2. **Send Confirmation Email Lambda**
   - Invokes `sendConfirmationEmail` mutation
   - Verifies Lambda doesn't have GraphQL configuration errors
   - Checks that config is successfully retrieved

### 3. **Send Cancellation Email Lambda**
   - Invokes `sendCancellationEmail` mutation
   - Verifies proper GraphQL access to config

### 4. **Send Invite Email Lambda**
   - Invokes `sendInviteEmail` mutation
   - Validates config retrieval works correctly

### 5. **Send SMS Confirmation Lambda**
   - Invokes `sendSmsConfirmation` mutation
   - Tests GraphQL config access for SMS sending

### 6. **Auto Close Registration Lambda**
   - Invokes `autoCloseRegistration` mutation
   - Verifies it can read and update config via GraphQL

### 7. **Error Logging Validation**
   - Ensures no Lambda logs contain GraphQL configuration errors
   - Validates no "No config found" errors occur
   - Checks AMPLIFY_BRANCH environment variable is set correctly

## Test Data Cleanup

Tests automatically clean up any test registrations created during execution. The `afterAll` hook removes test data to keep the database clean.

## Common Issues

### "amplify_outputs.json not found"
**Solution**: Make sure the Amplify sandbox is running. It generates this file automatically.

### "Config not found" errors
**Solution**: Ensure a RegistrationConfig exists for your branch. The tests will create one automatically if missing.

### Timeout errors
**Solution**: Lambda cold starts can be slow. Tests have a 30-second timeout. If needed, increase the timeout in `jest.integration.config.js`.

### GraphQL endpoint errors
**Solution**: This indicates AMPLIFY_BRANCH environment variable isn't set correctly. Check `amplify/backend.ts` to ensure it's configured.

## Expected Output

Successful test run should show:
```
✓ should fetch config via GraphQL listRegistrationConfigs
✓ should have all required fields in RegistrationConfig
✓ should successfully invoke sendConfirmationEmail mutation
✓ should successfully invoke sendCancellationEmail mutation
✓ should successfully invoke sendInviteEmail mutation
✓ should successfully invoke sendSmsConfirmation mutation
✓ should successfully invoke autoCloseRegistration mutation
✓ should not have GraphQL configuration errors in any Lambda logs
```

## Debugging

Enable verbose logging to see full Lambda responses:
```bash
VERBOSE_TESTS=true npm run test:integration
```

This will output:
- Full Lambda invocation results
- GraphQL query/mutation responses
- Any errors or warnings from the Lambdas
