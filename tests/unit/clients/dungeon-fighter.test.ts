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

      it('should pass optional parameters', async () => {
        mockAdapter.setMockResponse(dfFixtures.characterSearch);
        
        const params = {
          jobId: 'job-123',
          wordType: 'match' as const,
          limit: 20
        };
        
        await client.searchCharacter('홍길동', 'cain', params);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.config?.params).toEqual({
          characterName: '홍길동',
          ...params,
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

      it('should pass comprehensive parameters', async () => {
        mockAdapter.setMockResponse(dfFixtures.auctionSearch);
        
        const params = {
          itemName: '해방무기',
          wordType: 'front' as const,
          minLevel: 100,
          maxLevel: 110,
          minReinforce: 10,
          maxReinforce: 15,
          rarity: '에픽',
          minPrice: 1000000,
          maxPrice: 5000000,
          limit: 50,
        };
        
        await client.searchAuction(params);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.config?.params).toEqual({
          ...params,
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

      it('should pass comprehensive search parameters', async () => {
        mockAdapter.setMockResponse(dfFixtures.itemSearch);
        
        const params = {
          itemName: '무기',
          hashtag: '전설',
          wordType: 'front' as const,
          minLevel: 90,
          maxLevel: 100,
          rarity: '에픽',
          limit: 30,
        };
        
        await client.searchItems(params);
        
        const lastCall = mockAdapter.getLastCall();
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

  describe('new API methods', () => {
    describe('getServers', () => {
      it('should get servers list', async () => {
        const mockServers = { rows: [{ serverId: 'cain', serverName: '카인' }] };
        mockAdapter.setMockResponse(mockServers);
        
        const result = await client.getServers();
        
        expect(result).toEqual(mockServers);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getJobs', () => {
      it('should get jobs list', async () => {
        const mockJobs = { rows: [{ jobId: 'job-1', jobName: '귀검사(남)' }] };
        mockAdapter.setMockResponse(mockJobs);
        
        const result = await client.getJobs();
        
        expect(result).toEqual(mockJobs);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/jobs`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getCharacterAvatar', () => {
      it('should get character avatar equipment', async () => {
        const mockAvatar = { serverId: 'cain', characterId: 'char-123', avatar: [] };
        mockAdapter.setMockResponse(mockAvatar);
        
        const result = await client.getCharacterAvatar('cain', 'char-123');
        
        expect(result).toEqual(mockAvatar);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters/char-123/equip/avatar`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getCharacterTimeline', () => {
      it('should get character timeline', async () => {
        const mockTimeline = { serverId: 'cain', characterId: 'char-123', timeline: { rows: [] } };
        mockAdapter.setMockResponse(mockTimeline);
        
        const result = await client.getCharacterTimeline('cain', 'char-123');
        
        expect(result).toEqual(mockTimeline);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters/char-123/timeline`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });

      it('should pass timeline parameters', async () => {
        const mockTimeline = { serverId: 'cain', characterId: 'char-123', timeline: { rows: [] } };
        mockAdapter.setMockResponse(mockTimeline);
        
        const params = { limit: 10 };
        await client.getCharacterTimeline('cain', 'char-123', params);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });
    });

    describe('getSetItem', () => {
      it('should get set item details', async () => {
        const mockSetItem = { setItemId: 'set-123', setItemName: '테스트 세트' };
        mockAdapter.setMockResponse(mockSetItem);
        
        const result = await client.getSetItem('set-123');
        
        expect(result).toEqual(mockSetItem);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/setitems/set-123`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getAuctionSold', () => {
      it('should get auction sold items', async () => {
        const mockAuctionSold = { rows: [] };
        mockAdapter.setMockResponse(mockAuctionSold);
        
        const params = { itemName: '무기' };
        const result = await client.getAuctionSold(params);
        
        expect(result).toEqual(mockAuctionSold);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/auction-sold`);
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });
    });

    describe('getCharacterTalisman', () => {
      it('should get character talisman equipment', async () => {
        const mockTalisman = { serverId: 'cain', characterId: 'char-123', talisman: [] };
        mockAdapter.setMockResponse(mockTalisman);
        
        const result = await client.getCharacterTalisman('cain', 'char-123');
        
        expect(result).toEqual(mockTalisman);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters/char-123/equip/talisman`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getCharacterSkillStyle', () => {
      it('should get character skill style', async () => {
        const mockSkillStyle = { serverId: 'cain', characterId: 'char-123', skill: {} };
        mockAdapter.setMockResponse(mockSkillStyle);
        
        const result = await client.getCharacterSkillStyle('cain', 'char-123');
        
        expect(result).toEqual(mockSkillStyle);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters/char-123/skill/style`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getSkillsByJob', () => {
      it('should get skills by job', async () => {
        const mockSkills = { skills: [{ skillId: 'skill-1', name: '테스트 스킬' }] };
        mockAdapter.setMockResponse(mockSkills);
        
        const result = await client.getSkillsByJob('job-123');
        
        expect(result).toEqual(mockSkills);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/skills/job-123`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });

      it('should pass jobGrowId parameter', async () => {
        const mockSkills = { skills: [] };
        mockAdapter.setMockResponse(mockSkills);
        
        await client.getSkillsByJob('job-123', 'grow-456');
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.config?.params).toEqual({
          jobGrowId: 'grow-456',
          apikey: testApiKey,
        });
      });
    });

    describe('getSkillDetail', () => {
      it('should get skill detail', async () => {
        const mockSkill = { skillId: 'skill-123', name: '테스트 스킬', levelInfo: {} };
        mockAdapter.setMockResponse(mockSkill);
        
        const result = await client.getSkillDetail('job-123', 'skill-123');
        
        expect(result).toEqual(mockSkill);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/skills/job-123/skill-123`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getMultiSkills', () => {
      it('should get multiple skills', async () => {
        const mockSkills = { rows: [{ skillId: 'skill-1' }, { skillId: 'skill-2' }] };
        mockAdapter.setMockResponse(mockSkills);
        
        const result = await client.getMultiSkills('job-123', 'skill-1,skill-2');
        
        expect(result).toEqual(mockSkills);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/multi/skills/job-123`);
        expect(lastCall.config?.params).toEqual({
          skillIds: 'skill-1,skill-2',
          apikey: testApiKey,
        });
      });
    });

    describe('getAvatarMarketHashtags', () => {
      it('should get avatar market hashtags', async () => {
        const mockHashtags = { rows: ['SF', '강인한', '귀여움'] };
        mockAdapter.setMockResponse(mockHashtags);
        
        const result = await client.getAvatarMarketHashtags();
        
        expect(result).toEqual(mockHashtags);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/avatar-market/hashtag`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getItemHashtags', () => {
      it('should get item hashtags', async () => {
        const mockHashtags = { rows: ['불가침 무기 업그레이드', '고정 옵션'] };
        mockAdapter.setMockResponse(mockHashtags);
        
        const result = await client.getItemHashtags();
        
        expect(result).toEqual(mockHashtags);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/item-hashtag`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getItemShop', () => {
      it('should get item shop info', async () => {
        const mockShop = { itemId: 'item-123', shop: [] };
        mockAdapter.setMockResponse(mockShop);
        
        const result = await client.getItemShop('item-123');
        
        expect(result).toEqual(mockShop);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/items/item-123/shop`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });

    describe('getAuctionItem', () => {
      it('should get auction item detail', async () => {
        const mockAuction = { auctionNo: 'auction-123', item: {} };
        mockAdapter.setMockResponse(mockAuction);
        
        const result = await client.getAuctionItem('auction-123');
        
        expect(result).toEqual(mockAuction);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/auction/auction-123`);
        expect(lastCall.config?.params).toEqual({
          apikey: testApiKey,
        });
      });
    });
  });

  describe('missing method coverage', () => {
    describe('getCharacterCreature', () => {
      it('should get character creature equipment', async () => {
        const mockCreature = { characterId: 'char-123', creature: {} };
        mockAdapter.setMockResponse(mockCreature);
        
        const result = await client.getCharacterCreature('cain', 'char-123');
        
        expect(result).toEqual(mockCreature);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters/char-123/equip/creature`);
      });
    });

    describe('getCharacterFlag', () => {
      it('should get character flag equipment', async () => {
        const mockFlag = { characterId: 'char-123', flag: {} };
        mockAdapter.setMockResponse(mockFlag);
        
        const result = await client.getCharacterFlag('cain', 'char-123');
        
        expect(result).toEqual(mockFlag);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters/char-123/equip/flag`);
      });
    });

    describe('searchSetItems', () => {
      it('should search set items', async () => {
        const mockSetItems = { rows: [] };
        mockAdapter.setMockResponse(mockSetItems);
        
        const params = { setItemName: '용의 세트', wordType: 'match' as const };
        const result = await client.searchSetItems(params);
        
        expect(result).toEqual(mockSetItems);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/setitems`);
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });
    });

    describe('getMultiItems', () => {
      it('should get multiple items', async () => {
        const mockMultiItems = { rows: [] };
        mockAdapter.setMockResponse(mockMultiItems);
        
        const result = await client.getMultiItems('item1,item2,item3');
        
        expect(result).toEqual(mockMultiItems);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/multi/items`);
        expect(lastCall.config?.params).toEqual({
          itemIds: 'item1,item2,item3',
          apikey: testApiKey,
        });
      });
    });

    describe('getMultiSetItems', () => {
      it('should get multiple set items', async () => {
        const mockMultiSetItems = { rows: [] };
        mockAdapter.setMockResponse(mockMultiSetItems);
        
        const result = await client.getMultiSetItems('set1,set2,set3');
        
        expect(result).toEqual(mockMultiSetItems);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/multi/setitems`);
        expect(lastCall.config?.params).toEqual({
          setItemIds: 'set1,set2,set3',
          apikey: testApiKey,
        });
      });
    });

    describe('getCharactersByFame', () => {
      it('should get characters by fame', async () => {
        const mockCharactersByFame = { rows: [] };
        mockAdapter.setMockResponse(mockCharactersByFame);
        
        const result = await client.getCharactersByFame('cain');
        
        expect(result).toEqual(mockCharactersByFame);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters-fame`);
      });
    });

    describe('getAvatarMarketSale', () => {
      it('should get avatar market sale items', async () => {
        const mockSaleItems = { rows: [] };
        mockAdapter.setMockResponse(mockSaleItems);
        
        const params = { limit: 20, jobId: 'job-123' };
        const result = await client.getAvatarMarketSale(params);
        
        expect(result).toEqual(mockSaleItems);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/avatar-market/sale`);
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });
    });

    describe('getAvatarMarketSold', () => {
      it('should get avatar market sold items', async () => {
        const mockSoldItems = { rows: [] };
        mockAdapter.setMockResponse(mockSoldItems);
        
        const params = { limit: 15, jobId: 'job-123' };
        const result = await client.getAvatarMarketSold(params);
        
        expect(result).toEqual(mockSoldItems);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/avatar-market/sold`);
        expect(lastCall.config?.params).toEqual({
          ...params,
          apikey: testApiKey,
        });
      });
    });

    describe('getAvatarMarketItem', () => {
      it('should get avatar market item detail', async () => {
        const mockMarketItem = { goodsNo: 12345 };
        mockAdapter.setMockResponse(mockMarketItem);
        
        const result = await client.getAvatarMarketItem(12345);
        
        expect(result).toEqual(mockMarketItem);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/avatar-market/sale/12345`);
      });
    });

    describe('getAvatarMarketSoldItem', () => {
      it('should get avatar market sold item detail', async () => {
        const mockSoldItem = { goodsNo: 54321 };
        mockAdapter.setMockResponse(mockSoldItem);
        
        const result = await client.getAvatarMarketSoldItem(54321);
        
        expect(result).toEqual(mockSoldItem);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/avatar-market/sold/54321`);
      });
    });

    describe('getCharacterBuffSkillEquipment', () => {
      it('should get character buff skill equipment', async () => {
        const mockBuffEquipment = { characterId: 'char-123', skill: {} };
        mockAdapter.setMockResponse(mockBuffEquipment);
        
        const result = await client.getCharacterBuffSkillEquipment('cain', 'char-123');
        
        expect(result).toEqual(mockBuffEquipment);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters/char-123/skill/buff/equip/equipment`);
      });
    });

    describe('getCharacterBuffSkillAvatar', () => {
      it('should get character buff skill avatar', async () => {
        const mockBuffAvatar = { characterId: 'char-123', skill: {} };
        mockAdapter.setMockResponse(mockBuffAvatar);
        
        const result = await client.getCharacterBuffSkillAvatar('cain', 'char-123');
        
        expect(result).toEqual(mockBuffAvatar);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters/char-123/skill/buff/equip/avatar`);
      });
    });

    describe('getCharacterBuffSkillCreature', () => {
      it('should get character buff skill creature', async () => {
        const mockBuffCreature = { characterId: 'char-123', skill: {} };
        mockAdapter.setMockResponse(mockBuffCreature);
        
        const result = await client.getCharacterBuffSkillCreature('cain', 'char-123');
        
        expect(result).toEqual(mockBuffCreature);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toBe(`${baseUrl}/df/servers/cain/characters/char-123/skill/buff/equip/creature`);
      });
    });
  });

  describe('API key handling', () => {
    it('should include API key in all requests', async () => {
      mockAdapter.setMockResponse({});
      
      await client.searchCharacter('홍길동');
      await client.getCharacter('cain', 'char-123');
      await client.searchAuction({ itemName: '무기' });
      await client.getItem('item-123');
      await client.getServers();
      await client.getJobs();
      await client.getCharacterSkillStyle('cain', 'char-123');
      await client.getSkillsByJob('job-123');
      await client.getAvatarMarketHashtags();
      await client.getItemHashtags();
      
      mockAdapter.calls.forEach(call => {
        expect(call.config?.params?.apikey).toBe(testApiKey);
      });
    });
  });
});