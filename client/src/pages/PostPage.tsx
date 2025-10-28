import CommentsForm from '../components/CommentsForm';
import RelatedPosts from '../components/RelatedPosts';
import { useParams } from 'react-router-dom';
import { postService } from '../api/postService';
import { useQuery } from '@tanstack/react-query';
import type { IPost } from '../types';
import { formatDate } from '../helpers/formatDate';
import PageLoader from '../components/PageLoader';
import Comments from '../components/Comments';

const PostPage = () => {
  const { slug } = useParams();

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ['post', slug],
    queryFn: () =>
      postService.getPost<{
        message: string;
        post: IPost;
      }>(slug as string),
  });

  const { post } = data || {};

  return (
    <>
      {isLoading && <PageLoader />}
      {isSuccess && post && (
        <div className='mt-10 mb-20'>
          <p className='text-center text-primary py-4 font-medium'>
            Published on {formatDate(post.createdAt)}
          </p>
          <h1 className='text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto'>
            {post.title}
          </h1>

          <div className='max-w-5xl md:mx-auto my-10 mt-6'>
            <img
              alt={post.title}
              className='rounded-xl mb-5 w-full object-cover'
              src={post.image}
            />
          </div>

          {/* <h2>{post.excerpt}</h2> */}
          <div
            className='prose max-w-4xl mx-auto text-justify rich-text'
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          <div className='mt-10 mb-10 max-w-3xl mx-auto'>
            <Comments comments={data.post.comments} />
            <CommentsForm
              postId={post.id}
              commentsCount={data.post.comments.length}
            />
          </div>
        </div>
      )}

      <RelatedPosts slug={slug as string} />
    </>
  );
};

export default PostPage;
