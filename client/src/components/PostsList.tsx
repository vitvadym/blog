import PostCard from './PostCard';
import usePostQuery from '../hooks/usePostQuery';
import { useSearchParams } from 'react-router-dom';
import NoData from './NoData';
import PageLoader from './PageLoader';

const PostsList = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = usePostQuery({
    admin: false,
    params: searchParams.toString(),
  });
  const page = Number(searchParams.get('page')) || 1;

  const handlePageChange = (page: number) => {
    searchParams.set('page', page.toString());
    setSearchParams(searchParams);
  };

  return (
    <>
      {!data?.posts.length && !isLoading && <NoData />}
      {isLoading && <PageLoader />}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-3'>
        {data?.posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))}
      </div>
      {data && data?.pages > 1 && (
      <div className='join mt-3 mb-3'>
        {Array.from({ length: data?.pages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            className={`join-item btn btn-sm ${p === page ? 'btn-active' : ''}`}
            onClick={() => handlePageChange(p)}
          >
            {p}
          </button>
        ))}
      </div>
        
      )}
    </>
  );
};

export default PostsList;
