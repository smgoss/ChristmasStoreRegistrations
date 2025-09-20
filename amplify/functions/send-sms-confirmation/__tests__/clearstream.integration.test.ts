/**
 * Integration tests for Clearstream API
 * These tests can be run against the actual API or mocked for CI/CD
 */

const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('Clearstream API Integration', () => {
  const CLEARSTREAM_API_URL = 'https://api.getclearstream.com/v1/texts';
  
  beforeEach(() => {
    process.env.CLEAR_STREAM_API_KEY = 'test-api-key';
    process.env.CLEARSTREAM_TEXT_HEADER = 'Test Header';
    mockFetch.mockClear();
  });

  describe('API Request Format', () => {
    it('should send request with correct headers and content type', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'Success'
      } as Response);

      // Import the function that makes the API call
      const { handler } = await import('../handler');
      
      const event = {
        arguments: {
          registration: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '5551234567',
            timeSlot: '09:00',
            numberOfKids: 1,
            registrationDate: '2025-09-16T18:19:26.549Z'
          }
        }
      };

      await handler(event, {} as any, {} as any);

      expect(mockFetch).toHaveBeenCalledWith(
        CLEARSTREAM_API_URL,
        expect.objectContaining({
          method: 'POST',
          headers: {
            'X-Api-Key': 'test-api-key',
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: expect.any(URLSearchParams)
        })
      );
    });

    it('should send request with correct form parameters', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'Success'
      } as Response);

      const { handler } = await import('../handler');
      
      const event = {
        arguments: {
          registration: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '5551234567',
            timeSlot: '09:00',
            numberOfKids: 2,
            registrationDate: '2025-09-16T18:19:26.549Z'
          }
        }
      };

      await handler(event, {} as any, {} as any);

      const callBody = mockFetch.mock.calls[0][1]?.body as URLSearchParams;
      
      expect(callBody.get('to')).toBe('+15551234567');
      expect(callBody.get('text_header')).toBe('Test Header');
      expect(callBody.get('text_body')).toContain('Hello John!');
      expect(callBody.get('text_body')).toContain('Time: 09:00 AM');
      expect(callBody.get('text_body')).toContain('Children: 2');
    });
  });

  describe('Response Handling', () => {
    it('should handle successful API responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'Message sent successfully'
      } as Response);

      const { handler } = await import('../handler');
      
      const event = {
        arguments: {
          registration: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '5551234567',
            timeSlot: '09:00',
            numberOfKids: 1,
            registrationDate: '2025-09-16T18:19:26.549Z'
          }
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result).toEqual({
        success: true,
        message: 'SMS confirmation sent successfully'
      });
    });

    it('should handle API error responses', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        text: async () => 'Invalid phone number'
      } as Response);

      const { handler } = await import('../handler');
      
      const event = {
        arguments: {
          registration: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: 'invalid',
            timeSlot: '09:00',
            numberOfKids: 1,
            registrationDate: '2025-09-16T18:19:26.549Z'
          }
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result).toEqual({
        success: false,
        message: 'Failed to send SMS confirmation'
      });
    });

    it('should handle authentication errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 401,
        text: async () => 'Invalid API key'
      } as Response);

      const { handler } = await import('../handler');
      
      const event = {
        arguments: {
          registration: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '5551234567',
            timeSlot: '09:00',
            numberOfKids: 1,
            registrationDate: '2025-09-16T18:19:26.549Z'
          }
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result.success).toBe(false);
    });

    it('should handle rate limiting', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        text: async () => 'Rate limit exceeded'
      } as Response);

      const { handler } = await import('../handler');
      
      const event = {
        arguments: {
          registration: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '5551234567',
            timeSlot: '09:00',
            numberOfKids: 1,
            registrationDate: '2025-09-16T18:19:26.549Z'
          }
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result.success).toBe(false);
    });
  });

  describe('Network Error Handling', () => {
    it('should handle network timeouts', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network timeout'));

      const { handler } = await import('../handler');
      
      const event = {
        arguments: {
          registration: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '5551234567',
            timeSlot: '09:00',
            numberOfKids: 1,
            registrationDate: '2025-09-16T18:19:26.549Z'
          }
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result).toEqual({
        success: false,
        message: 'Failed to send SMS confirmation'
      });
    });

    it('should handle DNS resolution failures', async () => {
      mockFetch.mockRejectedValueOnce(new Error('getaddrinfo ENOTFOUND'));

      const { handler } = await import('../handler');
      
      const event = {
        arguments: {
          registration: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            phone: '5551234567',
            timeSlot: '09:00',
            numberOfKids: 1,
            registrationDate: '2025-09-16T18:19:26.549Z'
          }
        }
      };

      const result = await handler(event, {} as any, {} as any);

      expect(result.success).toBe(false);
    });
  });

  describe('Message Content Validation', () => {
    it('should generate messages under SMS length limits', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'Success'
      } as Response);

      const { handler } = await import('../handler');
      
      const event = {
        arguments: {
          registration: {
            firstName: 'VeryLongFirstNameThatMightCauseIssues',
            lastName: 'VeryLongLastNameThatMightCauseIssues',
            email: 'verylongemailaddress@verylongdomainnamethatmightcauseissues.com',
            phone: '5551234567',
            timeSlot: '09:00',
            numberOfKids: 5,
            registrationDate: '2025-09-16T18:19:26.549Z'
          }
        }
      };

      await handler(event, {} as any, {} as any);

      const callBody = mockFetch.mock.calls[0][1]?.body as URLSearchParams;
      const messageBody = callBody.get('text_body');
      
      // SMS messages should typically be under 160 characters for single segment
      // or under 1600 characters for concatenated messages
      expect(messageBody!.length).toBeLessThan(1600);
    });

    it('should handle special characters in names', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        text: async () => 'Success'
      } as Response);

      const { handler } = await import('../handler');
      
      const event = {
        arguments: {
          registration: {
            firstName: "José",
            lastName: "García-González",
            email: 'jose@example.com',
            phone: '5551234567',
            timeSlot: '09:00',
            numberOfKids: 1,
            registrationDate: '2025-09-16T18:19:26.549Z'
          }
        }
      };

      await handler(event, {} as any, {} as any);

      const callBody = mockFetch.mock.calls[0][1]?.body as URLSearchParams;
      const messageBody = callBody.get('text_body');
      
      expect(messageBody).toContain('José');
    });
  });

  describe('Phone Number Edge Cases', () => {
    const testCases = [
      { input: '5551234567', expected: '+15551234567', description: '10-digit US number' },
      { input: '15551234567', expected: '+15551234567', description: '11-digit with 1' },
      { input: '+15551234567', expected: '+15551234567', description: 'Already formatted' },
      { input: '(555) 123-4567', expected: '+15551234567', description: 'Formatted US number' },
      { input: '555.123.4567', expected: '+15551234567', description: 'Dot-separated number' },
      { input: '555-123-4567', expected: '+15551234567', description: 'Dash-separated number' },
      { input: '+44 20 7946 0958', expected: '+44 20 7946 0958', description: 'International number' }
    ];

    testCases.forEach(({ input, expected, description }) => {
      it(`should handle ${description}`, async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          text: async () => 'Success'
        } as Response);

        const { handler } = await import('../handler');
        
        const event = {
          arguments: {
            registration: {
              firstName: 'John',
              lastName: 'Doe',
              email: 'john@example.com',
              phone: input,
              timeSlot: '09:00',
              numberOfKids: 1,
              registrationDate: '2025-09-16T18:19:26.549Z'
            }
          }
        };

        await handler(event, {} as any, {} as any);

        const callBody = mockFetch.mock.calls[0][1]?.body as URLSearchParams;
        expect(callBody.get('to')).toBe(expected);
      });
    });
  });
});