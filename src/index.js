import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import axios from 'axios';
import Swal from 'sweetalert2';
import './index.scss';
import App from './App';

const defaultQueryFn = async ({ queryKey }) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/${queryKey[0]}`
  );
  return data;
};

const defaultMutationFn = async ({ method, path, data }) => {
  const { data: mutatedData } = await axios({
    method,
    url: `${process.env.REACT_APP_API_URL}/${path}`,
    data,
  });
  return mutatedData;
};

async function queryErrorHandler(error) {
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  let title = error instanceof Error ? error.message : 'שגיאה בהתחברות לשרת';
  if (title === 'Request failed with status code 404')
    title = 'שגיאה בהתחברות לשרת';

  const Toast = Swal.mixin({
    toast: true,
    icon: 'success',
    title: 'General Title',
    animation: true,
    position: 'top-right',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  await Toast.fire({
    title,
    icon: 'error',
  });
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      onError: queryErrorHandler,
      // refetchOnReconnect: true,
      // refetchOnWindowFocus: true,
      // refetchInterval: false,
      // staleTime: Infinity,
      // cacheTime: 300000, // 5 minutes default
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
