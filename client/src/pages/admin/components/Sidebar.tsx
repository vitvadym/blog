import { Link, NavLink } from 'react-router-dom';
import { ArrowLongLeftIcon } from '@heroicons/react/20/solid';
import { SIDEBAR_MENU_ITEMS } from '../../../constants';
import Logout from '../../../components/Logout';

const Sidebar = () => {
  return (
    <ul className='menu menu-lg bg-base-200 max-w-fit rounded-box p-4'>
      <div className='mb-2 flex gap-2 flex-col'>
      <Logout />

      <Link to='/'>
        <button className=' btn btn-ghost mb-3.5'>
          <ArrowLongLeftIcon className='h-5 w-5' />
          <span className='hidden md:inline-block'>Back to site</span>
        </button>
      </Link>
      </div>

      {SIDEBAR_MENU_ITEMS.map(({ name, path, icon }) => (
        <li
          key={name}
          className='mb-2.5'
        >
          <NavLink
            end
            to={path}
            className={({ isActive }) => (isActive ? 'menu-active' : '')}
          >
            {icon}
            <span className='hidden md:inline-block'>{name}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Sidebar;
