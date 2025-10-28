import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import FeaturedPostCard from './FeaturedPostCard';
import { postService } from '../api/postService';
import { useQuery } from '@tanstack/react-query';
import type { IPost } from '../types';
import PageLoader from './PageLoader';

const setttings = {
  infinite: true,
  speed: 500,
  adaptiveHeight: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  // vertical: true,
  // verticalSwiping: true,
};

const FeaturedPosts = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['featuredPosts'],
    queryFn: () =>
      postService.getFeaturedPosts<{
        message: string;
        posts: IPost[];
      }>(),
  });

  return (
    <div className='overflow-hidden'>
      {isLoading && <PageLoader />}
    <div className='slider-container'>
      <Slider {...setttings}>
        {data?.posts.map((post) => (
          <FeaturedPostCard
            key={post.slug}
            post={post}
          />
        ))}
      </Slider>
    </div>
    </div>
  );
};

export default FeaturedPosts;
