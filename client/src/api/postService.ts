import { HttpClient } from './httpClient';

class PostService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  public async getPostsClient<T>(params: string): Promise<T> {
    return this.httpClient.get<T>(`/posts?${params}`);
  }

  public async getAllPostsAdmin<T>(params: string): Promise<T> {
    return this.httpClient.get<T>(`/admin/posts?${params}`);
  }

  public async getFeaturedPosts<T>(): Promise<T> {
    return this.httpClient.get<T>('/posts/featured');
  }

  public async getRelatedPosts<T>(slug: string): Promise<T> {
    return this.httpClient.get<T>(`/posts/related/${slug}`);
  }

  public async getPost<T>(slug: string): Promise<T> {
    return this.httpClient.get<T>(`/posts/${slug}`);
  }

  public async createPost<T, U>(data: T): Promise<U> {
    return this.httpClient.post<T, U>('/admin/create-post', data);
  }

  public async deletePost<T, U>(data: T): Promise<U> {
    return this.httpClient.delete<T, U>('/admin/delete-post', { ...data });
  }

  public async togglePublish<T, U>(data: T): Promise<U> {
    return this.httpClient.patch<T, U>('/admin/toggle-publish', { ...data });
  }
}

export const postService = new PostService();
