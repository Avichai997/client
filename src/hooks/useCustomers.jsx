import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useCustomers = (props) => {
  // const queryClient = useQueryClient();

  const { data: customers } = useQuery(['customers', props?.params || ''], {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.data;
    },
    ...props?.options
  });

  return { customers };
};
