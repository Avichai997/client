import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useDashboards = () => {
  // const queryClient = useQueryClient();

  const { data: dashboards } = useQuery(['dashboards'], {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.data;
    },
  });

  function setLoadStatus(dashboardId) {
    // queryClient.setQueryData('dashboards', data => {
    //   dashboardId
    // })

  }

  return { dashboards, setLoadStatus };
};
