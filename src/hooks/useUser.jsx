import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useAuth } from 'hooks/useAuth';
import axiosClient from 'utils/axiosClient';

const getUser = async (user) => {
  if (!user) return null;
  console.log(user);

  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/api/users/${user.id || user._id}`,
    {
      headers: { Authorization: `Bearer ${user.token}` },
    }
  );

  data.token = user.token;
  data.tokenExpiration = user.tokenExpiration;
  return data;
};

const getStoredUser = () => JSON.parse(localStorage.getItem('user'));

export const useUser = () => {
  const { updateLocaleStorage } = useAuth();

  // when stored user data become stale - refetch user to check he is still active
  const { data: user } = useQuery(['user'], () => getUser(user), {
    staleTime: 60 * 60 * 1000, // 1 hour
    initialData: getStoredUser,
    onSuccess: (data) => {
      updateLocaleStorage(data);
    },
    onError: (error) => {
      console.log('no user');
    },
  });

  const { data: csrfToken } = useQuery(['users/csrfToken'], {
    onSuccess: (data) =>
      (axiosClient.defaults.headers.post['X-CSRF-Token'] = data.data.csrfToken),
  });

  return {
    user,
    csrfToken,
  };
};
