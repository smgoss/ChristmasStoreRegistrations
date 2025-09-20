import {
  createErrorResponse,
  createSuccessResponse,
  validateRequestBody,
  checkRateLimit,
  applyRateLimit,
  getClientIp
} from '../api-utils';
import { z } from 'zod';

// Mock NextResponse for testing
jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: data,
      status: options?.status || 200,
      headers: options?.headers || {}
    }))
  }
}));

describe('API Utils', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createErrorResponse', () => {
    it('should create standardized error response', () => {
      const response = createErrorResponse('Test error', 'TEST_ERROR', 400);
      
      expect(response.json).toEqual({
        success: false,
        error: 'Test error',
        code: 'TEST_ERROR',
        details: undefined,
        timestamp: expect.any(String)
      });
      expect(response.status).toBe(400);
    });

    it('should include details when provided', () => {
      const details = { field: 'email', message: 'Invalid format' };
      const response = createErrorResponse('Validation error', 'VALIDATION_ERROR', 400, details);
      
      expect((response as any).json.details).toEqual(details);
    });
  });

  describe('createSuccessResponse', () => {
    it('should create standardized success response', () => {
      const data = { id: '123', name: 'Test' };
      const response = createSuccessResponse(data, 201);
      
      expect(response.json).toEqual({
        success: true,
        data,
        timestamp: expect.any(String)
      });
      expect(response.status).toBe(201);
    });

    it('should default to status 200', () => {
      const response = createSuccessResponse({ test: true });
      expect(response.status).toBe(200);
    });
  });

  describe('validateRequestBody', () => {
    const TestSchema = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      age: z.number().min(0)
    });

    it('should validate valid request body', async () => {
      const validData = { name: 'John', email: 'john@example.com', age: 25 };
      const mockRequest = {
        json: jest.fn().mockResolvedValue(validData)
      } as unknown as Request;

      const result = await validateRequestBody(mockRequest, TestSchema);
      
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    it('should reject invalid request body', async () => {
      const invalidData = { name: '', email: 'invalid-email', age: -5 };
      const mockRequest = {
        json: jest.fn().mockResolvedValue(invalidData)
      } as unknown as Request;

      const result = await validateRequestBody(mockRequest, TestSchema);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect((result.response as any).json.code).toBe('VALIDATION_ERROR');
        expect((result.response as any).status).toBe(400);
      }
    });

    it('should handle JSON parse errors', async () => {
      const mockRequest = {
        json: jest.fn().mockRejectedValue(new SyntaxError('Invalid JSON'))
      } as unknown as Request;

      const result = await validateRequestBody(mockRequest, TestSchema);
      
      expect(result.success).toBe(false);
      if (!result.success) {
        expect((result.response as any).json.code).toBe('INVALID_JSON');
        expect((result.response as any).status).toBe(400);
      }
    });
  });

  describe('getClientIp', () => {
    it('should extract IP from x-forwarded-for header', () => {
      const mockRequest = {
        headers: new Map([['x-forwarded-for', '192.168.1.1, 10.0.0.1']])
      } as unknown as Request;
      mockRequest.headers.get = jest.fn((key) => {
        const headers = new Map([['x-forwarded-for', '192.168.1.1, 10.0.0.1']]);
        return headers.get(key) || null;
      });

      const ip = getClientIp(mockRequest);
      expect(ip).toBe('192.168.1.1');
    });

    it('should fall back to x-real-ip header', () => {
      const mockRequest = {
        headers: new Map([['x-real-ip', '192.168.1.2']])
      } as unknown as Request;
      mockRequest.headers.get = jest.fn((key) => {
        const headers = new Map([['x-real-ip', '192.168.1.2']]);
        return headers.get(key) || null;
      });

      const ip = getClientIp(mockRequest);
      expect(ip).toBe('192.168.1.2');
    });

    it('should return unknown when no IP headers present', () => {
      const mockRequest = {
        headers: new Map()
      } as unknown as Request;
      mockRequest.headers.get = jest.fn(() => null);

      const ip = getClientIp(mockRequest);
      expect(ip).toBe('unknown');
    });
  });

  describe('checkRateLimit', () => {
    beforeEach(() => {
      // Clear rate limit map between tests
      jest.resetModules();
    });

    it('should allow first request', () => {
      const result = checkRateLimit('test-ip', 5, 60000);
      
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(4);
    });

    it('should track multiple requests', () => {
      const identifier = 'test-ip-2';
      
      // First request
      let result = checkRateLimit(identifier, 3, 60000);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(2);
      
      // Second request
      result = checkRateLimit(identifier, 3, 60000);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(1);
      
      // Third request
      result = checkRateLimit(identifier, 3, 60000);
      expect(result.allowed).toBe(true);
      expect(result.remaining).toBe(0);
      
      // Fourth request should be blocked
      result = checkRateLimit(identifier, 3, 60000);
      expect(result.allowed).toBe(false);
      expect(result.remaining).toBe(0);
    });

    it('should reset after window expires', () => {
      const identifier = 'test-ip-3';
      const windowMs = 100; // Very short window for testing
      
      // Exhaust rate limit
      checkRateLimit(identifier, 1, windowMs);
      let result = checkRateLimit(identifier, 1, windowMs);
      expect(result.allowed).toBe(false);
      
      // Wait for window to expire and try again
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          result = checkRateLimit(identifier, 1, windowMs);
          expect(result.allowed).toBe(true);
          resolve();
        }, windowMs + 10);
      });
    });
  });

  describe('applyRateLimit', () => {
    it('should return null when rate limit not exceeded', () => {
      const mockRequest = {
        headers: new Map([['x-forwarded-for', '192.168.1.100']])
      } as unknown as Request;
      mockRequest.headers.get = jest.fn((key) => {
        const headers = new Map([['x-forwarded-for', '192.168.1.100']]);
        return headers.get(key) || null;
      });

      const result = applyRateLimit(mockRequest, 10, 60000);
      expect(result).toBeNull();
    });

    it('should return error response when rate limit exceeded', () => {
      const mockRequest = {
        headers: new Map([['x-forwarded-for', '192.168.1.101']])
      } as unknown as Request;
      mockRequest.headers.get = jest.fn((key) => {
        const headers = new Map([['x-forwarded-for', '192.168.1.101']]);
        return headers.get(key) || null;
      });

      // Exhaust rate limit
      for (let i = 0; i < 2; i++) {
        applyRateLimit(mockRequest, 2, 60000);
      }
      
      // Next request should be blocked
      const result = applyRateLimit(mockRequest, 2, 60000);
      expect(result).not.toBeNull();
      expect((result as any)?.json.code).toBe('RATE_LIMIT_EXCEEDED');
      expect((result as any)?.status).toBe(429);
    });
  });
});