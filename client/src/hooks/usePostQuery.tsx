import { useQuery } from '@tanstack/react-query';
import { postService } from '../api/postService';
import type { IPost } from '../types';

type QueryProps = {
  admin?: boolean;
  params?: string;
};

type Response = {
  message: string;
  posts: IPost[];
  pages: number;
};

export const usePostQuery = ({ admin, params }: QueryProps) => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ['posts', params],
    queryFn: () => {
      if (admin) {
        return postService.getAllPostsAdmin<Response>(params || '');
      } else {
        return postService.getPostsClient<Response>(params || '');
      }
    },
  });

  return { data, isLoading, isError, isSuccess };
};

export default usePostQuery;
