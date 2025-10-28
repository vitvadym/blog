import { HttpClient } from './httpClient';

class CommentService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = new HttpClient();
  }

  public async getAllComments<T>(): Promise<T> {
    return this.httpClient.get<T>('/admin/comments');
  }

  public async createComment<T, U>(data: T): Promise<U> {
    return this.httpClient.post<T, U>('/comments/create', data);
  }

  public async deleteComment<T>(data: T): Promise<void> {
    return this.httpClient.delete('/admin/delete-comment', data);
  }
}

export const commentService = new CommentService();
