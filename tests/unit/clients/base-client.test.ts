import { NeopleDFClient, NeopleCyphersClient } from '../../../src/clients/base-client';
import { MockHttpAdapter } from '../../helpers/mock-adapters';

describe('Base Clients', () => {
  let mockAdapter: MockHttpAdapter;
  const testApiKey = 'test-api-key';

  beforeEach(() => {
    mockAdapter = new MockHttpAdapter();
  });

  afterEach(() => {
    mockAdapter.reset();
  });

  describe('NeopleDFClient', () => {
    let client: NeopleDFClient;

    beforeEach(() => {
      client = new NeopleDFClient(testApiKey, mockAdapter);
    });

    describe('wrapper methods', () => {
      it('should delegate searchCharacter to dungeon fighter client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        const result = await client.searchCharacter('홍길동', 'cain');
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/df/servers/cain/characters');
      });

      it('should delegate getCharacter to dungeon fighter client', async () => {
        const mockResponse = { characterId: 'char-123' };
        mockAdapter.setMockResponse(mockResponse);

        const result = await client.getCharacter('cain', 'char-123');
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/df/servers/cain/characters/char-123');
      });

      it('should delegate getCharacterEquipment to dungeon fighter client', async () => {
        const mockResponse = { equipment: [] };
        mockAdapter.setMockResponse(mockResponse);

        const result = await client.getCharacterEquipment('cain', 'char-123');
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/equip/equipment');
      });

      it('should delegate getCharacterStatus to dungeon fighter client', async () => {
        const mockResponse = { stat: [] };
        mockAdapter.setMockResponse(mockResponse);

        const result = await client.getCharacterStatus('cain', 'char-123');
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/status');
      });

      it('should delegate searchAuction to dungeon fighter client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        const params = { itemName: '무기', limit: 10 };
        const result = await client.searchAuction(params);
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/df/auction');
      });

      it('should delegate searchItems to dungeon fighter client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        const params = { itemName: '장비', limit: 20 };
        const result = await client.searchItems(params);
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/df/items');
      });

      it('should delegate getItem to dungeon fighter client', async () => {
        const mockResponse = { itemId: 'item-123' };
        mockAdapter.setMockResponse(mockResponse);

        const result = await client.getItem('item-123');
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/df/items/item-123');
      });

      it('should delegate getServers to dungeon fighter client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        const result = await client.getServers();
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/df/servers');
      });

      it('should delegate getJobs to dungeon fighter client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        const result = await client.getJobs();
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/df/jobs');
      });

      it('should delegate character equipment methods to dungeon fighter client', async () => {
        const mockResponse = { equipment: {} };
        mockAdapter.setMockResponse(mockResponse);

        await client.getCharacterAvatar('cain', 'char-123');
        expect(mockAdapter.getLastCall().url).toContain('/equip/avatar');

        await client.getCharacterCreature('cain', 'char-123');
        expect(mockAdapter.getLastCall().url).toContain('/equip/creature');

        await client.getCharacterFlag('cain', 'char-123');
        expect(mockAdapter.getLastCall().url).toContain('/equip/flag');

        await client.getCharacterTalisman('cain', 'char-123');
        expect(mockAdapter.getLastCall().url).toContain('/equip/talisman');
      });

      it('should delegate timeline methods to dungeon fighter client', async () => {
        const mockResponse = { timeline: {} };
        mockAdapter.setMockResponse(mockResponse);

        const params = { limit: 10 };
        const result = await client.getCharacterTimeline('cain', 'char-123', params);
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/timeline');
        expect(lastCall.config?.params?.limit).toBe(10);
      });

      it('should delegate item methods to dungeon fighter client', async () => {
        const mockResponse = { item: {} };
        mockAdapter.setMockResponse(mockResponse);

        await client.getSetItem('set-123');
        expect(mockAdapter.getLastCall().url).toContain('/setitems/set-123');

        await client.searchSetItems({ setItemName: '세트' });
        expect(mockAdapter.getLastCall().url).toContain('/setitems');

        await client.getMultiItems('item1,item2');
        expect(mockAdapter.getLastCall().url).toContain('/multi/items');

        await client.getMultiSetItems('set1,set2');
        expect(mockAdapter.getLastCall().url).toContain('/multi/setitems');
      });

      it('should delegate auction methods to dungeon fighter client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        await client.getCharactersByFame('cain');
        expect(mockAdapter.getLastCall().url).toContain('/characters-fame');

        await client.getAuctionSold({ itemName: '무기' });
        expect(mockAdapter.getLastCall().url).toContain('/auction-sold');

        await client.getAuctionItem('auction-123');
        expect(mockAdapter.getLastCall().url).toContain('/auction/auction-123');
      });

      it('should delegate avatar market methods to dungeon fighter client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        await client.getAvatarMarketSale({});
        expect(mockAdapter.getLastCall().url).toContain('/avatar-market/sale');

        await client.getAvatarMarketSold({});
        expect(mockAdapter.getLastCall().url).toContain('/avatar-market/sold');

        await client.getAvatarMarketItem(12345);
        expect(mockAdapter.getLastCall().url).toContain('/avatar-market/sale/12345');

        await client.getAvatarMarketSoldItem(54321);
        expect(mockAdapter.getLastCall().url).toContain('/avatar-market/sold/54321');
      });

      it('should delegate skill methods to dungeon fighter client', async () => {
        const mockResponse = { skill: {} };
        mockAdapter.setMockResponse(mockResponse);

        await client.getCharacterSkillStyle('cain', 'char-123');
        expect(mockAdapter.getLastCall().url).toContain('/skill/style');

        await client.getCharacterBuffSkillEquipment('cain', 'char-123');
        expect(mockAdapter.getLastCall().url).toContain('/skill/buff/equip/equipment');

        await client.getCharacterBuffSkillAvatar('cain', 'char-123');
        expect(mockAdapter.getLastCall().url).toContain('/skill/buff/equip/avatar');

        await client.getCharacterBuffSkillCreature('cain', 'char-123');
        expect(mockAdapter.getLastCall().url).toContain('/skill/buff/equip/creature');

        await client.getSkillsByJob('job-123');
        expect(mockAdapter.getLastCall().url).toContain('/skills/job-123');

        await client.getSkillDetail('job-123', 'skill-456');
        expect(mockAdapter.getLastCall().url).toContain('/skills/job-123/skill-456');

        await client.getMultiSkills('job-123', 'skill1,skill2');
        expect(mockAdapter.getLastCall().url).toContain('/multi/skills/job-123');
      });

      it('should delegate shop and hashtag methods to dungeon fighter client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        await client.getItemShop('item-123');
        expect(mockAdapter.getLastCall().url).toContain('/items/item-123/shop');

        await client.getAvatarMarketHashtags();
        expect(mockAdapter.getLastCall().url).toContain('/avatar-market/hashtag');

        await client.getItemHashtags();
        expect(mockAdapter.getLastCall().url).toContain('/item-hashtag');
      });
    });
  });

  describe('NeopleCyphersClient', () => {
    let client: NeopleCyphersClient;

    beforeEach(() => {
      client = new NeopleCyphersClient(testApiKey, mockAdapter);
    });

    describe('wrapper methods', () => {
      it('should delegate searchPlayer to cyphers client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        const result = await client.searchPlayer('닉네임');
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/cy/players');
      });

      it('should delegate getPlayerInfo to cyphers client', async () => {
        const mockResponse = { playerId: 'player-123' };
        mockAdapter.setMockResponse(mockResponse);

        const result = await client.getPlayerInfo('player-123');
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/cy/players/player-123');
      });

      it('should delegate getPlayerMatches to cyphers client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        const params = { gameTypeId: 'normal', limit: 10 };
        const result = await client.getPlayerMatches('player-123', params);
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/cy/players/player-123/matches');
      });

      it('should delegate getMatchDetail to cyphers client', async () => {
        const mockResponse = { matchId: 'match-123' };
        mockAdapter.setMockResponse(mockResponse);

        const result = await client.getMatchDetail('match-123');
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/cy/matches/match-123');
      });

      it('should delegate ranking methods to cyphers client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        await client.getOverallRanking();
        expect(mockAdapter.getLastCall().url).toContain('/cy/ranking/ratingpoint');

        await client.getCharacterRanking('char-123', 'winCount');
        expect(mockAdapter.getLastCall().url).toContain('/cy/ranking/characters/char-123/winCount');

        await client.getTsjRanking('melee');
        expect(mockAdapter.getLastCall().url).toContain('/cy/ranking/tsj/melee');
      });

      it('should delegate item methods to cyphers client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        await client.searchCyphersItems({ itemName: '아이템' });
        expect(mockAdapter.getLastCall().url).toContain('/cy/battleitems');

        await client.getCyphersItemDetail('item-123');
        expect(mockAdapter.getLastCall().url).toContain('/cy/battleitems/item-123');

        await client.getCyphersMultiItems('item1,item2');
        expect(mockAdapter.getLastCall().url).toContain('/cy/multi/battleitems');
      });

      it('should delegate getCyphersInfo to cyphers client', async () => {
        const mockResponse = { rows: [] };
        mockAdapter.setMockResponse(mockResponse);

        const result = await client.getCyphersInfo();
        expect(result).toEqual(mockResponse);
        
        const lastCall = mockAdapter.getLastCall();
        expect(lastCall.url).toContain('/cy/characters');
      });
    });
  });
});