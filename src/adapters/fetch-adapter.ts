import { HttpAdapter, RequestConfig } from '../core/http';
import { NeopleApiError } from '../core/error';

export class FetchAdapter implements HttpAdapter {
  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    const urlWithParams = this.buildUrlWithParams(url, config?.params);
    
    // Create AbortController for timeout if needed
    let signal: AbortSignal | undefined = undefined;
    let timeoutId: NodeJS.Timeout | undefined = undefined;
    if (config?.timeout) {
      const controller = new AbortController();
      signal = controller.signal;
      timeoutId = setTimeout(() => controller.abort(), config.timeout);
    }
    
    try {
      const response = await fetch(urlWithParams, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...config?.headers,
        },
        signal,
      });

      if (!response.ok) {
        throw new NeopleApiError(
          response.status,
          `HTTP ${response.status}: ${response.statusText}`,
          await response.text().catch(() => null)
        );
      }

      return response.json() as Promise<T>;
    } catch (error: any) {
      // Handle network errors (including CORS)
      if (error instanceof NeopleApiError) {
        throw error; // Re-throw already processed errors
      }
      
      // CORS 에러는 보통 TypeError와 특정 메시지로 나타남
      if (error instanceof TypeError) {
        if (error.message.includes('Failed to fetch') || 
            error.message.includes('Network request failed') ||
            error.message.includes('CORS')) {
          throw new NeopleApiError(
            0,
            'CORS Error: Cross-origin request blocked. Check API endpoint CORS settings.',
            error
          );
        }
      }
      
      // 타임아웃 에러
      if (error.name === 'AbortError') {
        throw new NeopleApiError(
          0,
          'Request timeout: The request took too long to complete.',
          error
        );
      }
      
      // 기타 네트워크 에러
      throw new NeopleApiError(
        0,
        error.message || 'Network error occurred.',
        error
      );
    } finally {
      // Clean up timeout to prevent hanging
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
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
 * import { NeopleDFClient, FetchAdapter } from 'neople-sdk-js';
 * 
 * const client = new NeopleDFClient(
 *   'your-api-key',
 *   new FetchAdapter()
 * );
 * 
 * // 캐릭터 검색
 * const result = await client.searchCharacter('홍길동');
 * console.log(result);
 * ```
 */