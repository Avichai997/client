import { useQuery } from '@tanstack/react-query';

export const useDashboards = () => {
  return useQuery(['dashboards'], {
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    select: (data) => {
      return data.data;
    },
  })
}