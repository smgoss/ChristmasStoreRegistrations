import { POST } from '../send-invite-email/route';
import { NextRequest } from 'next/server';

// Mock AWS SDK
jest.mock('@aws-sdk/client-lambda', () => ({
  LambdaClient: jest.fn().mockImplementation(() => ({
    send: jest.fn()
  })),
  InvokeCommand: jest.fn()
}));

// Mock the API utilities
jest.mock('@/lib/api-utils', () => ({
  createErrorResponse: jest.fn((error, code, status, details) => 
    new Response(JSON.stringify({ success: false, error, code, details, timestamp: '2023-01-01T00:00:00.000Z' }), { status })
  ),
  createSuccessResponse: jest.fn((data, status = 200) => 
    new Response(JSON.stringify({ success: true, ...data, timestamp: '2023-01-01T00:00:00.000Z' }), { status })
  ),
  validateRequestBody: jest.fn(),
  applyRateLimit: jest.fn(() => null)
}));

describe('/api/send-invite-email', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully send invite email', async () => {
    const { validateRequestBody } = require('@/lib/api-utils');
    const { LambdaClient } = require('@aws-sdk/client-lambda');
    
    validateRequestBody.mockResolvedValueOnce({
      success: true,
      data: {
        email: 'test@example.com',
        inviteLink: 'https://example.com/register/token123',
        token: 'token123'
      }
    });

    // Mock the LambdaClient constructor to return our mock instance
    const mockSend = jest.fn().mockResolvedValueOnce({
      Payload: new TextEncoder().encode(JSON.stringify({ statusCode: 200 }))
    });
    
    LambdaClient.mockImplementation(() => ({
      send: mockSend
    }));

    const validPayload = {
      email: 'test@example.com',
      inviteLink: 'https://example.com/register/token123',
      token: 'token123'
    };

    const request = new NextRequest('http://localhost:3000/api/send-invite-email', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.message).toBe('Invite email sent successfully');
  });

  it('should reject invalid email format', async () => {
    const { validateRequestBody } = require('@/lib/api-utils');
    
    validateRequestBody.mockResolvedValueOnce({
      success: false,
      response: {
        json: { success: false, error: 'Validation failed', code: 'VALIDATION_ERROR' },
        status: 400
      }
    });

    const invalidPayload = {
      email: 'invalid-email',
      inviteLink: 'https://example.com/register/token123',
      token: 'token123'
    };

    const request = new NextRequest('http://localhost:3000/api/send-invite-email', {
      method: 'POST',
      body: JSON.stringify(invalidPayload)
    });

    const response = await POST(request);

    expect((response as any).json.success).toBe(false);
    expect((response as any).json.code).toBe('VALIDATION_ERROR');
  });

  it('should reject invalid invite link URL', async () => {
    const { validateRequestBody } = require('@/lib/api-utils');
    
    validateRequestBody.mockResolvedValueOnce({
      success: false,
      response: {
        json: { success: false, error: 'Validation failed', code: 'VALIDATION_ERROR' },
        status: 400
      }
    });

    const invalidPayload = {
      email: 'test@example.com',
      inviteLink: 'not-a-url',
      token: 'token123'
    };

    const request = new NextRequest('http://localhost:3000/api/send-invite-email', {
      method: 'POST',
      body: JSON.stringify(invalidPayload)
    });

    const response = await POST(request);

    expect((response as any).json.success).toBe(false);
    expect((response as any).json.code).toBe('VALIDATION_ERROR');
  });

  it('should handle Lambda function failure', async () => {
    const { validateRequestBody } = require('@/lib/api-utils');
    const { LambdaClient } = require('@aws-sdk/client-lambda');
    
    validateRequestBody.mockResolvedValueOnce({
      success: true,
      data: {
        email: 'test@example.com',
        inviteLink: 'https://example.com/register/token123',
        token: 'token123'
      }
    });

    const mockSend = jest.fn().mockResolvedValueOnce({
      Payload: new TextEncoder().encode(JSON.stringify({ statusCode: 500, error: 'Lambda error' }))
    });
    
    LambdaClient.mockImplementation(() => ({
      send: mockSend
    }));

    const validPayload = {
      email: 'test@example.com',
      inviteLink: 'https://example.com/register/token123',
      token: 'token123'
    };

    const request = new NextRequest('http://localhost:3000/api/send-invite-email', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });

    const response = await POST(request);
    const data = await response.json();

    expect(data.success).toBe(false);
    expect(data.code).toBe('INTERNAL_ERROR');
  });

  it('should handle Lambda invocation errors', async () => {
    const { validateRequestBody } = require('@/lib/api-utils');
    const { LambdaClient } = require('@aws-sdk/client-lambda');
    
    validateRequestBody.mockResolvedValueOnce({
      success: true,
      data: {
        email: 'test@example.com',
        inviteLink: 'https://example.com/register/token123',
        token: 'token123'
      }
    });

    const mockSend = jest.fn().mockRejectedValueOnce(new Error('Lambda invocation failed'));
    
    LambdaClient.mockImplementation(() => ({
      send: mockSend
    }));

    const validPayload = {
      email: 'test@example.com',
      inviteLink: 'https://example.com/register/token123',
      token: 'token123'
    };

    const request = new NextRequest('http://localhost:3000/api/send-invite-email', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });

    const response = await POST(request);

    expect((response as any).json.success).toBe(false);
    expect((response as any).json.code).toBe('INTERNAL_ERROR');
  });

  it('should handle rate limiting', async () => {
    const { applyRateLimit } = require('@/lib/api-utils');
    applyRateLimit.mockReturnValueOnce({
      json: { success: false, error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
      status: 429
    });

    const validPayload = {
      email: 'test@example.com',
      inviteLink: 'https://example.com/register/token123',
      token: 'token123'
    };

    const request = new NextRequest('http://localhost:3000/api/send-invite-email', {
      method: 'POST',
      body: JSON.stringify(validPayload)
    });

    const response = await POST(request);

    expect((response as any).status).toBe(429);
    expect((response as any).json.code).toBe('RATE_LIMIT_EXCEEDED');
  });

  it('should reject missing token', async () => {
    const { validateRequestBody } = require('@/lib/api-utils');
    
    validateRequestBody.mockResolvedValueOnce({
      success: false,
      response: {
        json: { success: false, error: 'Validation failed', code: 'VALIDATION_ERROR' },
        status: 400
      }
    });

    const invalidPayload = {
      email: 'test@example.com',
      inviteLink: 'https://example.com/register/token123',
      token: ''
    };

    const request = new NextRequest('http://localhost:3000/api/send-invite-email', {
      method: 'POST',
      body: JSON.stringify(invalidPayload)
    });

    const response = await POST(request);

    expect((response as any).json.success).toBe(false);
    expect((response as any).json.code).toBe('VALIDATION_ERROR');
  });
});