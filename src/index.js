import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import axios from 'axios';
import './index.css';
import App from './App';

const defaultQueryFn = async ({ queryKey: [path, params] }) => {
  const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/${path}`, {
    params,
  });
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
      refetchInterval: false,
      staleTime: Infinity,
    },
    mutations: {
      mutationFn: defaultMutationFn,
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
