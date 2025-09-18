/**
 * API Route Validation Tests
 * 
 * Tests the validation logic and error handling of our API routes
 * without external dependencies like AWS Lambda or external APIs
 */

import { z } from 'zod';

// Test schemas from our API routes
const RegistrationSchema = z.object({
  firstName: z.string().trim().min(1),
  lastName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(7),
  streetAddress: z.string().trim().min(1),
  zipCode: z.string().trim().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code format'),
  city: z.string().trim().min(1),
  state: z.string().trim().min(1),
  numberOfKids: z.number().int().min(0),
  timeSlot: z.string().trim().min(1),
  referredBy: z.string().optional(),
  inviteToken: z.string().optional(),
  children: z.array(z.object({
    age: z.union([z.string(), z.number()]),
    gender: z.enum(['boy', 'girl']),
  })).optional(),
});

const ZipCodeSchema = z.object({
  zip: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid zip code format')
});

const InviteEmailSchema = z.object({
  email: z.string().email('Invalid email format'),
  inviteLink: z.string().url('Invalid invite link URL'),
  token: z.string().min(1, 'Token is required')
});

const RegistrationDataSchema = z.object({
  registration: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().min(7),
    streetAddress: z.string().min(1),
    zipCode: z.string().regex(/^\d{5}(-\d{4})?$/),
    city: z.string().min(1),
    state: z.string().min(1),
    timeSlot: z.string().min(1),
    numberOfKids: z.number().int().min(0),
    referredBy: z.string().optional(),
    registrationDate: z.string()
  })
});

