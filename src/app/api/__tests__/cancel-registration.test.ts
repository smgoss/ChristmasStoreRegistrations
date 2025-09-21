import { NextRequest } from 'next/server';

// Simple test structure that works reliably with Jest
describe('/api/cancel-registration', () => {
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
    const route = require('../cancel-registration/route');
    POST = route.POST;
    GET = route.GET;
  });

  describe('POST - Success Cases', () => {
    it('should successfully cancel an unconfirmed registration', async () => {
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

      const request = new NextRequest('http://localhost:3001/api/cancel-registration', {
        method: 'POST',
        body: JSON.stringify({ token: 'test-token-123' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.registration.status).toBe('cancelled');
    });

    it('should handle already cancelled registration', async () => {
      const registration = {
        id: 'reg-123',
        firstName: 'John',
        lastName: 'Doe',
        timeSlot: '10:00',
        numberOfKids: 2,
        registrationStatus: 'cancelled'
      };

      mockClient.models.Registration.list.mockResolvedValue({ data: [registration] });

      const request = new NextRequest('http://localhost:3001/api/cancel-registration', {
        method: 'POST',
        body: JSON.stringify({ token: 'test-token-123' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.registration.status).toBe('cancelled');
      expect(mockClient.models.Registration.update).not.toHaveBeenCalled();
    });
  });

  describe('POST - Error Cases', () => {
    it('should reject invalid token', async () => {
      mockClient.models.Registration.list.mockResolvedValue({ data: [] });

      const request = new NextRequest('http://localhost:3001/api/cancel-registration', {
        method: 'POST',
        body: JSON.stringify({ token: 'invalid-token' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(404);
      expect(data.success).toBe(false);
      expect(data.code).toBe('INVALID_TOKEN');
    });

    it('should handle invalid registration status', async () => {
      const registration = {
        id: 'reg-123',
        registrationStatus: 'registered'
      };

      mockClient.models.Registration.list.mockResolvedValue({ data: [registration] });

      const request = new NextRequest('http://localhost:3001/api/cancel-registration', {
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

      const request = new NextRequest('http://localhost:3001/api/cancel-registration', {
        method: 'POST',
        body: JSON.stringify({ token: 'test-token-123' })
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.success).toBe(false);
      expect(data.code).toBe('UPDATE_FAILED');
    });
  });

  describe('GET', () => {
    it('should redirect to cancellation page with valid token', async () => {
      const request = new NextRequest('http://localhost:3001/api/cancel-registration?token=test-token-123');

      const response = await GET(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('Location')).toBe('http://localhost:3001/cancel-registration/test-token-123');
    });

    it('should redirect to error page when token is missing', async () => {
      const request = new NextRequest('http://localhost:3001/api/cancel-registration');

      const response = await GET(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('Location')).toBe('http://localhost:3001/?error=missing-token');
    });
  });
});