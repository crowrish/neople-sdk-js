import { FetchAdapter } from '../../../src/adapters/fetch-adapter';
import { NeopleApiError } from '../../../src/core/error';

// Mock fetch
global.fetch = jest.fn();
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('FetchAdapter', () => {
  let adapter: FetchAdapter;

  beforeEach(() => {
    adapter = new FetchAdapter();
    mockFetch.mockClear();
  });

  describe('successful requests', () => {
    it('should make GET request with correct URL and headers', async () => {
      const mockResponse = { characterId: '123', characterName: '홍길동' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await adapter.get('https://api.example.com/test', {
        headers: { 'Authorization': 'Bearer token' },
        params: { name: '홍길동' },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test?name=%ED%99%8D%EA%B8%B8%EB%8F%99',
        expect.objectContaining({
          method: 'GET',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer token',
          }),
        })
      );

      expect(result).toEqual(mockResponse);
    });

    it('should handle requests without config', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      const result = await adapter.get('https://api.example.com/test');

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      );

      expect(result).toEqual(mockResponse);
    });

    it('should handle timeout configuration', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await adapter.get('https://api.example.com/test', {
        timeout: 5000,
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        })
      );
    });
  });

  describe('error handling', () => {
    it('should throw NeopleApiError for HTTP errors', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: async () => 'Character not found',
      } as Response);

      await expect(
        adapter.get('https://api.example.com/test')
      ).rejects.toThrow(NeopleApiError);

      // Mock the response again for the second call
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: async () => 'Character not found',
      } as Response);

      await expect(
        adapter.get('https://api.example.com/test')
      ).rejects.toThrow('HTTP 404: Not Found');
    });

    it('should handle network errors', async () => {
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      await expect(
        adapter.get('https://api.example.com/test')
      ).rejects.toThrow('Network error');
    });

    it('should handle CORS errors properly', async () => {
      const corsError = new TypeError('Failed to fetch');
      mockFetch.mockRejectedValueOnce(corsError);

      await expect(
        adapter.get('https://api.example.com/test')
      ).rejects.toThrow('CORS Error: Cross-origin request blocked. Check API endpoint CORS settings.');
    });

    it('should handle timeout errors properly', async () => {
      const timeoutError = new Error('The operation was aborted');
      timeoutError.name = 'AbortError';
      mockFetch.mockRejectedValueOnce(timeoutError);

      await expect(
        adapter.get('https://api.example.com/test')
      ).rejects.toThrow('Request timeout: The request took too long to complete.');
    });

    it('should handle various CORS error messages', async () => {
      const corsError1 = new TypeError('Network request failed');
      mockFetch.mockRejectedValueOnce(corsError1);

      await expect(
        adapter.get('https://api.example.com/test')
      ).rejects.toThrow('CORS Error: Cross-origin request blocked');

      const corsError2 = new TypeError('CORS policy blocked');
      mockFetch.mockRejectedValueOnce(corsError2);

      await expect(
        adapter.get('https://api.example.com/test')
      ).rejects.toThrow('CORS Error: Cross-origin request blocked');
    });

    it('should handle JSON parsing errors gracefully', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: jest.fn().mockRejectedValueOnce(new Error('Parse error')),
      } as any);

      await expect(
        adapter.get('https://api.example.com/test')
      ).rejects.toThrow(NeopleApiError);
    });
  });

  describe('URL building', () => {
    it('should build URL with query parameters correctly', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await adapter.get('https://api.example.com/test', {
        params: {
          characterName: '홍길동',
          serverId: 'cain',
          limit: 10,
          undefined: undefined,
          null: null,
        },
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test?characterName=%ED%99%8D%EA%B8%B8%EB%8F%99&serverId=cain&limit=10',
        expect.any(Object)
      );
    });

    it('should handle URLs without query parameters', async () => {
      const mockResponse = { data: 'test' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      } as Response);

      await adapter.get('https://api.example.com/test', {
        params: {},
      });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.any(Object)
      );
    });
  });
});