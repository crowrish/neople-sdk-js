import { HttpAdapter } from './http';
import { FetchAdapter } from '../adapters/fetch-adapter';

export abstract class BaseClient {
  protected apiKey: string;
  protected httpAdapter: HttpAdapter;
  protected baseUrl: string;

  constructor(
    apiKey: string,
    httpAdapter: HttpAdapter = new FetchAdapter(),
    baseUrl = 'https://api.neople.co.kr'
  ) {
    this.apiKey = apiKey;
    this.httpAdapter = httpAdapter;
    this.baseUrl = baseUrl;
  }

  protected async request<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      params: {
        ...params,
        apikey: this.apiKey,
      },
    };

    return this.httpAdapter.get<T>(url, config);
  }
}