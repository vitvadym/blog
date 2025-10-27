import Editor from './components/Editor';
import Fieldset from './components/Fieldset';
import usePostStore from '../../store/postStore';
import { categoryService } from '../../api/categoryService';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { ICategory, IPost } from '../../types';
import { postService } from '../../api/postService';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const {
    content,
    setPost,
    category,
    image,
    isFeatured,
    isPublished,
    title,
    resetPostStore,
  } = usePostStore();
  const navigate = useNavigate();

  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      categoryService.getAllCategories<{
        message: string;
        categories: ICategory[];
      }>(),
  });

  const formData = new FormData();
  formData.append('title', title);
  formData.append('content', content);
  formData.append('category', category);
  formData.append('isFeatured', String(isFeatured));
  formData.append('isPublished', String(isPublished));
  if (image instanceof File) {
    formData.append('image', image);
  }

  const { mutate: createPost, isPending: isCreating } = useMutation({
    mutationFn: () =>
      postService.createPost<FormData, { message: string; post: IPost }>(
        formData,
      ),

    onSuccess: (data) => {
      toast.success(data.message);
      navigate('/admin');
      resetPostStore();
    },
  });

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const handleChangePostTitle = (value: string) => {
    setPost({ title: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!content) {
      toast.error('Post content cannot be empty');
      return;
    }

    createPost();
  };

  return (
    <div>
      <form
        className='flex gap-4 mb-6 flex-wrap items-baseline'
        onSubmit={handleSubmit}
      >
        <Fieldset
          legend='Post cover image'
          type='file'
          label='Max size 2MB'
          onChange={(value) => {
            if (value instanceof File) {
              if (value.size > MAX_FILE_SIZE) {
                toast.error('File size exceeds 2MB limit');
                return;
              }
              setPost(value);
            }
          }}
        />

        <Fieldset
          legend='Post title'
          type='text'
          label='Required'
          onChange={(value) => handleChangePostTitle(value as string)}
        />

        <Fieldset
          type='select'
          legend='Category'
          options={Object.values(data?.categories || []).map(
            (category) => category.name,
          )}
          label='Required'
          onChange={(value) => setPost({ category: value as string })}
        />

        <Fieldset
          type='checkbox'
          legend='Status'
          label='Publish'
          onChange={(value) =>
            setPost({ isPublished: value === 'on' ? true : false })
          }
        />

        <button
          type='submit'
          className='btn btn-primary'
          disabled={!content || isCreating}
        >
          {isCreating && (
            <span className='loading loading-spinner text-primary'></span>
          )}
          {isCreating ? 'Processing' : 'Create Post'}
        </button>
      </form>

      <Editor />
    </div>
  );
};

export default AddPost;
