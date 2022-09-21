import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from 'hooks/useUser';

export const useUsers = (props) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const { data: users } = useQuery(['users', props?.params || ''], {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    enabled: !!user,
    select: (data) => {
      return data.data;
    },
    ...props?.options,
  });

  return {
    users,
  };
};
