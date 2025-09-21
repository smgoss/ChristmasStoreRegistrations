import { NextRequest } from 'next/server';

// Mock the API utilities
jest.mock('@/lib/api-utils', () => ({
  createErrorResponse: jest.fn((error, code, status, details) => 
    new Response(JSON.stringify({ success: false, error, code, details, timestamp: '2023-01-01T00:00:00.000Z' }), { status })
  ),
  createSuccessResponse: jest.fn((data, status = 200) => 
    new Response(JSON.stringify({ success: true, ...data, timestamp: '2023-01-01T00:00:00.000Z' }), { status })
  ),
  validateRequestBody: jest.fn().mockResolvedValue({
    success: true,
    data: {
      subject: 'Test Subject',
      emailMessage: 'Test email message',
      sendSmsNotification: true,
      targetStatus: 'all'
    }
  }),
  applyRateLimit: jest.fn(() => null)
}));

describe('/api/send-email-to-all', () => {
  let mockClient: any;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    
    mockClient = {
      models: {
        Registration: {
          list: jest.fn()
        }
      },
      mutations: {
        sendCustomEmail: jest.fn(),
        sendCustomSms: jest.fn()
      }
    };

    jest.doMock('aws-amplify/data', () => ({
      generateClient: jest.fn(() => mockClient)
    }));

    jest.doMock('@/lib/amplify', () => ({
      ensureAmplifyConfigured: jest.fn()
    }));
  });

  it('should successfully send emails to all registered users', async () => {
    const { POST } = await import('../send-email-to-all/route');

    const mockRegistrations = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '5551234567',
        timeSlot: '09:00',
        numberOfKids: 2,
        isCancelled: false
      },
      {
        id: '2', 
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '5559876543',
        timeSlot: '10:00',
        numberOfKids: 1,
        isCancelled: false
      }
    ];

    mockClient.models.Registration.list.mockResolvedValueOnce({
      data: mockRegistrations
    });

    mockClient.mutations.sendCustomEmail.mockResolvedValue({ success: true });
    mockClient.mutations.sendCustomSms.mockResolvedValue({ success: true });

    const validPayload = {
      subject: 'Test Subject',
      emailMessage: 'Test email message',
      sendSmsNotification: true,
      targetStatus: 'all'
    };

    const request = new NextRequest('http://localhost:3000/api/send-email-to-all', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.emailsSent).toBe(2);
    expect(data.smsNotificationsSent).toBe(2);
    expect(data.totalRecipients).toBe(2);
    expect(mockClient.mutations.sendCustomEmail).toHaveBeenCalledTimes(2);
    expect(mockClient.mutations.sendCustomSms).toHaveBeenCalledTimes(2);
  });

  it('should filter registrations by status correctly', async () => {
    const { POST } = await import('../send-email-to-all/route');
    const { validateRequestBody } = require('@/lib/api-utils');
    
    validateRequestBody.mockImplementationOnce(async () => ({
      success: true,
      data: {
        subject: 'Test Subject',
        emailMessage: 'Test email message',
        sendSmsNotification: false,
        targetStatus: 'confirmed'
      }
    }));

    const mockRegistrations = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        registrationStatus: 'confirmed',
        isCancelled: false
      },
      {
        id: '2',
        firstName: 'Jane', 
        lastName: 'Smith',
        email: 'jane@example.com',
        registrationStatus: 'unconfirmed',
        isCancelled: false
      }
    ];

    mockClient.models.Registration.list.mockResolvedValueOnce({
      data: mockRegistrations
    });

    mockClient.mutations.sendCustomEmail.mockResolvedValue({ success: true });

    const validPayload = {
      subject: 'Test Subject',
      emailMessage: 'Test email message',
      sendSmsNotification: false,
      targetStatus: 'confirmed'
    };

    const request = new NextRequest('http://localhost:3000/api/send-email-to-all', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.emailsSent).toBe(1);
    expect(data.totalRecipients).toBe(1);
    expect(mockClient.mutations.sendCustomEmail).toHaveBeenCalledTimes(1);
  });

  it('should handle email failures gracefully', async () => {
    const { POST } = await import('../send-email-to-all/route');
    const { validateRequestBody } = require('@/lib/api-utils');
    
    validateRequestBody.mockImplementationOnce(async () => ({
      success: true,
      data: {
        subject: 'Test Subject',
        emailMessage: 'Test email message',
        sendSmsNotification: false,
        targetStatus: 'all'
      }
    }));

    const mockRegistrations = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        isCancelled: false
      }
    ];

    mockClient.models.Registration.list.mockResolvedValueOnce({
      data: mockRegistrations
    });

    mockClient.mutations.sendCustomEmail.mockRejectedValue(new Error('Email failed'));

    const validPayload = {
      subject: 'Test Subject',
      emailMessage: 'Test email message',
      sendSmsNotification: false,
      targetStatus: 'all'
    };

    const request = new NextRequest('http://localhost:3000/api/send-email-to-all', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.emailsSent).toBe(0);
    expect(data.emailsFailed).toBe(1);
    expect(data.results.emailResults).toHaveLength(1);
    expect(data.results.emailResults[0].success).toBe(false);
  });

  it('should skip SMS for users without phone numbers', async () => {
    const { POST } = await import('../send-email-to-all/route');
    const { validateRequestBody } = require('@/lib/api-utils');
    
    validateRequestBody.mockImplementationOnce(async () => ({
      success: true,
      data: {
        subject: 'Test Subject',
        emailMessage: 'Test email message',
        sendSmsNotification: true,
        targetStatus: 'all'
      }
    }));

    const mockRegistrations = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: null, // No phone number
        isCancelled: false
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith', 
        email: 'jane@example.com',
        phone: '5551234567',
        isCancelled: false
      }
    ];

    mockClient.models.Registration.list.mockResolvedValueOnce({
      data: mockRegistrations
    });

    mockClient.mutations.sendCustomEmail.mockResolvedValue({ success: true });
    mockClient.mutations.sendCustomSms.mockResolvedValue({ success: true });

    const validPayload = {
      subject: 'Test Subject', 
      emailMessage: 'Test email message',
      sendSmsNotification: true,
      targetStatus: 'all'
    };

    const request = new NextRequest('http://localhost:3000/api/send-email-to-all', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.emailsSent).toBe(2);
    expect(data.smsNotificationsSent).toBe(1); // Only Jane has phone
    expect(mockClient.mutations.sendCustomSms).toHaveBeenCalledTimes(1);
  });

  it('should handle rate limiting', async () => {
    const { POST } = await import('../send-email-to-all/route');
    const { applyRateLimit } = require('@/lib/api-utils');
    applyRateLimit.mockImplementationOnce(() => 
      new Response(JSON.stringify({ success: false, error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' }), { status: 429 })
    );

    const validPayload = {
      subject: 'Test Subject',
      emailMessage: 'Test email message',
      sendSmsNotification: true,
      targetStatus: 'all'
    };

    const request = new NextRequest('http://localhost:3000/api/send-email-to-all', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(429);
    expect(data.code).toBe('RATE_LIMIT_EXCEEDED');
  });

  it('should handle validation errors', async () => {
    const { POST } = await import('../send-email-to-all/route');
    const { validateRequestBody } = require('@/lib/api-utils');
    
    validateRequestBody.mockImplementationOnce(async () => ({
      success: false,
      response: new Response(JSON.stringify({ success: false, error: 'Subject is required', code: 'VALIDATION_ERROR' }), { status: 400 })
    }));

    const invalidPayload = {
      subject: '', // Empty subject
      emailMessage: 'Test email message',
      sendSmsNotification: true,
      targetStatus: 'all'
    };

    const request = new NextRequest('http://localhost:3000/api/send-email-to-all', {
      method: 'POST',
      body: JSON.stringify(invalidPayload)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.code).toBe('VALIDATION_ERROR');
  });

  it('should handle empty registration list', async () => {
    const { POST } = await import('../send-email-to-all/route');
    const { validateRequestBody } = require('@/lib/api-utils');
    
    validateRequestBody.mockImplementationOnce(async () => ({
      success: true,
      data: {
        subject: 'Test Subject',
        emailMessage: 'Test email message',
        sendSmsNotification: true,
        targetStatus: 'all'
      }
    }));

    mockClient.models.Registration.list.mockResolvedValueOnce({
      data: []
    });

    const validPayload = {
      subject: 'Test Subject',
      emailMessage: 'Test email message',
      sendSmsNotification: true,
      targetStatus: 'all'
    };

    const request = new NextRequest('http://localhost:3000/api/send-email-to-all', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.emailsSent).toBe(0);
    expect(data.message).toBe('No registrations found to send emails to');
  });

  it('should handle database errors', async () => {
    const { POST } = await import('../send-email-to-all/route');
    const { validateRequestBody } = require('@/lib/api-utils');
    
    validateRequestBody.mockImplementationOnce(async () => ({
      success: true,
      data: {
        subject: 'Test Subject',
        emailMessage: 'Test email message',
        sendSmsNotification: true,
        targetStatus: 'all'
      }
    }));

    mockClient.models.Registration.list.mockRejectedValue(new Error('Database connection failed'));

    const validPayload = {
      subject: 'Test Subject',
      emailMessage: 'Test email message',
      sendSmsNotification: true,
      targetStatus: 'all'
    };

    const request = new NextRequest('http://localhost:3000/api/send-email-to-all', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.success).toBe(false);
    expect(data.code).toBe('INTERNAL_ERROR');
  });

  it('should only send SMS to users who received emails successfully', async () => {
    const { POST } = await import('../send-email-to-all/route');
    const { validateRequestBody } = require('@/lib/api-utils');
    
    validateRequestBody.mockImplementationOnce(async () => ({
      success: true,
      data: {
        subject: 'Test Subject',
        emailMessage: 'Test email message',
        sendSmsNotification: true,
        targetStatus: 'all'
      }
    }));

    const mockRegistrations = [
      {
        id: '1',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '5551234567',
        isCancelled: false
      },
      {
        id: '2',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '5559876543',
        isCancelled: false
      }
    ];

    mockClient.models.Registration.list.mockResolvedValueOnce({
      data: mockRegistrations
    });

    // First email succeeds, second fails
    mockClient.mutations.sendCustomEmail
      .mockResolvedValueOnce({ success: true })
      .mockRejectedValueOnce(new Error('Email failed'));
    
    mockClient.mutations.sendCustomSms.mockResolvedValue({ success: true });

    const validPayload = {
      subject: 'Test Subject',
      emailMessage: 'Test email message',
      sendSmsNotification: true,
      targetStatus: 'all'
    };

    const request = new NextRequest('http://localhost:3000/api/send-email-to-all', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.emailsSent).toBe(1);
    expect(data.emailsFailed).toBe(1);
    expect(data.smsNotificationsSent).toBe(1); // Only send SMS to successful email recipient
    expect(mockClient.mutations.sendCustomSms).toHaveBeenCalledTimes(1);
  });
});