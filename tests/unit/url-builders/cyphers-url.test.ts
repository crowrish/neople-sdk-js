import { NeopleCyphersUrlBuilder } from '../../../src/url-builders/cyphers-url';

describe('NeopleCyphersUrlBuilder', () => {
  let builder: NeopleCyphersUrlBuilder;
  const testApiKey = 'test-api-key-123';
  const baseUrl = 'https://api.neople.co.kr';

  beforeEach(() => {
    builder = new NeopleCyphersUrlBuilder(testApiKey);
  });

  describe('player methods', () => {
    it('should build correct player search URL', () => {
      const url = builder.searchPlayer('테스트플레이어', {
        wordType: 'match',
        limit: 20,
      });
      
      expect(url).toContain(`${baseUrl}/cy/players`);
      expect(url).toContain('nickname=%ED%85%8C%EC%8A%A4%ED%8A%B8%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4');
      expect(url).toContain('wordType=match');
      expect(url).toContain('limit=20');
      expect(url).toContain(`apikey=${testApiKey}`);
    });

    it('should build player search URL without optional params', () => {
      const url = builder.searchPlayer('테스트플레이어');
      
      expect(url).toContain(`${baseUrl}/cy/players`);
      expect(url).toContain('nickname=%ED%85%8C%EC%8A%A4%ED%8A%B8%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B4');
      expect(url).toContain(`apikey=${testApiKey}`);
      expect(url).not.toContain('wordType');
      expect(url).not.toContain('limit');
    });

    it('should build correct player info URL', () => {
      const url = builder.getPlayerInfo('player-123');
      
      expect(url).toBe(
        `${baseUrl}/cy/players/player-123?apikey=${testApiKey}`
      );
    });

    it('should build correct player matches URL', () => {
      const url = builder.getPlayerMatches('player-123', {
        gameTypeId: 'rating',
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        limit: 50,
      });
      
      expect(url).toContain(`${baseUrl}/cy/players/player-123/matches`);
      expect(url).toContain('gameTypeId=rating');
      expect(url).toContain('startDate=2024-01-01');
      expect(url).toContain('endDate=2024-01-31');
      expect(url).toContain('limit=50');
      expect(url).toContain(`apikey=${testApiKey}`);
    });

    it('should build correct player equipment URL', () => {
      const url = builder.getPlayerEquipment('player-123');
      
      expect(url).toBe(
        `${baseUrl}/cy/players/player-123/battleitems?apikey=${testApiKey}`
      );
    });
  });

  describe('match methods', () => {
    it('should build correct match detail URL', () => {
      const url = builder.getMatchDetail('match-123');
      
      expect(url).toBe(
        `${baseUrl}/cy/matches/match-123?apikey=${testApiKey}`
      );
    });
  });

  describe('ranking methods', () => {
    it('should build correct overall ranking URL', () => {
      const url = builder.getOverallRanking({
        playerId: 'player-123',
        offset: 100,
        limit: 50,
      });
      
      expect(url).toContain(`${baseUrl}/cy/ranking/ratingpoint`);
      expect(url).toContain('playerId=player-123');
      expect(url).toContain('offset=100');
      expect(url).toContain('limit=50');
      expect(url).toContain(`apikey=${testApiKey}`);
    });

    it('should build correct character ranking URL', () => {
      const url = builder.getCharacterRanking('character-123', 'winRate', {
        playerId: 'player-123',
        offset: 50,
        limit: 25,
      });
      
      expect(url).toContain(`${baseUrl}/cy/ranking/characters/character-123/winRate`);
      expect(url).toContain('playerId=player-123');
      expect(url).toContain('offset=50');
      expect(url).toContain('limit=25');
      expect(url).toContain(`apikey=${testApiKey}`);
    });

    it('should handle all ranking types correctly', () => {
      const rankingTypes = ['winCount', 'winRate', 'killCount', 'assistCount', 'exp'] as const;
      
      rankingTypes.forEach(rankingType => {
        const url = builder.getCharacterRanking('character-123', rankingType);
        expect(url).toContain(`/cy/ranking/characters/character-123/${rankingType}`);
      });
    });
  });

  describe('item and character methods', () => {
    it('should build correct item search URL', () => {
      const url = builder.searchItems({
        itemName: '테스트아이템',
        wordType: 'match',
        characterId: 'character-123',
        slotCode: 'weapon',
        limit: 30,
      });
      
      expect(url).toContain(`${baseUrl}/cy/battleitems`);
      expect(url).toContain('itemName=%ED%85%8C%EC%8A%A4%ED%8A%B8%EC%95%84%EC%9D%B4%ED%85%9C');
      expect(url).toContain('wordType=match');
      expect(url).toContain('characterId=character-123');
      expect(url).toContain('slotCode=weapon');
      expect(url).toContain('limit=30');
      expect(url).toContain(`apikey=${testApiKey}`);
    });

    it('should build correct cyphers info URL', () => {
      const url = builder.getCyphersInfo({
        characterId: 'character-123',
        wordType: 'full',
        limit: 15,
      });
      
      expect(url).toContain(`${baseUrl}/cy/characters`);
      expect(url).toContain('characterId=character-123');
      expect(url).toContain('wordType=full');
      expect(url).toContain('limit=15');
      expect(url).toContain(`apikey=${testApiKey}`);
    });

    it('should build correct recommend items URL', () => {
      const url = builder.getRecommendItems('character-123');
      
      expect(url).toBe(
        `${baseUrl}/cy/characters/character-123/items?apikey=${testApiKey}`
      );
    });
  });

  describe('batch URL generation', () => {
    it('should generate multiple URLs correctly', () => {
      const urls = builder.batch([
        b => b.searchPlayer('플레이어1'),
        b => b.searchPlayer('플레이어2'),
        b => b.getOverallRanking({ limit: 10 }),
        b => b.getCyphersInfo({ limit: 5 }),
      ]);
      
      expect(urls).toHaveLength(4);
      expect(urls[0]).toContain('/cy/players');
      expect(urls[0]).toContain('nickname=%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B41');
      expect(urls[1]).toContain('nickname=%ED%94%8C%EB%A0%88%EC%9D%B4%EC%96%B42');
      expect(urls[2]).toContain('/cy/ranking/ratingpoint');
      expect(urls[3]).toContain('/cy/characters');
      
      // All URLs should contain API key
      urls.forEach(url => {
        expect(url).toContain(`apikey=${testApiKey}`);
      });
    });
  });

  describe('parameter handling', () => {
    it('should handle undefined and null parameters', () => {
      const url = builder.searchItems({
        itemName: '테스트',
        wordType: undefined,
        characterId: null as any,
        limit: 10,
      });
      
      expect(url).toContain('itemName=%ED%85%8C%EC%8A%A4%ED%8A%B8');
      expect(url).toContain('limit=10');
      expect(url).not.toContain('wordType');
      expect(url).not.toContain('characterId');
      expect(url).toContain(`apikey=${testApiKey}`);
    });

    it('should handle special characters in parameters', () => {
      const url = builder.searchPlayer('테스트@#$%^&*()플레이어');
      
      expect(url).toContain('nickname=');
      expect(url).toContain(`apikey=${testApiKey}`);
      // URL should be properly encoded
      expect(decodeURIComponent(url)).toContain('테스트@#$%^&*()플레이어');
    });
  });

  describe('custom base URL', () => {
    it('should use custom base URL when provided', () => {
      const customBuilder = new NeopleCyphersUrlBuilder(testApiKey, 'https://custom.api.com');
      const url = customBuilder.searchPlayer('테스트');
      
      expect(url).toContain('https://custom.api.com/cy/players');
      expect(url).toContain(`apikey=${testApiKey}`);
    });
  });
});