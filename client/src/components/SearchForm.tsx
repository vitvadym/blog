import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

const SearchForm = () => {
  return (
    <form className='text-center mb-6 mt-6'>
      <label className='input input-lg outline-0'>
        <input
          type='search'
          required
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
