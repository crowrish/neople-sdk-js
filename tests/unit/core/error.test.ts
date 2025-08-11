import { NeopleApiError } from '../../../src/core/error';

describe('NeopleApiError', () => {
  describe('constructor', () => {
    it('should create error with basic properties', () => {
      const error = new NeopleApiError(404, 'Not Found');
      
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(NeopleApiError);
      expect(error.status).toBe(404);
      expect(error.message).toBe('Not Found');
      expect(error.name).toBe('NeopleApiError');
      expect(error.response).toBeUndefined();
    });

    it('should create error with response data', () => {
      const responseData = { error: 'Character not found', code: 'CHAR_NOT_FOUND' };
      const error = new NeopleApiError(404, 'Not Found', responseData);
      
      expect(error.status).toBe(404);
      expect(error.message).toBe('Not Found');
      expect(error.response).toEqual(responseData);
    });

    it('should create error with null response', () => {
      const error = new NeopleApiError(500, 'Internal Server Error', null);
      
      expect(error.status).toBe(500);
      expect(error.message).toBe('Internal Server Error');
      expect(error.response).toBeNull();
    });
  });

  describe('inheritance', () => {
    it('should be instanceof Error', () => {
      const error = new NeopleApiError(400, 'Bad Request');
      
      expect(error instanceof Error).toBe(true);
      expect(error instanceof NeopleApiError).toBe(true);
    });

    it('should have correct prototype chain', () => {
      const error = new NeopleApiError(400, 'Bad Request');
      
      expect(Object.getPrototypeOf(error)).toBe(NeopleApiError.prototype);
      expect(Object.getPrototypeOf(NeopleApiError.prototype)).toBe(Error.prototype);
    });
  });

  describe('stack trace', () => {
    it('should have stack trace', () => {
      const error = new NeopleApiError(500, 'Server Error');
      
      expect(error.stack).toBeDefined();
      expect(typeof error.stack).toBe('string');
      expect(error.stack).toContain('NeopleApiError');
    });

    it('should not include constructor in stack trace when captureStackTrace is available', () => {
      // Mock Error.captureStackTrace
      const originalCaptureStackTrace = Error.captureStackTrace;
      const mockCaptureStackTrace = jest.fn();
      
      // Always set the mock to test the behavior
      (Error as any).captureStackTrace = mockCaptureStackTrace;
      
      const error = new NeopleApiError(400, 'Test Error');
      
      // Verify the mock was called correctly
      expect(mockCaptureStackTrace).toHaveBeenCalledWith(error, NeopleApiError);
      
      // Restore original
      if (originalCaptureStackTrace) {
        Error.captureStackTrace = originalCaptureStackTrace;
      } else {
        delete (Error as any).captureStackTrace;
      }
    });
  });

  describe('error message formatting', () => {
    it('should preserve original message', () => {
      const originalMessage = 'Custom error message with special chars: 한글 テスト';
      const error = new NeopleApiError(400, originalMessage);
      
      expect(error.message).toBe(originalMessage);
    });

    it('should handle empty message', () => {
      const error = new NeopleApiError(500, '');
      
      expect(error.message).toBe('');
    });
  });

  describe('JSON serialization', () => {
    it('should serialize error properties correctly', () => {
      const responseData = { error: 'Test error', details: ['detail1', 'detail2'] };
      const error = new NeopleApiError(422, 'Validation Error', responseData);
      
      const serialized = JSON.parse(JSON.stringify(error));
      
      expect(serialized.status).toBe(422);
      expect(serialized.message).toBe('Validation Error');
      expect(serialized.response).toEqual(responseData);
      expect(serialized.name).toBe('NeopleApiError');
    });
  });

  describe('toString method', () => {
    it('should return proper string representation', () => {
      const error = new NeopleApiError(404, 'Resource not found');
      
      expect(error.toString()).toBe('NeopleApiError: Resource not found');
    });
  });

  describe('common HTTP status codes', () => {
    const testCases = [
      { status: 400, message: 'Bad Request' },
      { status: 401, message: 'Unauthorized' },
      { status: 403, message: 'Forbidden' },
      { status: 404, message: 'Not Found' },
      { status: 429, message: 'Too Many Requests' },
      { status: 500, message: 'Internal Server Error' },
      { status: 502, message: 'Bad Gateway' },
      { status: 503, message: 'Service Unavailable' },
    ];

    testCases.forEach(({ status, message }) => {
      it(`should handle ${status} status code correctly`, () => {
        const error = new NeopleApiError(status, message);
        
        expect(error.status).toBe(status);
        expect(error.message).toBe(message);
        expect(error.name).toBe('NeopleApiError');
      });
    });
  });

  describe('edge cases', () => {
    it('should handle zero status code', () => {
      const error = new NeopleApiError(0, 'Network Error');
      
      expect(error.status).toBe(0);
      expect(error.message).toBe('Network Error');
    });

    it('should handle negative status code', () => {
      const error = new NeopleApiError(-1, 'Invalid Status');
      
      expect(error.status).toBe(-1);
      expect(error.message).toBe('Invalid Status');
    });

    it('should handle very large status code', () => {
      const error = new NeopleApiError(9999, 'Custom Status');
      
      expect(error.status).toBe(9999);
      expect(error.message).toBe('Custom Status');
    });
  });
});