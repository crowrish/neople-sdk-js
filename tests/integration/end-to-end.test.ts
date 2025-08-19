/**
 * End-to-end integration tests
 * These tests verify the complete functionality across all components
 */

import { NeopleDFClient, NeopleCyphersClient } from '../../src';
import { NeopleDFUrlBuilder, NeopleCyphersUrlBuilder } from '../../src/url-builders';
import { FetchAdapter } from '../../src/adapters/fetch-adapter';
import { NeopleApiError } from '../../src/core/error';

// Mock fetch for testing
global.fetch = jest.fn();
const mockFetch = global.fetch as jest.MockedFunction<typeof fetch>;

describe('End-to-End Integration Tests', () => {
  const testApiKey = 'test-e2e-key';


  describe('Client and URL Builder consistency', () => {
    it('should generate the same URLs between client and URL builder for DF', async () => {
      const client = new NeopleDFClient(testApiKey);
      const urlBuilder = new NeopleDFUrlBuilder(testApiKey);

      // Mock a successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ rows: [] }),
      } as Response);

      // Make a request with the client
      await client.searchCharacter('홍길동', 'cain');

      // Get the URL that was actually called
      const actualUrl = mockFetch.mock.calls[0][0] as string;

      // Generate the same URL with URL builder
      const expectedUrl = urlBuilder.searchCharacter('홍길동', 'cain');

      expect(actualUrl).toBe(expectedUrl);
    });

    it('should generate the same URLs between client and URL builder for Cyphers', async () => {
      const client = new NeopleCyphersClient(testApiKey);
      const urlBuilder = new NeopleCyphersUrlBuilder(testApiKey);

      // Mock a successful response
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ rows: [] }),
      } as Response);

      // Make a request with the client
      await client.searchPlayer('테스트플레이어', { wordType: 'match', limit: 10 });

      // Get the URL that was actually called
      const actualUrl = mockFetch.mock.calls[0][0] as string;

      // Generate the same URL with URL builder
      const expectedUrl = urlBuilder.searchPlayer('테스트플레이어', { wordType: 'match', limit: 10 });

      expect(actualUrl).toBe(expectedUrl);
    });
  });

  describe('Error handling consistency', () => {
    it('should handle errors consistently across all adapters', async () => {
      const clients = [
        new NeopleDFClient(testApiKey, new FetchAdapter()),
      ];

      // Mock error response
      mockFetch.mockResolvedValue({
        ok: false,
        status: 404,
        statusText: 'Not Found',
        text: async () => 'Character not found',
      } as Response);

      for (const client of clients) {
        await expect(
          client.searchCharacter('NonExistent')
        ).rejects.toThrow(NeopleApiError);

        try {
          await client.searchCharacter('NonExistent');
        } catch (error) {
          expect(error).toBeInstanceOf(NeopleApiError);
          expect((error as NeopleApiError).status).toBe(404);
          expect((error as NeopleApiError).message).toBe('HTTP 404: Not Found');
        }
      }
    });
  });

  describe('Parameter encoding consistency', () => {
    it('should handle Korean characters consistently', async () => {
      const client = new NeopleDFClient(testApiKey);
      const urlBuilder = new NeopleDFUrlBuilder(testApiKey);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ rows: [] }),
      } as Response);

      const koreanName = '한글이름테스트';
      await client.searchCharacter(koreanName);

      const actualUrl = mockFetch.mock.calls[0][0] as string;
      const expectedUrl = urlBuilder.searchCharacter(koreanName);

      expect(actualUrl).toBe(expectedUrl);

      // Both should properly encode Korean characters
      expect(actualUrl).toContain(encodeURIComponent(koreanName));
    });

    it('should handle special characters consistently', async () => {
      const client = new NeopleDFClient(testApiKey);
      const urlBuilder = new NeopleDFUrlBuilder(testApiKey);

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => ({ rows: [] }),
      } as Response);

      const specialName = 'test@#$%^&*()name';
      await client.searchCharacter(specialName);

      const actualUrl = mockFetch.mock.calls[0][0] as string;
      const expectedUrl = urlBuilder.searchCharacter(specialName);

      expect(actualUrl).toBe(expectedUrl);
    });
  });

  describe('Complex workflow scenarios', () => {
    it('should handle complete DF character lookup workflow', async () => {
      const client = new NeopleDFClient(testApiKey);

      // Mock responses for the workflow
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            rows: [{
              characterId: 'char-123',
              characterName: '홍길동',
              level: 110,
            }]
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            characterId: 'char-123',
            characterName: '홍길동',
            level: 110,
            jobName: '마법사',
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            characterId: 'char-123',
            equipment: [
              { slotName: '무기', itemName: '테스트 무기' }
            ],
          }),
        } as Response);

      // 1. Search for character
      const searchResult = await client.searchCharacter('홍길동');
      expect(searchResult.rows).toHaveLength(1);

      const character = searchResult.rows[0];
      
      // 2. Get character details
      const characterDetail = await client.getCharacter('cain', character.characterId);
      expect(characterDetail.characterName).toBe('홍길동');

      // 3. Get character equipment
      const equipment = await client.getCharacterEquipment('cain', character.characterId);
      expect(equipment.equipment).toHaveLength(1);

      // Verify all three requests were made
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it('should handle complete Cyphers player lookup workflow', async () => {
      const client = new NeopleCyphersClient(testApiKey);

      // Mock responses for the workflow
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            rows: [{
              playerId: 'player-123',
              nickname: '테스트플레이어',
              grade: 20,
            }]
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            playerId: 'player-123',
            nickname: '테스트플레이어',
            grade: 20,
            clanName: '테스트클랜',
          }),
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            matches: [
              { matchId: 'match-123', result: 'win' }
            ],
          }),
        } as Response);

      // 1. Search for player
      const searchResult = await client.searchPlayer('테스트플레이어');
      expect(searchResult.rows).toHaveLength(1);

      const player = searchResult.rows[0];
      
      // 2. Get player details
      const playerDetail = await client.getPlayerInfo(player.playerId);
      expect(playerDetail.nickname).toBe('테스트플레이어');

      // 3. Get player matches
      const matches = await client.getPlayerMatches(player.playerId, { limit: 10 });
      expect(matches.matches).toHaveLength(1);

      // Verify all three requests were made
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });
  });

  describe('Performance and reliability', () => {
    it('should handle rapid sequential requests', async () => {
      const client = new NeopleDFClient(testApiKey);

      // Mock successful responses
      for (let i = 0; i < 10; i++) {
        mockFetch.mockResolvedValueOnce({
          ok: true,
          json: async () => ({ rows: [{ characterId: `char-${i}` }] }),
        } as Response);
      }

      const promises = Array.from({ length: 10 }, (_, i) =>
        client.searchCharacter(`character-${i}`)
      );

      const results = await Promise.all(promises);

      expect(results).toHaveLength(10);
      expect(mockFetch).toHaveBeenCalledTimes(10);

      // Each result should be unique
      results.forEach((result, index) => {
        expect(result.rows[0].characterId).toBe(`char-${index}`);
      });
    });

    it('should handle mixed success and error responses', async () => {
      const client = new NeopleDFClient(testApiKey);

      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ rows: [{ characterId: 'success-1' }] }),
        } as Response)
        .mockResolvedValueOnce({
          ok: false,
          status: 404,
          statusText: 'Not Found',
          text: async () => 'Not found',
        } as Response)
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({ rows: [{ characterId: 'success-2' }] }),
        } as Response);

      // First request should succeed
      const result1 = await client.searchCharacter('existing-char');
      expect(result1.rows[0].characterId).toBe('success-1');

      // Second request should fail
      await expect(
        client.searchCharacter('non-existent-char')
      ).rejects.toThrow(NeopleApiError);

      // Third request should succeed
      const result3 = await client.searchCharacter('another-char');
      expect(result3.rows[0].characterId).toBe('success-2');
    });
  });
});