export class NeopleApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public response?: any
  ) {
    super(message);
    this.name = 'NeopleApiError';
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NeopleApiError);
    }
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      status: this.status,
      response: this.response,
    };
  }
}