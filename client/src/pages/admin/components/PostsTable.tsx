import PostTableRow from './PostTableRow';
import { POST_TABLE_HEADERS } from '../../../constants';
import TableHeader from './TableHeader';
import usePostQuery from '../../../hooks/usePostQuery';
import NoData from '../../../components/NoData';
import PageLoader from '../../../components/PageLoader';

const PostsTable = () => {
  const { data, isLoading } = usePostQuery({ admin: true });
  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className='overflow-x-auto'>
          <table className='table'>
            <TableHeader headers={POST_TABLE_HEADERS} />

            <tbody>
              {data?.posts.map((post, index) => (
                <PostTableRow
                  key={post.id}
                  order={index + 1}
                  post={post}
                />
              ))}
            </tbody>
          </table>
          {!data?.posts.length && <NoData />}
        </div>
      )}
    </>
  );
};

export default PostsTable;
