import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useDashboards = (props) => {
  // const queryClient = useQueryClient();

  const { data: dashboards } = useQuery(['dashboards', props?.params || ''], {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.data;
    },
    ...props?.options
  });

  return { dashboards };
};
