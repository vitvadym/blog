import { FaceFrownIcon } from '@heroicons/react/20/solid';

const NoData = () => {
  return (
    <div className='flex items-center justify-center p-10'>
      <FaceFrownIcon
        height={60}
        className='mr-2'
      />
      <span>No data</span>
    </div>
  );
};

export default NoData;
