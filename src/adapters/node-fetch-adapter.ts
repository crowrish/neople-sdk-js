import { HttpAdapter, RequestConfig } from '../core/http';
import { NeopleApiError } from '../core/error';

interface NodeFetchFunction {
  (input: string, init?: any): Promise<{
    ok: boolean;
    status: number;
    statusText: string;
    json(): Promise<any>;
    text(): Promise<string>;
  }>;
}

export class NodeFetchAdapter implements HttpAdapter {
  constructor(private fetch: NodeFetchFunction) {}

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const urlWithParams = this.buildUrlWithParams(url, config?.params);
    
    const controller = new AbortController();
    const timeoutId = config?.timeout 
      ? setTimeout(() => controller.abort(), config.timeout)
      : null;

    try {
      const response = await this.fetch(urlWithParams, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
        signal: controller.signal,
      });

      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (!response.ok) {
        throw new NeopleApiError(
          response.status,
          `HTTP ${response.status}: ${response.statusText}`,
          await response.text().catch(() => null)
        );
      }

      return response.json() as Promise<T>;
    } catch (error: any) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      if (error.name === 'AbortError') {
        throw new NeopleApiError(0, 'Request timeout', error);
      }

      if (error instanceof NeopleApiError) {
        throw error;
      }

      throw new NeopleApiError(
        0,
        error.message || 'Network error',
        error
      );
    }
  }

  private buildUrlWithParams(url: string, params?: Record<string, any>): string {
    if (!params || Object.keys(params).length === 0) {
      return url;
    }

    const urlObj = new URL(url);
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        urlObj.searchParams.append(key, String(value));
      }
    });

    return urlObj.toString();
  }
}

/**
 * 사용 예제:
 * 
 * ```typescript
 * import { NeopleDFClient, NodeFetchAdapter } from 'neople-sdk-js';
 * import fetch from 'node-fetch';
 * 
 * const client = new NeopleDFClient(
 *   'your-api-key',
 *   new NodeFetchAdapter(fetch)
 * );
 * 
 * // 캐릭터 검색
 * const result = await client.searchCharacter('홍길동');
 * console.log(result);
 * ```
 */