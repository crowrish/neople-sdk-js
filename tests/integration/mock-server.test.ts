/**
 * Integration tests using a mock HTTP server
 * These tests verify the full request flow from client to HTTP adapter
 */

import { NeopleDFClient, NeopleCyphersClient } from '../../src';
import { FetchAdapter } from '../../src/adapters/fetch-adapter';
import dfFixtures from '../fixtures/df-responses.json';
import cyphersFixtures from '../fixtures/cyphers-responses.json';

// Mock fetch for testing
global.fetch = jest.fn();
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('Integration Tests - Mock Server', () => {
  const testApiKey = 'test-integration-key';
  const baseUrl = 'https://api.neople.co.kr';


  describe('NeopleDFClient Integration', () => {
    let client: NeopleDFClient;

    beforeEach(() => {
      client = new NeopleDFClient(testApiKey, new FetchAdapter(), baseUrl);
    });

    describe('successful API responses', () => {
      it('should handle character search end-to-end', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => dfFixtures.characterSearch,
        } as Response);

        const result = await client.searchCharacter('홍길동', 'cain');

        expect(result).toEqual(dfFixtures.characterSearch);
        expect(mockFetch).toHaveBeenCalledWith(
          `${baseUrl}/df/servers/cain/characters?characterName=%ED%99%8D%EA%B8%B8%EB%8F%99&apikey=${testApiKey}`,
          expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({
              'Content-Type': 'application/json',
            }),
          })
        );
      });

      it('should handle character details end-to-end', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => dfFixtures.characterDetail,
        } as Response);

        const result = await client.getCharacter('cain', 'character-123');

        expect(result).toEqual(dfFixtures.characterDetail);
        expect(mockFetch).toHaveBeenCalledWith(
          `${baseUrl}/df/servers/cain/characters/character-123?apikey=${testApiKey}`,
          expect.any(Object)
        );
      });

      it('should handle auction search with complex parameters', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => dfFixtures.auctionSearch,
        } as Response);

        const result = await client.searchAuction({
          itemName: '해방무기',
          minPrice: 1000000,
          maxPrice: 5000000,
          limit: 50,
        });

        expect(result).toEqual(dfFixtures.auctionSearch);
        
        const expectedUrl = expect.stringContaining(`${baseUrl}/df/auction`);
        expect(mockFetch).toHaveBeenCalledWith(
          expectedUrl,
          expect.any(Object)
        );
        
        // Verify URL contains all parameters
        const calledUrl = mockFetch.mock.calls[0][0] as string;
        expect(calledUrl).toContain('itemName=%ED%95%B4%EB%B0%A9%EB%AC%B4%EA%B8%B0');
        expect(calledUrl).toContain('minPrice=1000000');
        expect(calledUrl).toContain('maxPrice=5000000');
        expect(calledUrl).toContain('limit=50');
        expect(calledUrl).toContain(`apikey=${testApiKey}`);
      });
    });

    describe('error handling', () => {
      it('should handle 404 errors properly', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 404,
          statusText: 'Not Found',
          text: async () => '{"error": "Character not found"}',
        } as Response);

        await expect(
          client.searchCharacter('NonExistentCharacter')
        ).rejects.toThrow('HTTP 404: Not Found');
      });

      it('should handle 500 errors properly', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 500,
          statusText: 'Internal Server Error',
          text: async () => 'Server Error',
        } as Response);

        await expect(
          client.getCharacter('cain', 'invalid-id')
        ).rejects.toThrow('HTTP 500: Internal Server Error');
      });

      it('should handle network errors', async () => {
        mockFetch.mockRejectedValueOnce(new Error('Network connection failed'));

        await expect(
          client.searchCharacter('홍길동')
        ).rejects.toThrow('Network connection failed');
      });
    });

    describe('concurrent requests', () => {
      it('should handle multiple concurrent requests', async () => {
        // Mock multiple responses
        mockFetch
          .mockResolvedValueOnce({
            ok: true,
            json: async () => dfFixtures.characterSearch,
          } as Response)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => dfFixtures.auctionSearch,
          } as Response)
          .mockResolvedValueOnce({
            ok: true,
            json: async () => dfFixtures.itemSearch,
          } as Response);

        const promises = [
          client.searchCharacter('홍길동'),
          client.searchAuction({ itemName: '무기' }),
          client.searchItems({ itemName: '방어구' }),
        ];

        const results = await Promise.all(promises);

        expect(results).toHaveLength(3);
        expect(results[0]).toEqual(dfFixtures.characterSearch);
        expect(results[1]).toEqual(dfFixtures.auctionSearch);
        expect(results[2]).toEqual(dfFixtures.itemSearch);
        expect(mockFetch).toHaveBeenCalledTimes(3);
      });
    });
  });

  describe('NeopleCyphersClient Integration', () => {
    let client: NeopleCyphersClient;

    beforeEach(() => {
      client = new NeopleCyphersClient(testApiKey, new FetchAdapter(), baseUrl);
    });

    describe('successful API responses', () => {
      it('should handle player search end-to-end', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => cyphersFixtures.playerSearch,
        } as Response);

        const result = await client.searchPlayer('테스트플레이어', {
          wordType: 'match',
          limit: 20,
        });

        expect(result).toEqual(cyphersFixtures.playerSearch);
        
        const calledUrl = mockFetch.mock.calls[0][0] as string;
        expect(calledUrl).toContain(`${baseUrl}/cy/players`);
        expect(calledUrl).toContain('nickname=%ED%85%8C%EC%8A%A4%ED%8A%B8%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4');
        expect(calledUrl).toContain('wordType=match');
        expect(calledUrl).toContain('limit=20');
        expect(calledUrl).toContain(`apikey=${testApiKey}`);
      });

      it('should handle ranking requests end-to-end', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => cyphersFixtures.overallRanking,
        } as Response);

        const result = await client.getOverallRanking({
          playerId: 'player-123',
          limit: 50,
        });

        expect(result).toEqual(cyphersFixtures.overallRanking);
        
        const calledUrl = mockFetch.mock.calls[0][0] as string;
        expect(calledUrl).toContain(`${baseUrl}/cy/ranking/ratingpoint`);
        expect(calledUrl).toContain('playerId=player-123');
        expect(calledUrl).toContain('limit=50');
        expect(calledUrl).toContain(`apikey=${testApiKey}`);
      });
    });

    describe('error handling', () => {
      it('should handle cyphers API errors properly', async () => {
        mockFetch.mockResolvedValueOnce({
          ok: false,
          status: 403,
          statusText: 'Forbidden',
          text: async () => '{"error": "API quota exceeded"}',
        } as Response);

        await expect(
          client.searchPlayer('테스트')
        ).rejects.toThrow('HTTP 403: Forbidden');
      });
    });
  });

  describe('cross-client behavior', () => {
    it('should handle different API keys for different clients', async () => {
      const dfClient = new NeopleDFClient('df-key', new FetchAdapter(), baseUrl);
      const cyphersClient = new NeopleCyphersClient('cyphers-key', new FetchAdapter(), baseUrl);

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => dfFixtures.characterSearch,
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => cyphersFixtures.playerSearch,
        } as Response);

      await Promise.all([
        dfClient.searchCharacter('홍길동'),
        cyphersClient.searchPlayer('테스트'),
      ]);

      const dfUrl = mockFetch.mock.calls[0][0] as string;
      const cyphersUrl = mockFetch.mock.calls[1][0] as string;

      expect(dfUrl).toContain('apikey=df-key');
      expect(cyphersUrl).toContain('apikey=cyphers-key');
    });
  });

  describe('timeout handling', () => {
    it('should handle timeout errors', async () => {
      const timeoutError = new Error('The operation was aborted');
      timeoutError.name = 'AbortError';
      mockFetch.mockRejectedValueOnce(timeoutError);

      const client = new NeopleDFClient(testApiKey, new FetchAdapter());

      await expect(
        client.searchCharacter('홍길동')
      ).rejects.toThrow('Request timeout: The request took too long to complete.');
    });
  });
});