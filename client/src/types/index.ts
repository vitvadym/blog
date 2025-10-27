export interface IPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  isPublished: boolean;
  isFeatured: boolean;
  image: string;
  content: string;
  category: string;
  createdAt: string;
  readingTime: number;
  comments: IComment[];
}

export interface ICategory {
  id: number;
  name: string;
  slug: string;
}

export interface IComment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
  postId?: number;
  postTitle?: string;
}

export interface IUser {
  name: string;
  email: string;
  role: 'admin';
}

export interface IComment {
  id: number;
  content: string;
  author: string;
  createdAt: string;
}