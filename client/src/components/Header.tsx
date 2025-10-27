import { Link } from 'react-router-dom';
import { SunIcon, MoonIcon, PencilSquareIcon } from '@heroicons/react/20/solid';
import { useEffect } from 'react';
import useThemeStore from '../store/themeStore';
import useAuthStore from '../store/authStore';

const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();
  const { isAuth, role } = useAuthStore();

  const isAdmin = isAuth && role === 'admin';

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      isDarkMode ? 'dim' : 'lofi',
    );
  }, [isDarkMode]);

  return (
    <nav className='navbar mb-3 justify-between'>
      <div className='flex-start'>
        <Link
          to='/'
          className=' flex items-center gap-2'
        >
          <PencilSquareIcon className='h-6 w-6' />
          Grasp
        </Link>
      </div>
      <div className='flex-none'>
        <ul className='menu menu-horizontal px-1'>
          <li>
            <label className='swap swap-rotate mr-1.5'>
              <input
                type='checkbox'
                checked={isDarkMode}
                className='theme-controller'
                onChange={() => toggleTheme()}
                // value='synthwave'
              />
              <SunIcon className='swap-off h-6 w-6' />
              <MoonIcon className='swap-on h-6 w-6' />
            </label>
          </li>
          <li>
            <Link to={isAdmin ? '/admin' : '/login'}>
              {isAdmin ? 'Dashboard' : 'Login'}
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
