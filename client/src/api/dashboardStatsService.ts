import { HttpClient } from './httpClient';

class DashboardStatsService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  public async getDashboardStats<T>(): Promise<T> {
    return this.httpClient.get<T>('/admin/dashboard');
  }
}

export const dashboardStatsService = new DashboardStatsService();
