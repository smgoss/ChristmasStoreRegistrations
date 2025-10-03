import { handler } from '../handler';

// Mock fetch for testing
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('SMS Confirmation Handler', () => {
  const validRegistration = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '5551234567',
    timeSlot: '09:00',
    numberOfKids: 2,
    referredBy: 'Friend',
    registrationDate: '2025-09-16T18:19:26.549Z'
  };

  beforeEach(() => {
    // Set up environment variables
    process.env.CLEAR_STREAM_API_KEY = 'test-api-key';
    process.env.CLEARSTREAM_TEXT_HEADER = 'Pathway Christmas Store';
    
    // Reset fetch mock
    mockFetch.mockClear();
  });

  afterEach(() => {
    delete process.env.CLEAR_STREAM_API_KEY;
    delete process.env.CLEARSTREAM_TEXT_HEADER;
  });

  describe('Phone Number Validation', () => {
    it('should skip SMS when no phone number provided', async () => {
      const event = {
        arguments: {
          registration: { ...validRegistration, phone: '' }
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result).toEqual({
        success: true,
        message: 'No phone number provided, SMS skipped'
      });
      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should skip SMS when phone is null/undefined', async () => {
      const event = {
        arguments: {
          registration: { ...validRegistration, phone: undefined as any }
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result).toEqual({
        success: true,
        message: 'No phone number provided, SMS skipped'
      });
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('Phone Number Formatting', () => {
    it('should format 10-digit US numbers correctly', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'SMS sent successfully'
      } as Response);

      const event = {
        arguments: {
          registration: { ...validRegistration, phone: '5551234567' }
        }
      };

      await handler(event, {} as any, {} as any);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.getclearstream.com/v1/texts',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'X-Api-Key': 'test-api-key',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: expect.any(URLSearchParams)
        })
      );

      const callBody = mockFetch.mock.calls[0][1]?.body as URLSearchParams;
      expect(callBody.get('to')).toBe('+15551234567');
    });

    it('should format 11-digit numbers starting with 1', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'SMS sent successfully'
      } as Response);

      const event = {
        arguments: {
          registration: { ...validRegistration, phone: '15551234567' }
        }
      };

      await handler(event, {} as any, {} as any);

      const callBody = mockFetch.mock.calls[0][1]?.body as URLSearchParams;
      expect(callBody.get('to')).toBe('+15551234567');
    });

    it('should handle phone numbers with formatting characters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'SMS sent successfully'
      } as Response);

      const event = {
        arguments: {
          registration: { ...validRegistration, phone: '(555) 123-4567' }
        }
      };

      await handler(event, {} as any, {} as any);

      const callBody = mockFetch.mock.calls[0][1]?.body as URLSearchParams;
      expect(callBody.get('to')).toBe('+15551234567');
    });

    it('should preserve international numbers', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'SMS sent successfully'
      } as Response);

      const event = {
        arguments: {
          registration: { ...validRegistration, phone: '+44123456789' }
        }
      };

      await handler(event, {} as any, {} as any);

      const callBody = mockFetch.mock.calls[0][1]?.body as URLSearchParams;
      expect(callBody.get('to')).toBe('+44123456789');
    });
  });

  describe('SMS Content Generation', () => {
    it('should generate correct SMS content with all fields', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'SMS sent successfully'
      } as Response);

      const event = {
        arguments: {
          registration: validRegistration
        }
      };

      await handler(event, {} as any, {} as any);

      const callBody = mockFetch.mock.calls[0][1]?.body as URLSearchParams;
      const messageBody = callBody.get('text_body');
      
      expect(messageBody).toContain('🎄 Registration Confirmed!');
      expect(messageBody).toContain('Hi John!');
      expect(messageBody).toContain('🕘 9:00 AM');
      expect(messageBody).toContain('👶 Children: 2');
      expect(messageBody).toContain('Pathway Christmas Store');
    });

    it('should use correct text header', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'SMS sent successfully'
      } as Response);

      const event = {
        arguments: {
          registration: validRegistration
        }
      };

      await handler(event, {} as any, {} as any);

      const callBody = mockFetch.mock.calls[0][1]?.body as URLSearchParams;
      expect(callBody.get('text_header')).toBe('Pathway Christmas Store');
    });
  });

  describe('Clearstream API Integration', () => {
    it('should call Clearstream API with correct parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'SMS sent successfully'
      } as Response);

      const event = {
        arguments: {
          registration: validRegistration
        }
      };

      await handler(event, {} as any, {} as any);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.getclearstream.com/v1/texts',
        {
          method: 'POST',
          headers: {
            'X-Api-Key': 'test-api-key',
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: expect.any(URLSearchParams)
        }
      );
    });

    it('should return success when API call succeeds', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'SMS sent successfully'
      } as Response);

      const event = {
        arguments: {
          registration: validRegistration
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result).toEqual({
        success: true,
        message: 'SMS confirmation sent successfully'
      });
    });

    it('should handle API errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        text: async () => 'API key invalid'
      } as Response);

      const event = {
        arguments: {
          registration: validRegistration
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result).toEqual({
        success: false,
        message: 'Failed to send SMS confirmation',
        error: 'API key invalid'
      });
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const event = {
        arguments: {
          registration: validRegistration
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result).toEqual({
        success: false,
        message: 'Failed to send SMS confirmation',
        error: 'Network error'
      });
    });

    it('should fail when API key is missing', async () => {
      delete process.env.CLEAR_STREAM_API_KEY;

      const event = {
        arguments: {
          registration: validRegistration
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result).toEqual({
        success: false,
        message: 'Failed to send SMS confirmation',
        error: 'CLEAR_STREAM_API_KEY not found in environment or Secrets Manager'
      });
      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('Event Format Handling', () => {
    it('should handle event.arguments format', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'SMS sent successfully'
      } as Response);

      const event = {
        arguments: {
          registration: validRegistration
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalled();
    });

    it('should handle direct event format', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'SMS sent successfully'
      } as Response);

      const event = {
        registration: validRegistration
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result.success).toBe(true);
      expect(mockFetch).toHaveBeenCalled();
    });

    it('should handle malformed events gracefully', async () => {
      const event = {};

      const result = await handler(event, {} as any, {} as any);

      expect(result).toEqual({
        success: false,
        message: 'Error sending SMS confirmation',
        error: "Registration data is required"
      });
    });
  });

  describe('Environment Configuration', () => {
    it('should use default text header when not provided', async () => {
      delete process.env.CLEARSTREAM_TEXT_HEADER;
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'SMS sent successfully'
      } as Response);

      const event = {
        arguments: {
          registration: validRegistration
        }
      };

      await handler(event, {} as any, {} as any);

      const callBody = mockFetch.mock.calls[0][1]?.body as URLSearchParams;
      expect(callBody.get('text_header')).toBe('Pathway Christmas Store');
    });

    it('should use custom text header when provided', async () => {
      process.env.CLEARSTREAM_TEXT_HEADER = 'Custom Header';
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'SMS sent successfully'
      } as Response);

      const event = {
        arguments: {
          registration: validRegistration
        }
      };

      await handler(event, {} as any, {} as any);

      const callBody = mockFetch.mock.calls[0][1]?.body as URLSearchParams;
      expect(callBody.get('text_header')).toBe('Custom Header');
    });
  });
});