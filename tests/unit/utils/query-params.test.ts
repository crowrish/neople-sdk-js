import { buildQueryString, appendQueryParams, parseQueryParams } from '../../../src/utils/query-params';

describe('Query Parameters Utils', () => {
  describe('buildQueryString', () => {
    it('should build query string from object', () => {
      const params = {
        name: 'test',
        age: 25,
        active: true,
      };
      
      const result = buildQueryString(params);
      expect(result).toBe('?name=test&age=25&active=true');
    });

    it('should handle empty object', () => {
      const result = buildQueryString({});
      expect(result).toBe('');
    });

    it('should handle undefined and null values', () => {
      const params = {
        name: 'test',
        undefined: undefined,
        null: null,
        empty: '',
        zero: 0,
      };
      
      const result = buildQueryString(params);
      expect(result).toBe('?name=test&empty=&zero=0');
    });

    it('should handle array values', () => {
      const params = {
        tags: ['red', 'blue', 'green'],
        single: 'value',
      };
      
      const result = buildQueryString(params);
      expect(result).toContain('tags=red');
      expect(result).toContain('tags=blue');
      expect(result).toContain('tags=green');
      expect(result).toContain('single=value');
    });

    it('should handle special characters', () => {
      const params = {
        search: '홍길동',
        special: 'test@#$%^&*()',
      };
      
      const result = buildQueryString(params);
      expect(result).toContain('search=%ED%99%8D%EA%B8%B8%EB%8F%99');
      expect(result).toContain('special=test%40%23%24%25%5E%26*%28%29');
    });
  });

  describe('appendQueryParams', () => {
    it('should append parameters to URL', () => {
      const baseUrl = 'https://api.example.com/test';
      const params = {
        name: 'test',
        limit: 10,
      };
      
      const result = appendQueryParams(baseUrl, params);
      expect(result).toBe('https://api.example.com/test?name=test&limit=10');
    });

    it('should handle URL with existing parameters', () => {
      const baseUrl = 'https://api.example.com/test?existing=value';
      const params = {
        new: 'param',
      };
      
      const result = appendQueryParams(baseUrl, params);
      expect(result).toBe('https://api.example.com/test?existing=value&new=param');
    });

    it('should handle empty parameters', () => {
      const baseUrl = 'https://api.example.com/test';
      const params = {};
      
      const result = appendQueryParams(baseUrl, params);
      expect(result).toBe('https://api.example.com/test');
    });

    it('should handle null parameters', () => {
      const baseUrl = 'https://api.example.com/test';
      const params = {
        valid: 'value',
        null: null,
        undefined: undefined,
      };
      
      const result = appendQueryParams(baseUrl, params);
      expect(result).toBe('https://api.example.com/test?valid=value');
    });

    it('should properly encode Korean characters', () => {
      const baseUrl = 'https://api.example.com/test';
      const params = {
        characterName: '홍길동',
      };
      
      const result = appendQueryParams(baseUrl, params);
      expect(result).toBe('https://api.example.com/test?characterName=%ED%99%8D%EA%B8%B8%EB%8F%99');
    });
  });

  describe('parseQueryParams', () => {
    it('should parse query parameters from URL', () => {
      const url = 'https://api.example.com/test?name=test&age=25&active=true';
      
      const result = parseQueryParams(url);
      expect(result).toEqual({
        name: 'test',
        age: '25',
        active: 'true',
      });
    });

    it('should handle URL without parameters', () => {
      const url = 'https://api.example.com/test';
      
      const result = parseQueryParams(url);
      expect(result).toEqual({});
    });

    it('should handle empty URL', () => {
      const result = parseQueryParams('');
      expect(result).toEqual({});
    });

    it('should handle invalid URL', () => {
      const result = parseQueryParams('invalid-url');
      expect(result).toEqual({});
    });

    it('should decode encoded parameters', () => {
      const url = 'https://api.example.com/test?name=%ED%99%8D%EA%B8%B8%EB%8F%99&special=test%40%23%24';
      
      const result = parseQueryParams(url);
      expect(result).toEqual({
        name: '홍길동',
        special: 'test@#$',
      });
    });

    it('should handle multiple values for same parameter', () => {
      const url = 'https://api.example.com/test?tag=red&tag=blue';
      
      const result = parseQueryParams(url);
      // URLSearchParams.forEach only gets the last value for duplicate keys
      expect(result.tag).toBe('blue');
    });

    it('should handle parameters without values', () => {
      const url = 'https://api.example.com/test?flag&name=test';
      
      const result = parseQueryParams(url);
      expect(result).toEqual({
        flag: '',
        name: 'test',
      });
    });
  });

  describe('integration scenarios', () => {
    it('should maintain consistency between append and parse', () => {
      const baseUrl = 'https://api.example.com/test';
      const originalParams = {
        name: '홍길동',
        level: 110,
        server: 'cain',
      };
      
      const urlWithParams = appendQueryParams(baseUrl, originalParams);
      const parsedParams = parseQueryParams(urlWithParams);
      
      expect(parsedParams).toEqual({
        name: '홍길동',
        level: '110', // Numbers become strings when parsed
        server: 'cain',
      });
    });

    it('should handle complex parameter combinations', () => {
      const params = {
        search: '해방무기 +10',
        minPrice: 1000000,
        maxPrice: 5000000,
        categories: ['weapon', 'armor'],
        includeExpired: false,
      };
      
      const queryString = buildQueryString(params);
      expect(queryString).toContain('search=');
      expect(queryString).toContain('minPrice=1000000');
      expect(queryString).toContain('maxPrice=5000000');
      expect(queryString).toContain('categories=weapon');
      expect(queryString).toContain('categories=armor');
      expect(queryString).toContain('includeExpired=false');
    });
  });
});