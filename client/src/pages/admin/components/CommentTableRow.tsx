import { TrashIcon } from '@heroicons/react/20/solid';
import { formatDate } from '../../../helpers/formatDate';
import type { IComment } from '../../../types';
import { useMutation } from '@tanstack/react-query';
import { commentService } from '../../../api/commentService';
import { queryClient } from '../../../main';
import Spinner from '../../../components/Spinner';
type RowProps = {
  comment: IComment;
};
const CommentTableRow: React.FC<RowProps> = ({ comment }) => {
  const { id, postTitle, content, createdAt, author } = comment;

  const { mutate: deleteComment, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) =>
      commentService.deleteComment<
        { id: number }
      >({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    },
  });

  const handleDeleteComment = () => {
    const isConfirmed = window.confirm(`Delete comment by "${author}"?`);
    if (isConfirmed) {
      deleteComment(id);
    }
  };

  return (
    <tr>
      <th>{id}</th>
      <td>
        <p>
          <span className='font-bold mr-1.5'>Comment:</span>
          <span>{content}</span>
        </p>

        <p>
          <span className='font-bold mr-1.5'>Author:</span>
          <span>{author}</span>
        </p>
        <p>
          <span className='font-bold mr-1.5'>Post:</span>
          <span>{postTitle}</span>
        </p>
      </td>
      <td>{formatDate(createdAt)}</td>
      <td>
        {isDeleting ? (
          <Spinner />
        ) : (
          <button
            onClick={handleDeleteComment}
            className='btn btn-ghost btn-xs tooltip'
            data-tip='delete'
          >
            <TrashIcon className='h-5 w-5' />
          </button>
        )}
      </td>
    </tr>
  );
};

export default CommentTableRow;
