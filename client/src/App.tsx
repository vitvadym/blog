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


  return <RouterProvider router={router} />;
}