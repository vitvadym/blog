import { HttpClient } from './httpClient';
class AuthService {
  private httpClient: HttpClient;
  constructor() {
    this.httpClient = new HttpClient();
  }

  public async login<T, U>(payload: T): Promise<U> {
    return this.httpClient.post<T, U>(
      '/auth/login',
      payload,
    );
  }

  public async logout(): Promise<void> {
    return this.httpClient.post('/auth/logout');
  }

  public async me<T>(): Promise<T> {
    return this.httpClient.get<T>('/auth/me');
  }
}

export const authService = new AuthService();