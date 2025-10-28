import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const SearchForm = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm , setSearchTerm] = useState('');

  const handleChangeSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = event.target.value.toLowerCase().trim();
    setSearchTerm(formattedValue);
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearchParams({ search: searchTerm });
  };

  const handleReset = () => {
    setSearchTerm('');
    searchParams.delete('search');
    setSearchParams(searchParams);
  }

  useEffect(() => {
    if (!searchTerm) {
      handleReset()
    }
  }, [searchTerm]);

  return (
    <form className='text-center mb-6 mt-6' onSubmit={handleSubmit}>
      <label className='input input-lg outline-0'>
        <input
          type='search'
          required
          value={searchTerm}
          onChange={handleChangeSearchTerm}
          placeholder='Search posts...'
        />
        <button
          type='submit'
          className='btn btn-circle btn-ghost'
        >
          <MagnifyingGlassIcon className='w-5 h-5' />
        </button>
      </label>
    </form>
  );
};

export default SearchForm;
