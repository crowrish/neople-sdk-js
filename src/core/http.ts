export interface RequestConfig {
  headers?: Record<string, string>;
  timeout?: number;
  params?: Record<string, any>;
}

export interface HttpAdapter {
  get<T>(url: string, config?: RequestConfig): Promise<T>;
}