import { UserMinusIcon } from '@heroicons/react/20/solid';
import { authService } from '../api/authService';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const { mutate } = useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: (data) => {
      navigate('/');
      logout();
      console.log(data)
    },
  });

  return (
    <button
      className='btn btn-ghost'
      onClick={() => mutate()}
    >
      <UserMinusIcon className='h-5 w-5' />
      <span className='hidden md:inline-block'>Logout</span>
    </button>
  );
};
export default Logout;
