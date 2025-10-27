import { Link } from 'react-router-dom';
import { CalendarDaysIcon, ClockIcon } from '@heroicons/react/20/solid';
import type { IPost } from '../types';
import { formatDate } from '../helpers/formatDate';

type Props = {
  post: IPost;
};

const FeaturedPostCard: React.FC<Props> = ({ post }) => {
  const { title, image, readingTime, createdAt, excerpt,slug } = post;
  return (
    <div className='card image-full lg:card-side bg-base-100 shadow-sm'>
      <figure>
        <img
          className='h-[30vh] md:h-[50vh] w-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out'
          src={image}
          alt='Album'
        />
      </figure>
      <div className='card-body'>
        <div className='badge badge-primary'>Technology</div>
        <h2 className='card-title text-5xl mt-3'>{title}</h2>
        <p className='line-clamp-3'>{excerpt}</p>

        <div className='flex card-actions justify-between align-baseline'>
          <Link
            to={`/post/${slug}`}
            className='link link-hover text-xl font-semibold'
          >
            Read more...
          </Link>

          <div className='flex text-sm text-gray-400 gap-3 justify-between max-w-fit'>
            <p className='inline-flex gap-2'>
              <CalendarDaysIcon className='h-5 w-5' />
              <span>{formatDate(createdAt)}</span>
            </p>
            <p className='inline-flex gap-2'>
              <ClockIcon className='h-5 w-5' />
              <span>{readingTime} min read</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPostCard;
