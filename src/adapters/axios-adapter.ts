import { HttpAdapter, RequestConfig } from '../core/http';
import { NeopleApiError } from '../core/error';

interface AxiosInstance {
  get<T = any>(url: string, config?: any): Promise<{ data: T; status: number; statusText: string; }>;
}

export class AxiosAdapter implements HttpAdapter {
  constructor(private axiosInstance: AxiosInstance) {}

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    try {
      const response = await this.axiosInstance.get<T>(url, {
        headers: config?.headers,
        timeout: config?.timeout,
        params: config?.params,
      });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        throw new NeopleApiError(
          error.response.status,
          `HTTP ${error.response.status}: ${error.response.statusText}`,
          error.response.data
        );
      } else if (error.request) {
        throw new NeopleApiError(
          0,
          'Network Error: No response received',
          error.request
        );
      } else {
        throw new NeopleApiError(
          0,
          error.message || 'Unknown axios error',
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
 * import { NeopleDFClient, AxiosAdapter } from 'neople-sdk-js';
 * import axios from 'axios';
 * 
 * const client = new NeopleDFClient(
 *   'your-api-key',
 *   new AxiosAdapter(axios.create({
 *     timeout: 5000,
 *     retry: 3
 *   }))
 * );
 * 
 * // 캐릭터 검색
 * const result = await client.searchCharacter('홍길동');
 * console.log(result);
 * ```
 */