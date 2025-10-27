import axios from 'axios';
export class HttpClient {
  private baseUrl = import.meta.env.VITE_API_BASE_URL;

  public async get<T>(url: string): Promise<T> {
    const response = await axios.get<T>(`${this.baseUrl}${url}`, {
      withCredentials: true,
    });
    return response.data;
  }

  public async post<T, U>(url: string, data?: T): Promise<U> {
    const response = await axios.post<U>(
      `${this.baseUrl}${url}`,
      data,
      {
        withCredentials: true,
      },
    );
    return response.data;
  }

  public async put<T, U>(url: string, data: T): Promise<U> {
    const response = await axios.put<U>(
      `${this.baseUrl}${url}`,
      data,
      {
        withCredentials: true,
      },
    );
    return response.data;
  }

  public async patch<T, U>(url: string, data: T): Promise<U> {
    const response = await axios.patch<U>(
      `${this.baseUrl}${url}`,
      data,
      {
        withCredentials: true,
      },
    );
    return response.data;
  }

  public async delete<T, U>(url: string, data?: T): Promise<U> {
    const response = await axios.delete<U>(
      `${this.baseUrl}${url}`,
      {
        withCredentials: true,
        data,
      },
    );
    return response.data;
  }
}
