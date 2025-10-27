import {
  CalendarDaysIcon,
  ClockIcon,
  // HeartIcon,
} from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import cn from 'classnames';
import type { IPost } from '../types';
import { formatDate } from '../helpers/formatDate';

type PostCardProps = {
  overlay?: boolean;
  post: IPost;
};

const PostCard: React.FC<PostCardProps> = ({ overlay = false, post }) => {
  const { title, createdAt, category, image, excerpt, readingTime, slug } =
    post;
  return (
    <div
      className={cn(
        'relative card bg-base-100 shadow-md w-full hover:shadow-xl transition-shadow duration-300',
        { 'image-full': overlay },
      )}
    >
      <figure>
        <img
          className='h-[20vh] md:h-[30vh] w-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out'
          src={image}
          alt={title}
        />
      </figure>
      <div className='card-body'>
        <h2
          className={cn('card-title line-clamp-1', {
            'text-2xl mt-8': overlay,
          })}
        >
          {title}
          <div className='absolute top-2 right-2 badge badge-primary'>
            {category}
          </div>
        </h2>
        <p className='line-clamp-2'>{excerpt}</p>
        <div className='flex text-sm text-gray-400 gap-3 justify-between max-w-fit'>
          <p className='inline-flex gap-2'>
            <CalendarDaysIcon className='h-5 w-5' />
            <span>{formatDate(createdAt)}</span>
          </p>
          <p className='inline-flex gap-2'>
            <ClockIcon className='h-5 w-5' />
            <span>{readingTime} min read</span>
          </p>
          {/* <p className='inline-flex gap-2'>
            <HeartIcon className='h-5 w-5' />
            <span>12</span>
          </p> */}
        </div>
        <div className='card-actions justify-start'>
          <Link
            className='link link-hover'
            to={`/post/${slug}`}
          >
            Read more...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
