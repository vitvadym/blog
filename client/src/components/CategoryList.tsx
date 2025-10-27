import { useSearchParams } from 'react-router-dom';
import { categoryService } from '../api/categoryService';
import { XMarkIcon } from '@heroicons/react/20/solid';

import { useQuery } from '@tanstack/react-query';
import type { ICategory } from '../types';

const CategoryList = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory = Number(searchParams.get('category')) || null;

  const handleCategoryChange = (category: ICategory) => {
    searchParams.set('category', category.id.toString());
    searchParams.set('page', '1');
    setSearchParams(searchParams);
  };

  const handleClearCategory = () => {
    searchParams.delete('category');
    setSearchParams(searchParams);
  };


  const { data } = useQuery({
    queryKey: ['categories'],
    queryFn: () =>
      categoryService.getAllCategories<{
        message: string;
        categories: ICategory[];
      }>(),
  });

  return (
    <div className='flex justify-center mb-3.5'>
      <ul className='flex gap-1.5 menu menu-horizontal rounded-box'>
        {data?.categories.map((category) => (
          <li key={category.id}>
            <button
              className={`${
                selectedCategory === category.id ? 'menu-active' : ''
              }`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.name}
            </button>
          </li>
        ))}
        {selectedCategory && (
          <button
            data-tip='Clear category'
            className='btn btn-info btn-circle btn-sm tooltip'
            onClick={handleClearCategory}
          >
            <XMarkIcon className='h-5 w-5' />
          </button>
        )}
      </ul>
    </div>
  );
};

export default CategoryList;
