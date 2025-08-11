import { NeopleDFUrlBuilder } from '../../../src/url-builders/dungeon-fighter-url';

describe('NeopleDFUrlBuilder', () => {
  let builder: NeopleDFUrlBuilder;
  const testApiKey = 'test-api-key-123';
  const baseUrl = 'https://api.neople.co.kr';

  beforeEach(() => {
    builder = new NeopleDFUrlBuilder(testApiKey);
  });

  describe('character methods', () => {
    it('should build correct character search URL', () => {
      const url = builder.searchCharacter('홍길동', 'cain');
      
      expect(url).toBe(
        `${baseUrl}/df/servers/cain/characters?characterName=%ED%99%8D%EA%B8%B8%EB%8F%99&apikey=${testApiKey}`
      );
    });

    it('should use default serverId when not provided', () => {
      const url = builder.searchCharacter('홍길동');
      
      expect(url).toBe(
        `${baseUrl}/df/servers/all/characters?characterName=%ED%99%8D%EA%B8%B8%EB%8F%99&apikey=${testApiKey}`
      );
    });

    it('should build correct character detail URL', () => {
      const url = builder.getCharacter('cain', 'character-123');
      
      expect(url).toBe(
        `${baseUrl}/df/servers/cain/characters/character-123?apikey=${testApiKey}`
      );
    });

    it('should build correct character equipment URL', () => {
      const url = builder.getCharacterEquipment('cain', 'character-123');
      
      expect(url).toBe(
        `${baseUrl}/df/servers/cain/characters/character-123/equip/equipment?apikey=${testApiKey}`
      );
    });

    it('should build correct character status URL', () => {
      const url = builder.getCharacterStatus('cain', 'character-123');
      
      expect(url).toBe(
        `${baseUrl}/df/servers/cain/characters/character-123/status?apikey=${testApiKey}`
      );
    });

    it('should build correct character timeline URL', () => {
      const url = builder.getCharacterTimeline('cain', 'character-123', {
        startDate: '2024-01-01',
        endDate: '2024-01-31',
        limit: 10,
      });
      
      expect(url).toContain(`${baseUrl}/df/servers/cain/characters/character-123/timeline`);
      expect(url).toContain('startDate=2024-01-01');
      expect(url).toContain('endDate=2024-01-31');
      expect(url).toContain('limit=10');
      expect(url).toContain(`apikey=${testApiKey}`);
    });
  });

  describe('item methods', () => {
    it('should build correct item search URL', () => {
      const url = builder.searchItems({
        itemName: '해방무기',
        limit: 20,
      });
      
      expect(url).toContain(`${baseUrl}/df/items`);
      expect(url).toContain('itemName=%ED%95%B4%EB%B0%A9%EB%AC%B4%EA%B8%B0');
      expect(url).toContain('limit=20');
      expect(url).toContain(`apikey=${testApiKey}`);
    });

    it('should build correct item detail URL', () => {
      const url = builder.getItem('item-123');
      
      expect(url).toBe(
        `${baseUrl}/df/items/item-123?apikey=${testApiKey}`
      );
    });

    it('should build correct set item URL', () => {
      const url = builder.getSetItem('set-item-123');
      
      expect(url).toBe(
        `${baseUrl}/df/setitems/set-item-123?apikey=${testApiKey}`
      );
    });

    it('should build correct multi item URL', () => {
      const url = builder.getMultiItem('multi-item-123');
      
      expect(url).toBe(
        `${baseUrl}/df/multi/multi-item-123?apikey=${testApiKey}`
      );
    });
  });

  describe('auction methods', () => {
    it('should build correct auction search URL', () => {
      const url = builder.searchAuction({
        itemName: '해방무기',
        minPrice: 1000000,
        maxPrice: 5000000,
        limit: 50,
      });
      
      expect(url).toContain(`${baseUrl}/df/auction`);
      expect(url).toContain('itemName=%ED%95%B4%EB%B0%A9%EB%AC%B4%EA%B8%B0');
      expect(url).toContain('minPrice=1000000');
      expect(url).toContain('maxPrice=5000000');
      expect(url).toContain('limit=50');
      expect(url).toContain(`apikey=${testApiKey}`);
    });

    it('should build correct auction sold URL', () => {
      const url = builder.getAuctionSold({
        itemName: '해방무기',
        limit: 30,
      });
      
      expect(url).toContain(`${baseUrl}/df/auction-sold`);
      expect(url).toContain('itemName=%ED%95%B4%EB%B0%A9%EB%AC%B4%EA%B8%B0');
      expect(url).toContain('limit=30');
      expect(url).toContain(`apikey=${testApiKey}`);
    });
  });

  describe('batch URL generation', () => {
    it('should generate multiple URLs correctly', () => {
      const urls = builder.batch([
        b => b.searchCharacter('홍길동'),
        b => b.searchCharacter('김철수'),
        b => b.searchItems({ itemName: '무기' }),
      ]);
      
      expect(urls).toHaveLength(3);
      expect(urls[0]).toContain('/df/servers/all/characters');
      expect(urls[0]).toContain('characterName=%ED%99%8D%EA%B8%B8%EB%8F%99');
      expect(urls[1]).toContain('characterName=%EA%B9%80%EC%B2%A0%EC%88%98');
      expect(urls[2]).toContain('/df/items');
      expect(urls[2]).toContain('itemName=%EB%AC%B4%EA%B8%B0');
      
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
        limit: null as any,
      });
      
      expect(url).toContain('itemName=%ED%85%8C%EC%8A%A4%ED%8A%B8');
      expect(url).not.toContain('wordType');
      expect(url).not.toContain('limit');
      expect(url).toContain(`apikey=${testApiKey}`);
    });

    it('should handle special characters in parameters', () => {
      const url = builder.searchCharacter('테스트@#$%^&*()');
      
      expect(url).toContain('characterName=');
      expect(url).toContain(`apikey=${testApiKey}`);
      // URL should be properly encoded
      expect(decodeURIComponent(url)).toContain('테스트@#$%^&*()');
    });
  });

  describe('custom base URL', () => {
    it('should use custom base URL when provided', () => {
      const customBuilder = new NeopleDFUrlBuilder(testApiKey, 'https://custom.api.com');
      const url = customBuilder.searchCharacter('홍길동');
      
      expect(url).toContain('https://custom.api.com/df/servers/all/characters');
      expect(url).toContain(`apikey=${testApiKey}`);
    });
  });
});