import { NextRequest } from 'next/server';

// Test for confirm-final API endpoint
describe('/api/confirm-final', () => {
  let mockClient: any;
  let POST: any;
  let GET: any;

  beforeEach(() => {
    // Reset all mocks
    jest.resetModules();
    jest.clearAllMocks();

    // Mock AWS Amplify
    jest.doMock('@/lib/amplify', () => ({
      ensureAmplifyConfigured: jest.fn().mockResolvedValue(undefined)
    }));

    // Mock client
    mockClient = {
      models: {
        Registration: {
          list: jest.fn(),
          update: jest.fn()
        }
      }
    };

    jest.doMock('aws-amplify/data', () => ({
      generateClient: jest.fn(() => mockClient)
    }));

    // Mock API utilities
    jest.doMock('@/lib/api-utils', () => ({
      createErrorResponse: jest.fn((error, code, status) => 
        new Response(JSON.stringify({ success: false, error, code }), { status })
      ),
      createSuccessResponse: jest.fn((data) => 
        new Response(JSON.stringify({ success: true, ...data }), { status: 200 })
      ),
      validateRequestBody: jest.fn().mockResolvedValue({
        success: true,
        data: { token: 'test-token-123' }
      }),
      applyRateLimit: jest.fn().mockReturnValue(null)
    }));

    // Import route handlers
    const route = require('../confirm-final/route');
    POST = route.POST;
    GET = route.GET;
  });

  describe('POST - Success Cases', () => {
    it('should successfully confirm an unconfirmed registration', async () => {
      const registration = {
        id: 'reg-123',
        firstName: 'John',
        lastName: 'Doe',
        timeSlot: '10:00',
        numberOfKids: 2,
        registrationStatus: 'unconfirmed'
      };

      mockClient.models.Registration.list.mockResolvedValue({ data: [registration] });
      mockClient.models.Registration.update.mockResolvedValue({ errors: null });

      const request = new NextRequest('http://localhost:3001/api/confirm-final', {
        method: 'POST',
        body: JSON.stringify({ token: 'test-token-123' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.registration.status).toBe('confirmed');
      expect(mockClient.models.Registration.update).toHaveBeenCalledWith({
        id: 'reg-123',
        registrationStatus: 'confirmed',
        finalConfirmedAt: expect.any(String)
      });
    });

    it('should handle already confirmed registration', async () => {
      const registration = {
        id: 'reg-123',
        firstName: 'John',
        lastName: 'Doe',
        timeSlot: '10:00',
        numberOfKids: 2,
        registrationStatus: 'confirmed'
      };

      mockClient.models.Registration.list.mockResolvedValue({ data: [registration] });

      const request = new NextRequest('http://localhost:3001/api/confirm-final', {
        method: 'POST',
        body: JSON.stringify({ token: 'test-token-123' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.registration.status).toBe('confirmed');
      expect(mockClient.models.Registration.update).not.toHaveBeenCalled();
    });
  });

  describe('POST - Error Cases', () => {
    it('should reject invalid token', async () => {
      mockClient.models.Registration.list.mockResolvedValue({ data: [] });

      const request = new NextRequest('http://localhost:3001/api/confirm-final', {
        method: 'POST',
        body: JSON.stringify({ token: 'invalid-token' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.code).toBe('INVALID_TOKEN');
    });

    it('should handle cancelled registration', async () => {
      const registration = {
        id: 'reg-123',
        registrationStatus: 'cancelled'
      };

      mockClient.models.Registration.list.mockResolvedValue({ data: [registration] });

      const request = new NextRequest('http://localhost:3001/api/confirm-final', {
        method: 'POST',
        body: JSON.stringify({ token: 'test-token-123' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.code).toBe('REGISTRATION_CANCELLED');
    });

    it('should handle invalid status', async () => {
      const registration = {
        id: 'reg-123',
        registrationStatus: 'registered'
      };

      mockClient.models.Registration.list.mockResolvedValue({ data: [registration] });

      const request = new NextRequest('http://localhost:3001/api/confirm-final', {
        method: 'POST',
        body: JSON.stringify({ token: 'test-token-123' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.success).toBe(false);
      expect(data.code).toBe('INVALID_STATUS');
    });

    it('should handle database update errors', async () => {
      const registration = {
        id: 'reg-123',
        firstName: 'John',
        lastName: 'Doe',
        timeSlot: '10:00',
        numberOfKids: 2,
        registrationStatus: 'unconfirmed'
      };

      mockClient.models.Registration.list.mockResolvedValue({ data: [registration] });
      mockClient.models.Registration.update.mockResolvedValue({ errors: ['Database error'] });

      const request = new NextRequest('http://localhost:3001/api/confirm-final', {
        method: 'POST',
        body: JSON.stringify({ token: 'test-token-123' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.code).toBe('UPDATE_FAILED');
    });

    it('should handle validation errors', async () => {
      const apiUtils = require('@/lib/api-utils');
      const validationErrorResponse = new Response(JSON.stringify({ error: 'Validation failed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
      apiUtils.validateRequestBody.mockResolvedValueOnce({
        success: false,
        response: validationErrorResponse
      });

      const request = new NextRequest('http://localhost:3001/api/confirm-final', {
        method: 'POST',
        body: JSON.stringify({ invalid: 'data' })
      });

      const response = await POST(request);

      expect(response).toBe(validationErrorResponse);
    });

    it('should handle rate limiting', async () => {
      const apiUtils = require('@/lib/api-utils');
      const rateLimitResponse = new Response(JSON.stringify({ error: 'Rate limited' }), {
        status: 429,
        headers: { 'Content-Type': 'application/json' }
      });
      apiUtils.applyRateLimit.mockReturnValueOnce(rateLimitResponse);

      const request = new NextRequest('http://localhost:3001/api/confirm-final', {
        method: 'POST',
        body: JSON.stringify({ token: 'test-token-123' })
      });

      const response = await POST(request);

      expect(response).toBe(rateLimitResponse);
      expect(mockClient.models.Registration.list).not.toHaveBeenCalled();
    });

    it('should handle unexpected errors', async () => {
      mockClient.models.Registration.list.mockRejectedValue(new Error('Database connection failed'));

      const request = new NextRequest('http://localhost:3001/api/confirm-final', {
        method: 'POST',
        body: JSON.stringify({ token: 'test-token-123' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.code).toBe('INTERNAL_ERROR');
    });
  });

  describe('GET', () => {
    it('should redirect to success page with valid token', async () => {
      // Setup a registration that will be found and confirmed
      const registration = {
        id: 'reg-123',
        firstName: 'John',
        lastName: 'Doe',
        timeSlot: '10:00',
        numberOfKids: 2,
        registrationStatus: 'unconfirmed'
      };

      mockClient.models.Registration.list.mockResolvedValue({ data: [registration] });
      mockClient.models.Registration.update.mockResolvedValue({ errors: null });

      const request = new NextRequest('http://localhost:3001/api/confirm-final?token=test-token-123');

      const response = await GET(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('Location')).toContain('/confirm-final/success');
      expect(response.headers.get('Location')).toContain('confirmed=true');
      expect(response.headers.get('Location')).toContain('firstName=John');
    });

    it('should redirect to error page on invalid token', async () => {
      // Setup to return no registration (invalid token)
      mockClient.models.Registration.list.mockResolvedValue({ data: [] });

      const request = new NextRequest('http://localhost:3001/api/confirm-final?token=invalid-token');

      const response = await GET(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('Location')).toContain('/confirm-final/error');
      expect(response.headers.get('Location')).toContain('error=INVALID_TOKEN');
    });

    it('should redirect to error page when token is missing', async () => {
      const request = new NextRequest('http://localhost:3001/api/confirm-final');

      const response = await GET(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('Location')).toBe('http://localhost:3001/?error=missing-token');
    });
  });
});