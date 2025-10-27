import { useState } from 'react';
import { commentService } from '../api/commentService';
import { useMutation } from '@tanstack/react-query';
import type { IComment } from '../types';
import { queryClient } from '../main';
import Spinner from './Spinner';

type Req = Omit<IComment, 'id' | 'createdAt'>;
type FormProps = {
  postId: number;
  commentsCount: number;
};
const CommentsForm: React.FC<FormProps> = ({ postId, commentsCount }) => {
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };

  const handleAuthorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (data: Req) =>
      commentService.createComment<Req, IComment>(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post'] });
      setAuthor('');
      setContent('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newComment = {
      author,
      content,
      postId,
    };

    mutate(newComment);
  };

  return (
    <div className='max-w-3xl mx-auto'>
      <div className='mt-14 mb-10 max-w-3xl mx-auto'>
        <p>Comments({commentsCount})</p>
      </div>
      <div className='font-semibold mb-4'>Add a comment...</div>

      <form
        className='flex flex-col items-start gap-4 max-w-lg'
        onSubmit={handleSubmit}
      >
        <input
          required
          type='text'
          className='input outline-0 '
          placeholder='Your name'
          value={author}
          onChange={handleAuthorChange}
        />
        <textarea
          required
          className='textarea outline-0 resize-none'
          placeholder='Write your comment here...'
          value={content}
          onChange={handleContentChange}
        />
        <button
          disabled={isPending}
          type='submit'
          className='btn btn-primary self-start w-24'
        >
          {isPending ? <Spinner /> : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default CommentsForm;
