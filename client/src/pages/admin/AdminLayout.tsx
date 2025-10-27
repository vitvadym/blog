import { Outlet } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import { Toaster } from 'sonner';

const AdminLayout = () => {
  return (
    <div
      className='flex h-screen'
      data-theme='dim'
    >
      <Sidebar />
      <main className='flex-1 p-4 md:p-10'>
        <Outlet />
      </main>
      <Toaster position='top-right' richColors />
    </div>
  );
};

export default AdminLayout;
