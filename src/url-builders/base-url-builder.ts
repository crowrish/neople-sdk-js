export abstract class BaseUrlBuilder {
  protected apiKey: string;
  protected baseUrl: string;

  constructor(apiKey: string, baseUrl = 'https://api.neople.co.kr') {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  protected buildUrl(endpoint: string, params?: Record<string, any>): string {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    
    // 추가 파라미터들 추가
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }
    
    // API 키를 마지막에 추가 (BaseClient와 일관성 유지)
    url.searchParams.append('apikey', this.apiKey);

    return url.toString();
  }
}