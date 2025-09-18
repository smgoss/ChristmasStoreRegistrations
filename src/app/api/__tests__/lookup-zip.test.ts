import { GET } from '../lookup-zip/route';
import { NextRequest } from 'next/server';

// Mock the API utilities
jest.mock('@/lib/api-utils', () => ({
  createErrorResponse: jest.fn((error, code, status, details) => ({
    json: { success: false, error, code, details, timestamp: '2023-01-01T00:00:00.000Z' },
    status
  })),
  createSuccessResponse: jest.fn((data, status = 200) => ({
    json: { success: true, data, timestamp: '2023-01-01T00:00:00.000Z' },
    status
  })),
  applyRateLimit: jest.fn(() => null) // No rate limiting by default
}));

// Mock fetch
global.fetch = jest.fn();

describe('/api/lookup-zip', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully lookup a valid zip code', async () => {
    const mockApiResponse = {
      'post code': '90210',
      country: 'United States',
      places: [{
        'place name': 'Beverly Hills',
        'state': 'California',
        'state abbreviation': 'CA',
        'admin name1': 'Los Angeles',
        'latitude': '34.0901',
        'longitude': '-118.4065'
      }]
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    });

    const request = new NextRequest('http://localhost:3000/api/lookup-zip?zip=90210');
    const response = await GET(request);

    expect((response as any).json.success).toBe(true);
    expect((response as any).json.data.zipCode).toBe('90210');
    expect((response as any).json.data.results).toHaveLength(1);
    expect((response as any).json.data.results[0].city).toBe('Beverly Hills');
  });

  it('should return error for missing zip parameter', async () => {
    const request = new NextRequest('http://localhost:3000/api/lookup-zip');
    const response = await GET(request);

    expect((response as any).json.success).toBe(false);
    expect((response as any).json.code).toBe('MISSING_ZIP');
    expect((response as any).status).toBe(400);
  });

  it('should return error for invalid zip format', async () => {
    const request = new NextRequest('http://localhost:3000/api/lookup-zip?zip=invalid');
    const response = await GET(request);

    expect((response as any).json.success).toBe(false);
    expect((response as any).json.code).toBe('INVALID_ZIP_FORMAT');
    expect((response as any).status).toBe(400);
  });

  it('should handle zip code not found (404)', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    const request = new NextRequest('http://localhost:3000/api/lookup-zip?zip=99999');
    const response = await GET(request);

    expect((response as any).json.success).toBe(false);
    expect((response as any).json.code).toBe('ZIP_NOT_FOUND');
    expect((response as any).status).toBe(404);
  });

  it('should handle external API errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const request = new NextRequest('http://localhost:3000/api/lookup-zip?zip=12345');
    const response = await GET(request);

    expect((response as any).json.success).toBe(false);
    expect((response as any).json.code).toBe('LOOKUP_FAILED');
    expect((response as any).status).toBe(500);
  });

  it('should accept zip+4 format', async () => {
    const mockApiResponse = {
      'post code': '12345',
      country: 'United States',
      places: [{
        'place name': 'Test City',
        'state': 'Test State',
        'state abbreviation': 'TS',
        'admin name1': 'Test County',
        'latitude': '40.0000',
        'longitude': '-74.0000'
      }]
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockApiResponse)
    });

    const request = new NextRequest('http://localhost:3000/api/lookup-zip?zip=12345-6789');
    const response = await GET(request);

    expect((response as any).json.success).toBe(true);
    expect(fetch).toHaveBeenCalledWith('https://api.zippopotam.us/us/12345');
  });

  it('should handle rate limiting', async () => {
    const { applyRateLimit } = require('@/lib/api-utils');
    applyRateLimit.mockReturnValueOnce({
      json: { success: false, error: 'Rate limit exceeded', code: 'RATE_LIMIT_EXCEEDED' },
      status: 429
    });

    const request = new NextRequest('http://localhost:3000/api/lookup-zip?zip=12345');
    const response = await GET(request);

    expect((response as any).status).toBe(429);
    expect((response as any).json.code).toBe('RATE_LIMIT_EXCEEDED');
  });
});