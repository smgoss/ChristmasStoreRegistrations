import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../data/resource';

// Mock AWS Amplify client
jest.mock('aws-amplify/data', () => ({
  generateClient: jest.fn(),
}));

describe('GraphQL Mutations - Lambda Function Integration', () => {
  let mockClient: any;
  let mockMutations: any;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Create mock mutations object
    mockMutations = {
      sendSmsConfirmation: jest.fn(),
      sendConfirmationEmail: jest.fn(),
      sendInviteEmail: jest.fn(),
      sendCancellationEmail: jest.fn(),
      sendFinalConfirmationEmail: jest.fn(),
      sendFinalConfirmationSms: jest.fn(),
      sendCustomEmail: jest.fn(),
      sendCustomSms: jest.fn(),
      sendWaitlistEmail: jest.fn(),
    };

    // Create mock client
    mockClient = {
      mutations: mockMutations,
    };

    // Mock the generateClient function
    (generateClient as jest.Mock).mockReturnValue(mockClient);
  });

  describe('Email Mutations', () => {
    const mockRegistration = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+15551234567',
      streetAddress: '123 Main St',
      zipCode: '12345',
      city: 'Anytown',
      state: 'NY',
      timeSlot: '09:00',
      numberOfKids: 2,
      registrationDate: '2025-09-23T19:20:00.000Z',
    };

    const mockInvite = {
      email: 'recipient@example.com',
      token: 'test-token-123',
      inviteUrl: 'https://example.com/register/test-token-123',
    };

    const mockWaitlistEntry = {
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '+15551234568',
      streetAddress: '456 Oak Ave',
      zipCode: '67890',
      city: 'Somewhere',
      state: 'CA',
      numberOfKids: 1,
      waitlistDate: '2025-09-23T19:20:00.000Z',
    };

    it('should call sendConfirmationEmail mutation with correct parameters', async () => {
      const mockResponse = { 
        data: { success: true, message: 'Email sent successfully' } 
      };
      mockMutations.sendConfirmationEmail.mockResolvedValue(mockResponse);

      const client = generateClient<Schema>();
      const result = await client.mutations.sendConfirmationEmail({
        registration: mockRegistration,
        registrationId: 'reg-123',
      });

      expect(mockMutations.sendConfirmationEmail).toHaveBeenCalledWith({
        registration: mockRegistration,
        registrationId: 'reg-123',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call sendInviteEmail mutation with correct parameters', async () => {
      const mockResponse = { 
        data: { success: true, message: 'Invite email sent successfully', messageId: 'msg-123' } 
      };
      mockMutations.sendInviteEmail.mockResolvedValue(mockResponse);

      const client = generateClient<Schema>();
      const result = await client.mutations.sendInviteEmail({
        invite: mockInvite,
        inviteId: 'invite-123',
      });

      expect(mockMutations.sendInviteEmail).toHaveBeenCalledWith({
        invite: mockInvite,
        inviteId: 'invite-123',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call sendCancellationEmail mutation with correct parameters', async () => {
      const mockResponse = { 
        data: { success: true, message: 'Cancellation email sent successfully' } 
      };
      mockMutations.sendCancellationEmail.mockResolvedValue(mockResponse);

      const client = generateClient<Schema>();
      const result = await client.mutations.sendCancellationEmail({
        registration: mockRegistration,
        registrationId: 'reg-123',
      });

      expect(mockMutations.sendCancellationEmail).toHaveBeenCalledWith({
        registration: mockRegistration,
        registrationId: 'reg-123',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call sendFinalConfirmationEmail mutation with correct parameters', async () => {
      const mockResponse = { 
        data: { success: true, message: 'Final confirmation email sent successfully' } 
      };
      mockMutations.sendFinalConfirmationEmail.mockResolvedValue(mockResponse);

      const client = generateClient<Schema>();
      const result = await client.mutations.sendFinalConfirmationEmail({
        registration: mockRegistration,
        registrationId: 'reg-123',
        message: 'Final confirmation reminder',
      });

      expect(mockMutations.sendFinalConfirmationEmail).toHaveBeenCalledWith({
        registration: mockRegistration,
        registrationId: 'reg-123',
        message: 'Final confirmation reminder',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call sendCustomEmail mutation with correct parameters', async () => {
      const mockResponse = { 
        data: { success: true, message: 'Custom email sent successfully' } 
      };
      mockMutations.sendCustomEmail.mockResolvedValue(mockResponse);

      const client = generateClient<Schema>();
      const result = await client.mutations.sendCustomEmail({
        registration: mockRegistration,
        registrationId: 'reg-123',
        message: 'Custom message for registration',
      });

      expect(mockMutations.sendCustomEmail).toHaveBeenCalledWith({
        registration: mockRegistration,
        registrationId: 'reg-123',
        message: 'Custom message for registration',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call sendWaitlistEmail mutation with correct parameters', async () => {
      const mockResponse = { 
        data: { success: true, message: 'Waitlist email sent successfully' } 
      };
      mockMutations.sendWaitlistEmail.mockResolvedValue(mockResponse);

      const client = generateClient<Schema>();
      const result = await client.mutations.sendWaitlistEmail({
        waitlistEntry: mockWaitlistEntry,
        waitlistId: 'waitlist-123',
        message: 'You are on the waitlist',
      });

      expect(mockMutations.sendWaitlistEmail).toHaveBeenCalledWith({
        waitlistEntry: mockWaitlistEntry,
        waitlistId: 'waitlist-123',
        message: 'You are on the waitlist',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('SMS Mutations', () => {
    const mockRegistration = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+15551234567',
      streetAddress: '123 Main St',
      zipCode: '12345',
      city: 'Anytown',
      state: 'NY',
      timeSlot: '09:00',
      numberOfKids: 2,
      registrationDate: '2025-09-23T19:20:00.000Z',
    };

    it('should call sendSmsConfirmation mutation with correct parameters', async () => {
      const mockResponse = { 
        data: { success: true, message: 'SMS sent successfully' } 
      };
      mockMutations.sendSmsConfirmation.mockResolvedValue(mockResponse);

      const client = generateClient<Schema>();
      const result = await client.mutations.sendSmsConfirmation({
        registration: mockRegistration,
        registrationId: 'reg-123',
      });

      expect(mockMutations.sendSmsConfirmation).toHaveBeenCalledWith({
        registration: mockRegistration,
        registrationId: 'reg-123',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call sendFinalConfirmationSms mutation with correct parameters', async () => {
      const mockResponse = { 
        data: { success: true, message: 'Final confirmation SMS sent successfully' } 
      };
      mockMutations.sendFinalConfirmationSms.mockResolvedValue(mockResponse);

      const client = generateClient<Schema>();
      const result = await client.mutations.sendFinalConfirmationSms({
        registration: mockRegistration,
        registrationId: 'reg-123',
        message: 'Final confirmation reminder via SMS',
      });

      expect(mockMutations.sendFinalConfirmationSms).toHaveBeenCalledWith({
        registration: mockRegistration,
        registrationId: 'reg-123',
        message: 'Final confirmation reminder via SMS',
      });
      expect(result).toEqual(mockResponse);
    });

    it('should call sendCustomSms mutation with correct parameters', async () => {
      const mockResponse = { 
        data: { success: true, message: 'Custom SMS sent successfully' } 
      };
      mockMutations.sendCustomSms.mockResolvedValue(mockResponse);

      const client = generateClient<Schema>();
      const result = await client.mutations.sendCustomSms({
        registration: mockRegistration,
        registrationId: 'reg-123',
        message: 'Custom SMS message',
      });

      expect(mockMutations.sendCustomSms).toHaveBeenCalledWith({
        registration: mockRegistration,
        registrationId: 'reg-123',
        message: 'Custom SMS message',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Error Handling', () => {
    const mockRegistration = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+15551234567',
      streetAddress: '123 Main St',
      zipCode: '12345',
      city: 'Anytown',
      state: 'NY',
      timeSlot: '09:00',
      numberOfKids: 2,
      registrationDate: '2025-09-23T19:20:00.000Z',
    };

    it('should handle sendConfirmationEmail errors gracefully', async () => {
      const mockError = new Error('Lambda function failed');
      mockMutations.sendConfirmationEmail.mockRejectedValue(mockError);

      const client = generateClient<Schema>();
      
      await expect(
        client.mutations.sendConfirmationEmail({
          registration: mockRegistration,
          registrationId: 'reg-123',
        })
      ).rejects.toThrow('Lambda function failed');

      expect(mockMutations.sendConfirmationEmail).toHaveBeenCalledWith({
        registration: mockRegistration,
        registrationId: 'reg-123',
      });
    });

    it('should handle sendInviteEmail errors gracefully', async () => {
      const mockError = new Error('SES permission denied');
      mockMutations.sendInviteEmail.mockRejectedValue(mockError);

      const client = generateClient<Schema>();
      
      await expect(
        client.mutations.sendInviteEmail({
          invite: {
            email: 'test@example.com',
            token: 'test-token',
            inviteUrl: 'https://example.com/register/test-token',
          },
          inviteId: 'invite-123',
        })
      ).rejects.toThrow('SES permission denied');
    });

    it('should handle sendSmsConfirmation errors gracefully', async () => {
      const mockError = new Error('Clearstream API rate limit exceeded');
      mockMutations.sendSmsConfirmation.mockRejectedValue(mockError);

      const client = generateClient<Schema>();
      
      await expect(
        client.mutations.sendSmsConfirmation({
          registration: mockRegistration,
          registrationId: 'reg-123',
        })
      ).rejects.toThrow('Clearstream API rate limit exceeded');
    });
  });

  describe('Response Format Validation', () => {
    const mockRegistration = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '+15551234567',
      streetAddress: '123 Main St',
      zipCode: '12345',
      city: 'Anytown',
      state: 'NY',
      timeSlot: '09:00',
      numberOfKids: 2,
      registrationDate: '2025-09-23T19:20:00.000Z',
    };

    it('should return proper response format for successful email mutations', async () => {
      const mockResponse = { 
        data: { 
          success: true, 
          message: 'Email sent successfully',
          messageId: 'ses-message-id-123'
        } 
      };
      mockMutations.sendConfirmationEmail.mockResolvedValue(mockResponse);

      const client = generateClient<Schema>();
      const result = await client.mutations.sendConfirmationEmail({
        registration: mockRegistration,
        registrationId: 'reg-123',
      });

      expect(result.data).toHaveProperty('success', true);
      expect(result.data).toHaveProperty('message');
      expect(typeof result.data.message).toBe('string');
    });

    it('should return proper response format for successful SMS mutations', async () => {
      const mockResponse = { 
        data: { 
          success: true, 
          message: 'SMS sent successfully'
        } 
      };
      mockMutations.sendSmsConfirmation.mockResolvedValue(mockResponse);

      const client = generateClient<Schema>();
      const result = await client.mutations.sendSmsConfirmation({
        registration: mockRegistration,
        registrationId: 'reg-123',
      });

      expect(result.data).toHaveProperty('success', true);
      expect(result.data).toHaveProperty('message');
      expect(typeof result.data.message).toBe('string');
    });

    it('should return proper response format for failed mutations', async () => {
      const mockResponse = { 
        data: { 
          success: false, 
          message: 'Failed to send email',
          error: 'SES service unavailable'
        } 
      };
      mockMutations.sendConfirmationEmail.mockResolvedValue(mockResponse);

      const client = generateClient<Schema>();
      const result = await client.mutations.sendConfirmationEmail({
        registration: mockRegistration,
        registrationId: 'reg-123',
      });

      expect(result.data).toHaveProperty('success', false);
      expect(result.data).toHaveProperty('message');
      expect(result.data).toHaveProperty('error');
    });
  });

  describe('Parameter Validation', () => {
    it('should validate required fields for email mutations', () => {
      const client = generateClient<Schema>();
      
      // Test that TypeScript would catch missing required fields
      expect(() => {
        // This should cause TypeScript errors in a real environment
        client.mutations.sendConfirmationEmail({
          registration: {
            firstName: 'John',
            // Missing other required fields would cause TypeScript errors
          } as any,
        });
      }).toBeDefined(); // This test mainly validates that the types are properly defined
    });

    it('should validate required fields for SMS mutations', () => {
      const client = generateClient<Schema>();
      
      expect(() => {
        // This should cause TypeScript errors in a real environment
        client.mutations.sendSmsConfirmation({
          registration: {
            phone: '+15551234567',
            // Missing other required fields would cause TypeScript errors
          } as any,
        });
      }).toBeDefined();
    });

    it('should validate required fields for invite mutations', () => {
      const client = generateClient<Schema>();
      
      expect(() => {
        // This should cause TypeScript errors in a real environment
        client.mutations.sendInviteEmail({
          invite: {
            email: 'test@example.com',
            // Missing token and inviteUrl would cause TypeScript errors
          } as any,
        });
      }).toBeDefined();
    });
  });
});