describe('API Route Validation Schemas', () => {
  describe('RegistrationSchema', () => {
    it('should validate a complete registration', () => {
      const validRegistration = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        streetAddress: '123 Main St',
        zipCode: '12345',
        city: 'Anytown',
        state: 'CA',
        numberOfKids: 2,
        timeSlot: '09:00-10:00',
        referredBy: 'Friend',
        children: [
          { age: 8, gender: 'boy' },
          { age: 10, gender: 'girl' }
        ]
      };

      const result = RegistrationSchema.safeParse(validRegistration);
      expect(result.success).toBe(true);
    });

    it('should reject registration with invalid email', () => {
      const invalidRegistration = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'invalid-email',
        phone: '555-123-4567',
        streetAddress: '123 Main St',
        zipCode: '12345',
        city: 'Anytown',
        state: 'CA',
        numberOfKids: 1,
        timeSlot: '09:00-10:00'
      };

      const result = RegistrationSchema.safeParse(invalidRegistration);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors).toContainEqual(
          expect.objectContaining({
            path: ['email'],
            message: 'Invalid email'
          })
        );
      }
    });

    it('should reject registration with invalid zip code', () => {
      const invalidRegistration = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        streetAddress: '123 Main St',
        zipCode: 'INVALID',
        city: 'Anytown',
        state: 'CA',
        numberOfKids: 1,
        timeSlot: '09:00-10:00'
      };

      const result = RegistrationSchema.safeParse(invalidRegistration);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors).toContainEqual(
          expect.objectContaining({
            path: ['zipCode'],
            message: 'Invalid zip code format'
          })
        );
      }
    });

    it('should reject registration with negative numberOfKids', () => {
      const invalidRegistration = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        streetAddress: '123 Main St',
        zipCode: '12345',
        city: 'Anytown',
        state: 'CA',
        numberOfKids: -1,
        timeSlot: '09:00-10:00'
      };

      const result = RegistrationSchema.safeParse(invalidRegistration);
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.errors).toContainEqual(
          expect.objectContaining({
            path: ['numberOfKids'],
            message: 'Number must be greater than or equal to 0'
          })
        );
      }
    });

    it('should validate children array with proper structure', () => {
      const validRegistration = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        streetAddress: '123 Main St',
        zipCode: '12345',
        city: 'Anytown',
        state: 'CA',
        numberOfKids: 1,
        timeSlot: '09:00-10:00',
        children: [
          { age: '8', gender: 'boy' }
        ]
      };

      const result = RegistrationSchema.safeParse(validRegistration);
      expect(result.success).toBe(true);
    });

    it('should reject children with invalid gender', () => {
      const invalidRegistration = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        streetAddress: '123 Main St',
        zipCode: '12345',
        city: 'Anytown',
        state: 'CA',
        numberOfKids: 1,
        timeSlot: '09:00-10:00',
        children: [
          { age: 8, gender: 'invalid' as any }
        ]
      };

      const result = RegistrationSchema.safeParse(invalidRegistration);
      expect(result.success).toBe(false);
    });
  });

  describe('ZipCodeSchema', () => {
    it('should validate 5-digit zip codes', () => {
      const result = ZipCodeSchema.safeParse({ zip: '12345' });
      expect(result.success).toBe(true);
    });

    it('should validate ZIP+4 format', () => {
      const result = ZipCodeSchema.safeParse({ zip: '12345-6789' });
      expect(result.success).toBe(true);
    });

    it('should reject invalid zip code formats', () => {
      const invalidZips = ['1234', '123456', 'ABCDE', '12345-678', '12345-67890'];
      
      invalidZips.forEach(zip => {
        const result = ZipCodeSchema.safeParse({ zip });
        expect(result.success).toBe(false);
      });
    });
  });

  describe('InviteEmailSchema', () => {
    it('should validate proper invite email data', () => {
      const validData = {
        email: 'test@example.com',
        inviteLink: 'https://example.com/register/token123',
        token: 'abc123'
      };

      const result = InviteEmailSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      const invalidData = {
        email: 'invalid-email',
        inviteLink: 'https://example.com/register/token123',
        token: 'abc123'
      };

      const result = InviteEmailSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject invalid URLs', () => {
      const invalidData = {
        email: 'test@example.com',
        inviteLink: 'not-a-url',
        token: 'abc123'
      };

      const result = InviteEmailSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });

    it('should reject empty tokens', () => {
      const invalidData = {
        email: 'test@example.com',
        inviteLink: 'https://example.com/register/token123',
        token: ''
      };

      const result = InviteEmailSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('RegistrationDataSchema (SMS)', () => {
    it('should validate SMS registration data', () => {
      const validData = {
        registration: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone: '555-123-4567',
          streetAddress: '123 Main St',
          zipCode: '12345',
          city: 'Anytown',
          state: 'CA',
          timeSlot: '09:00-10:00',
          numberOfKids: 1,
          registrationDate: '2023-12-01T00:00:00.000Z'
        }
      };

      const result = RegistrationDataSchema.safeParse(validData);
      expect(result.success).toBe(true);
    });

    it('should reject missing required fields', () => {
      const invalidData = {
        registration: {
          firstName: 'John',
          // lastName missing
          email: 'john@example.com',
          phone: '555-123-4567',
          streetAddress: '123 Main St',
          zipCode: '12345',
          city: 'Anytown',
          state: 'CA',
          timeSlot: '09:00-10:00',
          numberOfKids: 1,
          registrationDate: '2023-12-01T00:00:00.000Z'
        }
      };

      const result = RegistrationDataSchema.safeParse(invalidData);
      expect(result.success).toBe(false);
    });
  });

  describe('Phone Number Format Edge Cases', () => {
    it('should accept various phone number formats in registration', () => {
      const phoneFormats = [
        '5551234567',
        '555-123-4567',
        '(555) 123-4567',
        '+1-555-123-4567',
        '555.123.4567'
      ];

      phoneFormats.forEach(phone => {
        const data = {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phone,
          streetAddress: '123 Main St',
          zipCode: '12345',
          city: 'Anytown',
          state: 'CA',
          numberOfKids: 1,
          timeSlot: '09:00-10:00'
        };

        const result = RegistrationSchema.safeParse(data);
        expect(result.success).toBe(true);
      });
    });

    it('should reject phone numbers that are too short', () => {
      const data = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '123',
        streetAddress: '123 Main St',
        zipCode: '12345',
        city: 'Anytown',
        state: 'CA',
        numberOfKids: 1,
        timeSlot: '09:00-10:00'
      };

      const result = RegistrationSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });

  describe('String Trimming and Edge Cases', () => {
    it('should trim whitespace from string fields', () => {
      const data = {
        firstName: '  John  ',
        lastName: '  Doe  ',
        email: '  john@example.com  ',
        phone: '555-123-4567',
        streetAddress: '  123 Main St  ',
        zipCode: '  12345  ',
        city: '  Anytown  ',
        state: '  CA  ',
        numberOfKids: 1,
        timeSlot: '  09:00-10:00  '
      };

      const result = RegistrationSchema.safeParse(data);
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.firstName).toBe('John');
        expect(result.data.lastName).toBe('Doe');
        expect(result.data.email).toBe('john@example.com');
      }
    });

    it('should reject empty strings after trimming', () => {
      const data = {
        firstName: '   ',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '555-123-4567',
        streetAddress: '123 Main St',
        zipCode: '12345',
        city: 'Anytown',
        state: 'CA',
        numberOfKids: 1,
        timeSlot: '09:00-10:00'
      };

      const result = RegistrationSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});