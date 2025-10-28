import PostCard from './PostCard';

import { postService } from '../api/postService';
import { useQuery } from '@tanstack/react-query';
import type { IPost } from '../types';

type RelatedPostsProps = {
  slug: string;
};

const RelatedPosts: React.FC<RelatedPostsProps> = ({ slug }) => {
  const { data, isSuccess } = useQuery({
    queryKey: ['relatedPosts', slug],
    queryFn: () =>
      postService.getRelatedPosts<{
        message: string;
        posts: IPost[];
      }>(slug),
  });

  return (
    <div>
      {isSuccess && data.posts.length > 0 && (
        <>
          <h1 className='text-center text-3xl font-semibold mb-6'>
            You may also like
          </h1>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3'>
            {data.posts.map((post) => (
              <PostCard
                overlay
                key={post.slug}
                post={post}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RelatedPosts;
