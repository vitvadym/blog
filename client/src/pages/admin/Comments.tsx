import TableHeader from './components/TableHeader';
import { COMMENTS_TABLE_HEADERS } from '../../constants';
import CommentTableRow from './components/CommentTableRow';
import NoData from '../../components/NoData';
import { commentService } from '../../api/commentService';
import { useQuery } from '@tanstack/react-query';
import type { IComment } from '../../types';
import PageLoader from '../../components/PageLoader';

const CommentsList = () => {
  const { data, isLoading } = useQuery({
    queryFn: () =>
      commentService.getAllComments<{
        message: string;
        comments: IComment[];
      }>(),
    queryKey: ['comments'],
  });

  return (
    <>
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className='overflow-x-auto'>
          <table className='table'>
            <TableHeader headers={COMMENTS_TABLE_HEADERS} />
            {isLoading && <PageLoader />}

            <tbody>
              {data?.comments.map((comment, index) => (
                <CommentTableRow
                  key={index}
                  comment={comment}
                />
              ))}
            </tbody>
          </table>
            {!data?.comments.length && !isLoading && <NoData />}
        </div>
      )}
    </>
  );
};

export default CommentsList;
