import { useQuery, useQueryClient } from '@tanstack/react-query';

// GET customers types data
export const useCustomersTypes = (props) => {

  // const queryClient = useQueryClient();

  const { data: customersTypes } = useQuery(['types', props?.params || ''], {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.data;
    },
    ...props?.options
  });

  return { customersTypes };
};
