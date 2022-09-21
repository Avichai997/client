import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import Swal from 'sweetalert2';
import './index.scss';
import App from './App';
import { ToastError } from 'components/Toasts';
import axiosClient from 'utils/axiosClient';

const Minute = 60 * 1000;

const defaultQueryFn = async ({ queryKey: [path, params = ''] }) => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;

  const { data } = await axiosClient.get(`/api/${path}${params}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
// const defaultQueryFn = async ({ queryKey: [path, params = ''] }) => {
//   const { data } = await axios.get(
//     `${process.env.REACT_APP_API_URL}/api/${path}${params}`
//   );
//   return data;
// };

const defaultMutationFn = async ({ method, path, data }) => {
  const { data: mutatedData } = await axios({
    method,
    url: `${process.env.REACT_APP_API_URL}/api/${path}`,
    data,
    // authorization
  });
  return mutatedData;
};

async function queryErrorHandler(error) {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  let errorMsg = error instanceof Error ? error.message : 'שגיאה בהתחברות לשרת';
  // if(error.response.statusText === "Unauthorized")

  if (errorMsg === 'Request failed with status code 404')
    errorMsg = 'שגיאה בהתחברות לשרת';

  ToastError(errorMsg);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      onError: queryErrorHandler,
      // refetchOnReconnect: true, // on reconnect internet, defualt is True
      // refetchOnWindowFocus: true,
      // refetchOnMount: false, // If true, the query will re-fetch on mount if the cached data is stale
      // refetchInterval: false, // refetch again after every millisecond
      staleTime: 5 * Minute, // 5 minutes default
      cacheTime: Infinity, // 5 minutes default
    },
    mutations: {
      mutationFn: defaultMutationFn,
      onError: queryErrorHandler,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
      <ReactQueryDevtools />
    </BrowserRouter>
  </QueryClientProvider>
);
