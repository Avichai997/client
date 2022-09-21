import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from 'hooks/useAuth';

const getUser = async (user) => {
  if (!user) return null;

  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/users/${user.id}`,
    {
      headers: { Authorization: `Bearer ${user.token}` },
    }
  );

  return data.data;
};

const getStoredUser = () => JSON.parse(localStorage.getItem('user'));

export const useUser = () => {
  const { updateLocaleStorage } = useAuth();
  const queryClient = useQueryClient();

  const { data: user } = useQuery(['user'], () => getUser(user), {
    initialData: getStoredUser,
    onSuccess: (data) => {
      updateLocaleStorage(data);
    },
    onError: (error) => {
      console.log('no user')
    },
  });

  return {
    user,
  };
};
