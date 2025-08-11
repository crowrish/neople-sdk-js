import { HttpAdapter, RequestConfig } from '../core/http';
import { NeopleApiError } from '../core/error';

interface GotInstance {
  get<T = any>(url: string, options?: any): Promise<{
    body: T;
    statusCode: number;
    statusMessage: string;
  }>;
}

export class GotAdapter implements HttpAdapter {
  constructor(private got: GotInstance) {}

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    try {
      const response = await this.got.get<T>(url, {
        headers: config?.headers,
        timeout: config?.timeout ? { request: config.timeout } : undefined,
        searchParams: config?.params,
        responseType: 'json',
      });

      return response.body;
    } catch (error: any) {
      if (error.response) {
        throw new NeopleApiError(
          error.response.statusCode,
          `HTTP ${error.response.statusCode}: ${error.response.statusMessage}`,
          error.response.body
        );
      } else if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
        throw new NeopleApiError(
          0,
          `Network Error: ${error.message}`,
          error
        );
      } else {
        throw new NeopleApiError(
          0,
          error.message || 'Unknown Got error',
          error
        );
      }
    }
  }
}

/**
 * 사용 예제:
 * 
 * ```typescript
 * import { NeopleDFClient, GotAdapter } from 'neople-sdk-js';
 * import got from 'got';
 * 
 * const client = new NeopleDFClient(
 *   'your-api-key',
 *   new GotAdapter(got.extend({
 *     timeout: { request: 5000 },
 *     retry: { limit: 2 }
 *   }))
 * );
 * 
 * // 캐릭터 검색
 * const result = await client.searchCharacter('홍길동');
 * console.log(result);
 * ```
 */