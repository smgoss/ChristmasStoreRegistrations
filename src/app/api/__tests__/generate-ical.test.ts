import { GET } from '../generate-ical/route';
import { NextRequest } from 'next/server';

// Mock Amplify
jest.mock('aws-amplify/data', () => ({
  generateClient: jest.fn()
}));

jest.mock('@/lib/amplify', () => ({
  ensureAmplifyConfigured: jest.fn()
}));

describe('/api/generate-ical', () => {
  let mockClient: any;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    
    mockClient = {
      models: {
        Registration: {
          get: jest.fn()
        },
        RegistrationConfig: {
          list: jest.fn()
        }
      }
    };

    jest.doMock('aws-amplify/data', () => ({
      generateClient: jest.fn(() => mockClient)
    }));

    jest.doMock('@/lib/amplify', () => ({
      ensureAmplifyConfigured: jest.fn()
    }));
  });

  it('should generate iCal file for valid registration', async () => {
    const { GET } = await import('../generate-ical/route');

    const mockRegistration = {
      id: 'test-123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      timeSlot: '10:00',
      numberOfKids: 2
    };

    const mockConfig = {
      locationName: 'Test Christmas Store',
      eventAddress: '123 Test St, Test City, ST 12345'
    };

    mockClient.models.Registration.get.mockResolvedValue({
      data: mockRegistration
    });

    mockClient.models.RegistrationConfig.list.mockResolvedValue({
      data: [mockConfig]
    });

    const request = new NextRequest('http://localhost:3000/api/generate-ical?id=test-123');
    const response = await GET(request);

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('text/calendar; charset=utf-8');
    expect(response.headers.get('Content-Disposition')).toContain('christmas-store-John-Doe.ics');

    const icalContent = await response.text();
    expect(icalContent).toContain('BEGIN:VCALENDAR');
    expect(icalContent).toContain('SUMMARY:Pathway Christmas Store');
    expect(icalContent).toContain('LOCATION:Test Christmas Store');
    expect(icalContent).toContain('DTSTART');
    expect(icalContent).toContain('DTEND');
    expect(icalContent).toContain('END:VCALENDAR');
  });

  it('should return 400 for missing registration ID', async () => {
    const { GET } = await import('../generate-ical/route');

    const request = new NextRequest('http://localhost:3000/api/generate-ical');
    const response = await GET(request);

    expect(response.status).toBe(400);
    const text = await response.text();
    expect(text).toBe('Registration ID is required');
  });

  it('should return 404 for non-existent registration', async () => {
    const { GET } = await import('../generate-ical/route');

    mockClient.models.Registration.get.mockResolvedValue({
      data: null
    });

    const request = new NextRequest('http://localhost:3000/api/generate-ical?id=non-existent');
    const response = await GET(request);

    expect(response.status).toBe(404);
    const text = await response.text();
    expect(text).toBe('Registration not found');
  });

  it('should handle database errors gracefully', async () => {
    const { GET } = await import('../generate-ical/route');

    mockClient.models.Registration.get.mockRejectedValue(new Error('Database error'));

    const request = new NextRequest('http://localhost:3000/api/generate-ical?id=test-123');
    const response = await GET(request);

    expect(response.status).toBe(500);
    const text = await response.text();
    expect(text).toBe('Internal server error');
  });

  it('should use default location info when config is empty', async () => {
    const { GET } = await import('../generate-ical/route');

    const mockRegistration = {
      id: 'test-123',
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      timeSlot: '14:30',
      numberOfKids: 1
    };

    mockClient.models.Registration.get.mockResolvedValue({
      data: mockRegistration
    });

    mockClient.models.RegistrationConfig.list.mockResolvedValue({
      data: []
    });

    const request = new NextRequest('http://localhost:3000/api/generate-ical?id=test-123');
    const response = await GET(request);

    expect(response.status).toBe(200);
    
    const icalContent = await response.text();
    expect(icalContent).toContain('LOCATION:Pathway Christmas Store\\, 1015 21st Ave, Lewiston, ID 83501');
    expect(icalContent).toContain('SUMMARY:Pathway Christmas Store');
  });

  it('should generate correct time slots in iCal format', async () => {
    const { GET } = await import('../generate-ical/route');

    const mockRegistration = {
      id: 'test-123',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      timeSlot: '09:00', // 9 AM should become 9 AM to 10 AM
      numberOfKids: 1
    };

    mockClient.models.Registration.get.mockResolvedValue({
      data: mockRegistration
    });

    mockClient.models.RegistrationConfig.list.mockResolvedValue({
      data: []
    });

    const request = new NextRequest('http://localhost:3000/api/generate-ical?id=test-123');
    const response = await GET(request);

    expect(response.status).toBe(200);
    
    const icalContent = await response.text();
    // Should contain proper iCal datetime format
    expect(icalContent).toMatch(/DTSTART;TZID=America\/Boise:20251206T090000/);
    expect(icalContent).toMatch(/DTEND;TZID=America\/Boise:20251206T100000/);
  });
});