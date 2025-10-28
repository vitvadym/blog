import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../api/authService';
import useAuthStore, { type AuthStore } from '../store/authStore';
import type { AxiosError } from 'axios';
import Fieldset from './Fieldset';

const LoginForm = () => {
  const [email, setEmail] = useState<string>(
    import.meta.env.VITE_DEFAULT_ADMIN_EMAIL,
  );
  const [password, setPassword] = useState<string>(
    import.meta.env.VITE_DEFAULT_ADMIN_PASSWORD,
  );

  const { login } = useAuthStore();

  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: () =>
      authService.login<{ password: string; email: string }, AuthStore>({
        email,
        password,
      }),
    onSuccess: (data) => {
      navigate('/admin');
      login(data);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate();
  };

  return (
    <form
      className='max-w-[350px] p-10 flex flex-col gap-4 shadow-md'
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className='text-2xl font-semibold text-center'>Admin Login</h2>
        <p className='text-center text-sm py-1.5 text-gray-500'>
          Enter your credentials to access the dashboard
        </p>
      </div>

      <Fieldset
        type='text'
        legend='Email'
        value={email}
        onChange={(value) => setEmail(value as string)}
      />

      <Fieldset
        type='password'
        legend='Password'
        value={password}
        onChange={(value) => setPassword(value as string)}
      />

      <button
        type='submit'
        className='btn btn-primary'
        disabled={isPending}
      >
        {isPending ? <span className='loading' /> : 'Login'}
      </button>
      {error && (
        <p className='text-error'>
          {(error as AxiosError<{ message: string }>)?.response?.data
            ?.message || 'An error occurred'}
        </p>
      )}
    </form>
  );
};

export default LoginForm;
