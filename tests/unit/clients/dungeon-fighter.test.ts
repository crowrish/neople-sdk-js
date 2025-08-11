import { DungeonFighterClient } from '../../../src/clients/dungeon-fighter';
import { MockHttpAdapter } from '../../helpers/mock-adapters';
import dfFixtures from '../../fixtures/df-responses.json';

describe('DungeonFighterClient', () => {
  let client: DungeonFighterClient;
  let mockAdapter: MockHttpAdapter;
  const testApiKey = 'test-api-key';
  const baseUrl = 'https://api.neople.co.kr';

  beforeEach(() => {
    mockAdapter = new MockHttpAdapter();
    client = new DungeonFighterClient(testApiKey, mockAdapter, baseUrl);
  });

  afterEach(() => {
    mockAdapter.reset();
  });

  describe('character methods', () => {
    describe('searchCharacter', () => {
      it('should search characters with correct parameters', async () => {
        mockAdapter.setMockResponse(dfFixtures.characterSearch);
        
        const result = await client.searchCharacter('홍길동', 'cain');
        
        expect(result).toEqual(dfFixtures.characterSearch);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters`);
        expect(lastCall.config?.params).toEqual({
          characterName: '홍길동',
          apikey: testApiKey,
        });
      });

      it('should use default serverId when not provided', async () => {
        mockAdapter.setMockResponse(dfFixtures.characterSearch);
        
        await client.searchCharacter('홍길동');
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/all/characters`);
        expect(lastCall.config?.params).toEqual({
          characterName: '홍길동',
          apikey: testApiKey,
        });
      });
    });

    describe('getCharacter', () => {
      it('should get character details with correct parameters', async () => {
        mockAdapter.setMockResponse(dfFixtures.characterDetail);
        
        const result = await client.getCharacter('cain', 'character-123');
        
        expect(result).toEqual(dfFixtures.characterDetail);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters/character-123`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getCharacterEquipment', () => {
      it('should get character equipment with correct parameters', async () => {
        mockAdapter.setMockResponse(dfFixtures.characterEquipment);
        
        const result = await client.getCharacterEquipment('cain', 'character-123');
        
        expect(result).toEqual(dfFixtures.characterEquipment);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters/character-123/equip/equipment`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getCharacterStatus', () => {
      it('should get character status with correct parameters', async () => {
        const mockResponse = { ...dfFixtures.characterDetail, stat: [] };
        mockAdapter.setMockResponse(mockResponse);
        
        const result = await client.getCharacterStatus('cain', 'character-123');
        
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters/character-123/status`);
      });
    });
  });

  describe('auction methods', () => {
    describe('searchAuction', () => {
      it('should search auction with correct parameters', async () => {
        mockAdapter.setMockResponse(dfFixtures.auctionSearch);
        
        const params = {
          itemName: '해방무기',
          minPrice: 1000000,
          maxPrice: 5000000,
          limit: 50,
        };
        
        const result = await client.searchAuction(params);
        
        expect(result).toEqual(dfFixtures.auctionSearch);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/auction`);
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });

      it('should handle empty parameters', async () => {
        mockAdapter.setMockResponse(dfFixtures.auctionSearch);
        
        await client.searchAuction({});
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });
  });

  describe('item methods', () => {
    describe('searchItems', () => {
      it('should search items with correct parameters', async () => {
        mockAdapter.setMockResponse(dfFixtures.itemSearch);
        
        const params = {
          itemName: '해방무기',
          wordType: 'match' as const,
          limit: 20,
        };
        
        const result = await client.searchItems(params);
        
        expect(result).toEqual(dfFixtures.itemSearch);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/items`);
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });
    });

    describe('getItem', () => {
      it('should get item details with correct parameters', async () => {
        mockAdapter.setMockResponse(dfFixtures.itemDetail);
        
        const result = await client.getItem('item-123');
        
        expect(result).toEqual(dfFixtures.itemDetail);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/items/item-123`);
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
        client.searchCharacter('홍길동')
      ).rejects.toThrow('Network error');
    });
  });

  describe('API key handling', () => {
    it('should include API key in all requests', async () => {
      mockAdapter.setMockResponse({});
      
      await client.searchCharacter('홍길동');
      await client.getCharacter('cain', 'char-123');
      await client.searchAuction({ itemName: '무기' });
      await client.getItem('item-123');
      
      mockAdapter.calls.forEach(call => {
        expect(call.config?.params?.apikey).toBe(testApiKey);
      });
    });
  });
});