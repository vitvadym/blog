import { XMarkIcon, CheckIcon, TrashIcon } from '@heroicons/react/20/solid';
import type { IPost } from '../../../types';
import cn from 'classnames';
import { formatDate } from '../../../helpers/formatDate';
import { postService } from '../../../api/postService';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../main';
import Spinner from '../../../components/Spinner';

type Props = {
  order: number;
  post: IPost;
};

type Req = {
  id: number;
};

type Res = {
  message: string;
  post: IPost;
};

const PostTableRow: React.FC<Props> = ({ order, post }) => {
  const { createdAt, isPublished, title, id } = post;

  const { mutate: togglePublish, isPending: isToggling } = useMutation({
    mutationFn: () => postService.togglePublish<Req, Res>({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
  });

  const { mutate: deletePost, isPending: isDeleting } = useMutation({
    mutationFn: () => postService.deletePost<Req, Res>({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['dashboardStats'] });
    },
  });

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the post "${title}"?`,
    );
    if (isConfirmed) {
      deletePost();
    }
  };

  return (
    <tr>
      <th>{order}</th>
      <td>{title}</td>
      <td>{formatDate(createdAt)}</td>
      <td>
        <span
          className={cn(
            'badge badge-sm w-20',
            { 'badge-success': isPublished },
            { 'badge-warning': !isPublished },
          )}
        >
          {isPublished ? 'Published' : 'Draft'}
        </span>
      </td>
      <td>
        <span className='flex items-center justify-end gap-2 w-20'>
          {isToggling ? (
            <Spinner />
          ) : (
            <button
              onClick={() => togglePublish()}
              className='btn btn-ghost btn-xs tooltip'
              data-tip={isPublished ? 'unpublish' : 'publish'}
            >
              {isPublished ? (
                <XMarkIcon className='w-5 h-5' />
              ) : (
                <CheckIcon className='w-5 h-5' />
              )}
            </button>
          )}

          {isDeleting ? (
            <Spinner />
          ) : (
            <button
              onClick={handleDelete}
              className='btn btn-ghost btn-xs tooltip'
              data-tip='delete'
            >
              <TrashIcon className='h-5 w-5' />
            </button>
          )}
        </span>
      </td>
    </tr>
  );
};

export default PostTableRow;
