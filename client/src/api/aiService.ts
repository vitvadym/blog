import { HttpClient } from './httpClient';

class AIService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  public async generateContent<T, U>(title: T): Promise<U> {
    return this.httpClient.post<{ title: T }, U>(
      '/admin/generate-content',
      { title },
    );
  }
}

export const aiService = new AIService();
