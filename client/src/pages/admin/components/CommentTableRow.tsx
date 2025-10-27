import { TrashIcon } from '@heroicons/react/20/solid';
import { formatDate } from '../../../helpers/formatDate';
import type { IComment } from '../../../types';
type RowProps = {
  comment: IComment;
};
const CommentTableRow: React.FC<RowProps> = ({ comment }) => {
  return (
    <tr>
      <th>{comment.id}</th>
      <td>
        <p>
          <span className='font-bold mr-1.5'>Comment:</span>
          <span>{comment.content}</span>
        </p>

        <p>
          <span className='font-bold mr-1.5'>Author:</span>
          <span>{comment.author}</span>
        </p>
        <p>
          <span className='font-bold mr-1.5'>Post:</span>
          <span>{comment.postTitle}</span>
        </p>
      </td>
      <td>{formatDate(comment.createdAt)}</td>
      <td>
        <button
          onClick={() => {}}
          className='btn btn-ghost btn-xs tooltip'
          data-tip='delete'
        >
          <TrashIcon className='h-5 w-5' />
        </button>
      </td>
    </tr>
  );
};

export default CommentTableRow;
