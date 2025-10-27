import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute = () => {
  const { isAuth, role } = useAuthStore();
  if (!isAuth && role !== 'admin') {
    return (
      <Navigate
        to='/'
        replace
      />
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
