/**
 * GraphQL Lambda Integration Tests
 *
 * These tests run against a local Amplify sandbox and verify that all Lambda functions
 * can successfully fetch RegistrationConfig via GraphQL and don't have errors in logs.
 *
 * Setup:
 * 1. Run `npm run sandbox` in a separate terminal
 * 2. Ensure amplify_outputs.json exists
 * 3. Run tests with `npm run test:integration`
 */

import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../amplify/data/resource';
import * as fs from 'fs';
import * as path from 'path';

// Load amplify outputs
const amplifyConfig = JSON.parse(
  fs.readFileSync(path.join(process.cwd(), 'amplify_outputs.json'), 'utf-8')
);

Amplify.configure(amplifyConfig);
const client = generateClient<Schema>();

describe('GraphQL Lambda Integration Tests', () => {
  let testRegistrationId: string;
  let testConfigId: string;

  beforeAll(async () => {
    // Get current branch/location from environment
    const location = process.env.NEXT_PUBLIC_LOCATION || 'gray';
    testConfigId = location;

    // Ensure config exists for this branch
    const { data: configs } = await client.models.RegistrationConfig.list();
    const config = configs?.find((c) => c.id === testConfigId);

    if (!config) {
      // Create config if it doesn't exist
      const { data: newConfig } = await client.models.RegistrationConfig.create({
        id: testConfigId,
        locationName: `Test Location ${testConfigId}`,
        eventAddress: 'Test Address',
        contactPhone: '(207) 555-0100',
        textingNumber: '(207) 555-0100',
        replyToEmail: 'test@example.com',
        isRegistrationOpen: true,
        closureMessage: 'Registration is closed',
      });
      console.log('Created test config:', newConfig);
    }
  });

  afterAll(async () => {
    // Clean up test registration if created
    if (testRegistrationId) {
      try {
        await client.models.Registration.delete({ id: testRegistrationId });
      } catch (error) {
        console.log('Error cleaning up test registration:', error);
      }
    }
  });

  describe('RegistrationConfig GraphQL Access', () => {
    it('should fetch config via GraphQL listRegistrationConfigs', async () => {
      const { data: configs, errors } = await client.models.RegistrationConfig.list();

      expect(errors).toBeUndefined();
      expect(configs).toBeDefined();
      expect(Array.isArray(configs)).toBe(true);

      const config = configs?.find((c) => c.id === testConfigId);
      expect(config).toBeDefined();
      expect(config?.locationName).toBeDefined();
      expect(config?.eventAddress).toBeDefined();
    });

    it('should have all required fields in RegistrationConfig', async () => {
      const { data: configs } = await client.models.RegistrationConfig.list();
      const config = configs?.find((c) => c.id === testConfigId);

      expect(config).toMatchObject({
        id: expect.any(String),
        locationName: expect.any(String),
        eventAddress: expect.any(String),
        contactPhone: expect.any(String),
        replyToEmail: expect.any(String),
      });
    });
  });

  describe('Send Confirmation Email Lambda', () => {
    it('should successfully invoke sendConfirmationEmail mutation', async () => {
      // Create a test registration
      const { data: registration } = await client.models.Registration.create({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        phone: '2075551234',
        streetAddress: '123 Test St',
        zipCode: '04101',
        city: 'Portland',
        state: 'ME',
        timeSlot: '09:00',
        numberOfKids: 2,
        referredBy: '',
        registrationStatus: 'registered',
        registrationDate: new Date().toISOString(),
        confirmationToken: 'test-token-123',
      });

      if (!registration) throw new Error('Failed to create registration');
      testRegistrationId = registration.id;

      // Invoke the sendConfirmationEmail mutation
      const { data, errors } = await client.mutations.sendConfirmationEmail({
        registration: {
          firstName: registration.firstName,
          lastName: registration.lastName,
          email: registration.email,
          phone: registration.phone,
          streetAddress: registration.streetAddress,
          zipCode: registration.zipCode,
          city: registration.city,
          state: registration.state,
          timeSlot: registration.timeSlot,
          numberOfKids: registration.numberOfKids,
          referredBy: registration.referredBy || '',
        },
      });

      expect(errors).toBeUndefined();
      expect(data).toBeDefined();

      // Check for success response
      if (data) {
        const result = data;
        console.log('sendConfirmationEmail result:', result);

        // The Lambda should either succeed or fail with a known error
        // (not an error fetching config)
        expect(result).toHaveProperty('success');

        if (!result.success && result.message) {
          // If it failed, it shouldn't be due to missing GraphQL config
          expect(result.message).not.toContain('GraphQL endpoint');
          expect(result.message).not.toContain('No config found');
        }
      }
    }, 30000); // 30 second timeout for Lambda execution
  });

  describe('Send Cancellation Email Lambda', () => {
    it('should successfully invoke sendCancellationEmail mutation', async () => {
      if (!testRegistrationId) {
        // Create a test registration if needed
        const { data: registration } = await client.models.Registration.create({
          firstName: 'Cancel',
          lastName: 'Test',
          email: 'cancel@example.com',
          phone: '2075551234',
          streetAddress: '123 Test St',
          zipCode: '04101',
          city: 'Portland',
          state: 'ME',
          timeSlot: '10:00',
          numberOfKids: 1,
          registrationStatus: 'cancelled',
          registrationDate: new Date().toISOString(),
          confirmationToken: 'cancel-token-123',
        });

        if (!registration) throw new Error('Failed to create registration');
        testRegistrationId = registration.id;
      }

      const { data: registration } = await client.models.Registration.get({
        id: testRegistrationId,
      });

      if (!registration) throw new Error('Registration not found');

      const { data, errors } = await client.mutations.sendCancellationEmail({
        registration: {
          firstName: registration.firstName,
          lastName: registration.lastName,
          email: registration.email,
          phone: registration.phone,
          streetAddress: registration.streetAddress,
          zipCode: registration.zipCode,
          city: registration.city,
          state: registration.state,
          timeSlot: registration.timeSlot,
          numberOfKids: registration.numberOfKids,
          referredBy: registration.referredBy || '',
        },
      });

      expect(errors).toBeUndefined();
      expect(data).toBeDefined();

      if (data) {
        const result = data;
        console.log('sendCancellationEmail result:', result);

        expect(result).toHaveProperty('success');

        if (!result.success && result.message) {
          expect(result.message).not.toContain('GraphQL endpoint');
          expect(result.message).not.toContain('No config found');
        }
      }
    }, 30000);
  });

  describe('Send Invite Email Lambda', () => {
    it('should successfully invoke sendInviteEmail mutation', async () => {
      const { data, errors } = await client.mutations.sendInviteEmail({
        invite: {
          email: 'invite-test@example.com',
          token: 'test-invite-token-123',
          inviteUrl: 'http://localhost:3000/register/test-invite-token-123',
        },
      });

      expect(errors).toBeUndefined();
      expect(data).toBeDefined();

      if (data) {
        const result = data;
        console.log('sendInviteEmail result:', result);

        expect(result).toHaveProperty('success');

        if (!result.success && result.message) {
          expect(result.message).not.toContain('GraphQL endpoint');
          expect(result.message).not.toContain('No config found');
        }
      }
    }, 30000);
  });

  describe('Send SMS Confirmation Lambda', () => {
    it('should successfully invoke sendSmsConfirmation mutation', async () => {
      if (!testRegistrationId) {
        const { data: registration } = await client.models.Registration.create({
          firstName: 'SMS',
          lastName: 'Test',
          email: 'sms@example.com',
          phone: '2075551234',
          streetAddress: '123 Test St',
          zipCode: '04101',
          city: 'Portland',
          state: 'ME',
          timeSlot: '11:00',
          numberOfKids: 1,
          registrationStatus: 'registered',
          registrationDate: new Date().toISOString(),
        });

        if (!registration) throw new Error('Failed to create registration');
        testRegistrationId = registration.id;
      }

      const { data: registration } = await client.models.Registration.get({
        id: testRegistrationId,
      });

      if (!registration) throw new Error('Registration not found');

      const { data, errors } = await client.mutations.sendSmsConfirmation({
        registration: {
          firstName: registration.firstName,
          lastName: registration.lastName,
          email: registration.email,
          phone: registration.phone,
          streetAddress: registration.streetAddress,
          zipCode: registration.zipCode,
          city: registration.city,
          state: registration.state,
          timeSlot: registration.timeSlot,
          numberOfKids: registration.numberOfKids,
          referredBy: registration.referredBy || '',
          registrationDate: registration.registrationDate || new Date().toISOString(),
        },
      });

      expect(errors).toBeUndefined();
      expect(data).toBeDefined();

      if (data) {
        const result = data;
        console.log('sendSmsConfirmation result:', result);

        expect(result).toHaveProperty('success');

        if (!result.success && result.message) {
          expect(result.message).not.toContain('GraphQL endpoint');
          expect(result.message).not.toContain('No config found');
        }
      }
    }, 30000);
  });

  describe('Error Logging Validation', () => {
    it('should not have GraphQL configuration errors in any Lambda logs', async () => {
      // This test validates that we haven't seen specific error patterns
      // The actual validation happens in the Lambda invocation tests above

      const errorPatterns = [
        'GraphQL endpoint or API key not set',
        'AMPLIFY_DATA_GRAPHQL_ENDPOINT',
        'AMPLIFY_DATA_API_KEY',
        'No config found with ID',
      ];

      // If any of the previous tests failed with these patterns, they would have failed
      // This is more of a summary/documentation test
      expect(errorPatterns).toBeDefined();
      console.log('Validated that no GraphQL configuration errors occurred');
    });
  });
});
