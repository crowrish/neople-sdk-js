import { CyphersClient } from '../../../src/clients/cyphers';
import { MockHttpAdapter } from '../../helpers/mock-adapters';
import cyphersFixtures from '../../fixtures/cyphers-responses.json';

describe('CyphersClient', () => {
  let client: CyphersClient;
  let mockAdapter: MockHttpAdapter;
  const testApiKey = 'test-api-key';
  const baseUrl = 'https://api.neople.co.kr';

  beforeEach(() => {
    mockAdapter = new MockHttpAdapter();
    client = new CyphersClient(testApiKey, mockAdapter, baseUrl);
  });

  afterEach(() => {
    mockAdapter.reset();
  });

  describe('player methods', () => {
    describe('searchPlayer', () => {
      it('should search players with correct parameters', async () => {
        mockAdapter.setMockResponse(cyphersFixtures.playerSearch);
        
        const result = await client.searchPlayer('테스트플레이어', {
          wordType: 'match',
          limit: 20,
        });
        
        expect(result).toEqual(cyphersFixtures.playerSearch);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/players`);
        expect(lastCall.config?.params).toEqual({
          nickname: '테스트플레이어',
          wordType: 'match',
          limit: 20,
          apikey: testApiKey,
        });
      });

      it('should handle search without optional parameters', async () => {
        mockAdapter.setMockResponse(cyphersFixtures.playerSearch);
        
        await client.searchPlayer('테스트플레이어');
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.config?.params).toEqual({
          nickname: '테스트플레이어',
          apikey: testApiKey,
        });
      });
    });

    describe('getPlayerInfo', () => {
      it('should get player info with correct parameters', async () => {
        mockAdapter.setMockResponse(cyphersFixtures.playerInfo);
        
        const result = await client.getPlayerInfo('player-123');
        
        expect(result).toEqual(cyphersFixtures.playerInfo);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/players/player-123`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getPlayerMatches', () => {
      it('should get player matches with correct parameters', async () => {
        mockAdapter.setMockResponse(cyphersFixtures.playerMatches);
        
        const params = {
          gameTypeId: 'rating' as const,
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          limit: 50,
        };
        
        const result = await client.getPlayerMatches('player-123', params);
        
        expect(result).toEqual(cyphersFixtures.playerMatches);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/players/player-123/matches`);
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });

      it('should handle matches request without parameters', async () => {
        mockAdapter.setMockResponse(cyphersFixtures.playerMatches);
        
        await client.getPlayerMatches('player-123');
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getPlayerEquipment', () => {
      it('should get player equipment with correct parameters', async () => {
        const mockResponse = { playerId: 'player-123', equipment: [] };
        mockAdapter.setMockResponse(mockResponse);
        
        const result = await client.getPlayerEquipment('player-123');
        
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/players/player-123/battleitems`);
      });
    });
  });

  describe('match methods', () => {
    describe('getMatchDetail', () => {
      it('should get match detail with correct parameters', async () => {
        const mockResponse = { matchId: 'match-123', players: [] };
        mockAdapter.setMockResponse(mockResponse);
        
        const result = await client.getMatchDetail('match-123');
        
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/matches/match-123`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });
  });

  describe('ranking methods', () => {
    describe('getOverallRanking', () => {
      it('should get overall ranking with correct parameters', async () => {
        mockAdapter.setMockResponse(cyphersFixtures.overallRanking);
        
        const params = {
          playerId: 'player-123',
          offset: 100,
          limit: 50,
        };
        
        const result = await client.getOverallRanking(params);
        
        expect(result).toEqual(cyphersFixtures.overallRanking);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/ranking/ratingpoint`);
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });

      it('should handle ranking request without parameters', async () => {
        mockAdapter.setMockResponse(cyphersFixtures.overallRanking);
        
        await client.getOverallRanking();
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getCharacterRanking', () => {
      it('should get character ranking with correct parameters', async () => {
        mockAdapter.setMockResponse(cyphersFixtures.overallRanking);
        
        const params = {
          playerId: 'player-123',
          offset: 50,
          limit: 25,
        };
        
        const result = await client.getCharacterRanking('character-123', 'winRate', params);
        
        expect(result).toEqual(cyphersFixtures.overallRanking);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/ranking/characters/character-123/winRate`);
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });

      it('should handle all ranking types', async () => {
        const rankingTypes = ['winCount', 'winRate', 'killCount', 'assistCount', 'exp'] as const;
        mockAdapter.setMockResponse(cyphersFixtures.overallRanking);
        
        for (const rankingType of rankingTypes) {
          await client.getCharacterRanking('character-123', rankingType);
          
          const lastCall = mockAdapter.getLastCall();
          expect(lastCall.url).toBe(`${baseUrl}/cy/ranking/characters/character-123/${rankingType}`);
        }
      });
    });
  });

  describe('item and character methods', () => {
    describe('searchItems', () => {
      it('should search items with correct parameters', async () => {
        mockAdapter.setMockResponse(cyphersFixtures.itemSearch);
        
        const params = {
          itemName: '테스트아이템',
          wordType: 'match' as const,
          characterId: 'character-123',
          slotCode: 'weapon',
          limit: 30,
        };
        
        const result = await client.searchItems(params);
        
        expect(result).toEqual(cyphersFixtures.itemSearch);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/battleitems`);
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });
    });

    describe('getCyphersInfo', () => {
      it('should get cyphers info with correct parameters', async () => {
        mockAdapter.setMockResponse(cyphersFixtures.cyphersInfo);
        
        const params = {
          characterId: 'character-123',
          wordType: 'full' as const,
          limit: 15,
        };
        
        const result = await client.getCyphersInfo(params);
        
        expect(result).toEqual(cyphersFixtures.cyphersInfo);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/characters`);
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });

      it('should handle cyphers info request without parameters', async () => {
        mockAdapter.setMockResponse(cyphersFixtures.cyphersInfo);
        
        await client.getCyphersInfo();
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getRecommendItems', () => {
      it('should get recommend items with correct parameters', async () => {
        const mockResponse = { characterId: 'character-123', items: [] };
        mockAdapter.setMockResponse(mockResponse);
        
        const result = await client.getRecommendItems('character-123');
        
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/characters/character-123/items`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });
  });

  describe('error handling', () => {
    it('should propagate adapter errors', async () => {
      const testError = new Error('Network error');
      mockAdapter.setMockError(testError);
      
      await expect(
        client.searchPlayer('테스트')
      ).rejects.toThrow('Network error');
    });
  });

  describe('new API methods', () => {
    describe('getTsjRanking', () => {
      it('should get TSJ melee ranking', async () => {
        const mockRanking = { rows: [{ rank: 1, nickname: '테스트' }] };
        mockAdapter.setMockResponse(mockRanking);
        
        const result = await client.getTsjRanking('melee');
        
        expect(result).toEqual(mockRanking);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/ranking/tsj/melee`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });

      it('should get TSJ ranged ranking with parameters', async () => {
        const mockRanking = { rows: [{ rank: 1, nickname: '테스트' }] };
        mockAdapter.setMockResponse(mockRanking);
        
        const params = { limit: 10 };
        const result = await client.getTsjRanking('ranged', params);
        
        expect(result).toEqual(mockRanking);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/ranking/tsj/ranged`);
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });
    });

    describe('getItemDetail', () => {
      it('should get item detail', async () => {
        const mockItem = { itemId: 'item-123', itemName: '테스트 아이템' };
        mockAdapter.setMockResponse(mockItem);
        
        const result = await client.getItemDetail('item-123');
        
        expect(result).toEqual(mockItem);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/battleitems/item-123`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getMultiItems', () => {
      it('should get multiple items', async () => {
        const mockItems = { rows: [{ itemId: 'item-1' }, { itemId: 'item-2' }] };
        mockAdapter.setMockResponse(mockItems);
        
        const result = await client.getMultiItems('item-1,item-2');
        
        expect(result).toEqual(mockItems);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/cy/multi/battleitems`);
        expect(lastCall.config?.params).toEqual({
          itemIds: 'item-1,item-2',
          apikey: testApiKey,
        });
      });
    });
  });

  describe('API key handling', () => {
    it('should include API key in all requests', async () => {
      mockAdapter.setMockResponse({});
      
      await client.searchPlayer('테스트');
      await client.getPlayerInfo('player-123');
      await client.getOverallRanking();
      await client.getCyphersInfo();
      await client.getTsjRanking('melee');
      await client.getItemDetail('item-123');
      
      mockAdapter.calls.forEach(call => {
        expect(call.config?.params?.apikey).toBe(testApiKey);
      });
    });
  });
});