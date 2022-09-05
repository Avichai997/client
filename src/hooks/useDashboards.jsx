import { useQuery, useQueryClient } from '@tanstack/react-query';

export const useDashboards = (props) => {
  // const queryClient = useQueryClient();
  console.log(props?.options)
  const { data: dashboards } = useQuery(['dashboards', props?.params || ''], {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.data;
    },
    ...props?.options
  });

  function setLoadStatus(dashboardId) {
    // queryClient.setQueryData('dashboards', data => {
    //   dashboardId
    // })
  }

  return { dashboards, setLoadStatus };
};
