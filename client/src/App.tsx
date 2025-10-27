import { RouterProvider } from 'react-router-dom';
import router from './router/router';
import { authService } from './api/authService';
import useAuthStore, { type AuthStore } from './store/authStore';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function App() {
  const { login } = useAuthStore();
  const { data, isSuccess } = useQuery<AuthStore>({
    queryKey: ['me'],
    queryFn: () => authService.me(),
  });

  useEffect(() => {
    if (isSuccess && data) {
      login(data);
    }
  }, []);

  console.log(data);

  return <RouterProvider router={router} />;
}

/* 
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Assuming you have an AuthContext

const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useAuth(); // Get user and their role from context

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />; // Or render an unauthorized message
  }

  return <Outlet />; // Render the child routes if authorized
};

*/

/*
// ... (previous imports and setup)

const router = createBrowserRouter([
  // ... (client routes)
  {
    path: '/admin',
    element: <ProtectedRoute allowedRoles={['admin']} />, // Protect admin routes
    children: [
      { element: <AdminLayout />, // Render AdminLayout inside ProtectedRoute
        children: [
          { index: true, element: <AdminDashboard /> },
          { path: 'settings', element: <AdminSettings /> },
        ]
      },
    ],
  },
  // ... (login route)
]);
*/
