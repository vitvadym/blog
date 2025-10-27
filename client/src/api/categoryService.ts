import { HttpClient } from "./httpClient";

class CategoryService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }
  
  public async getAllCategories<T>(): Promise<T> {
    return this.httpClient.get<T>('/categories');
  }

  //TODO: add remove, update, create methods
}

export const categoryService = new CategoryService();
