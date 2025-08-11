import { HttpAdapter, RequestConfig } from '../../src/core/http';

export class MockHttpAdapter implements HttpAdapter {
  public calls: Array<{ url: string; config?: RequestConfig }> = [];
  public mockResponse: any = {};
  public shouldThrow: Error | null = null;

  async get<T>(url: string, config?: RequestConfig): Promise<T> {
    this.calls.push({ url, config });
    
    if (this.shouldThrow) {
      throw this.shouldThrow;
    }
    
    return this.mockResponse as T;
  }

  reset() {
    this.calls = [];
    this.mockResponse = {};
    this.shouldThrow = null;
  }

  setMockResponse(response: any) {
    this.mockResponse = response;
  }

  setMockError(error: Error) {
    this.shouldThrow = error;
  }

  getLastCall() {
    return this.calls[this.calls.length - 1];
  }
}