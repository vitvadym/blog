import { create } from 'zustand';
import type { IPost } from '../types';

export interface PostStore {
  title: string;
  category: string;
  isPublished: boolean;
  isFeatured: boolean;
  image: File | null;
  content: string;
}

interface PostActions {
  setPost: (data: Partial<IPost> | File) => void;
  resetPostStore: () => void;
}

const initState: PostStore = {
  title: '',
  category: '',
  isPublished: false,
  isFeatured: false,
  image: null,
  content: '',
};

export const usePostStore = create<PostStore & PostActions>((set) => ({
  ...initState,
  setPost: (data: Partial<Omit<IPost, 'image'>> | File) => {
    if (data instanceof File) {
      set((state) => ({ ...state, image: data }));
    } else {
      set((state) => ({ ...state, ...data }));
    }
  },
  resetPostStore: () => set(() => ({ ...initState })),
}));

export default usePostStore;
