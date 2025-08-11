import { AxiosAdapter } from '../../../src/adapters/axios-adapter';
import { NeopleApiError } from '../../../src/core/error';

// Mock axios instance
const mockAxiosInstance = {
  get: jest.fn(),
};

describe('AxiosAdapter', () => {
  let adapter: AxiosAdapter;

  beforeEach(() => {
    adapter = new AxiosAdapter(mockAxiosInstance as any);
    mockAxiosInstance.get.mockClear();
  });

  describe('successful requests', () => {
    it('should make GET request with correct parameters', async () => {
      const mockResponseData = { characterId: '123', characterName: '홍길동' };
      mockAxiosInstance.get.mockResolvedValueOnce({
        data: mockResponseData,
        status: 200,
        statusText: 'OK',
      });

      const result = await adapter.get('https://api.example.com/test', {
        headers: { 'Authorization': 'Bearer token' },
        timeout: 5000,
        params: { name: '홍길동' },
      });

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        'https://api.example.com/test',
        {
          headers: { 'Authorization': 'Bearer token' },
          timeout: 5000,
          params: { name: '홍길동' },
        }
      );

      expect(result).toEqual(mockResponseData);
    });

    it('should handle requests without config', async () => {
      const mockResponseData = { data: 'test' };
      mockAxiosInstance.get.mockResolvedValueOnce({
        data: mockResponseData,
        status: 200,
        statusText: 'OK',
      });

      const result = await adapter.get('https://api.example.com/test');

      expect(mockAxiosInstance.get).toHaveBeenCalledWith(
        'https://api.example.com/test',
        expect.objectContaining({
          headers: undefined,
          timeout: undefined,
          params: undefined,
        })
      );

      expect(result).toEqual(mockResponseData);
    });
  });

  describe('error handling', () => {
    it('should throw NeopleApiError for response errors', async () => {
      const axiosError = {
        response: {
          status: 404,
          statusText: 'Not Found',
          data: { error: 'Character not found' },
        },
      };
      mockAxiosInstance.get.mockRejectedValueOnce(axiosError);

      try {
        await adapter.get('https://api.example.com/test');
        // Should not reach here
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(NeopleApiError);
        expect((error as NeopleApiError).status).toBe(404);
        expect((error as NeopleApiError).message).toBe('HTTP 404: Not Found');
        expect((error as NeopleApiError).response).toEqual({ error: 'Character not found' });
      }
    });

    it('should throw NeopleApiError for request errors', async () => {
      const axiosError = {
        request: { some: 'request data' },
        message: 'Request failed',
      };
      mockAxiosInstance.get.mockRejectedValueOnce(axiosError);

      try {
        await adapter.get('https://api.example.com/test');
        // Should not reach here
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(NeopleApiError);
        expect((error as NeopleApiError).status).toBe(0);
        expect((error as NeopleApiError).message).toBe('Network Error: No response received');
      }
    });

    it('should throw NeopleApiError for other axios errors', async () => {
      const axiosError = {
        message: 'Unknown axios error',
      };
      mockAxiosInstance.get.mockRejectedValueOnce(axiosError);

      try {
        await adapter.get('https://api.example.com/test');
        // Should not reach here
        expect(true).toBe(false);
      } catch (error) {
        expect(error).toBeInstanceOf(NeopleApiError);
        expect((error as NeopleApiError).status).toBe(0);
        expect((error as NeopleApiError).message).toBe('Unknown axios error');
      }
    });

    it('should handle errors without message', async () => {
      const axiosError = {};
      mockAxiosInstance.get.mockRejectedValueOnce(axiosError);

      await expect(
        adapter.get('https://api.example.com/test')
      ).rejects.toThrow('Unknown axios error');
    });
  });
});