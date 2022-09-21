import axios from 'axios';

const Minute = 60 * 1000;

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // withCredentials: true, // Allow Cookies
});
// axiosInterceptor.defaults.headers.common['Content-Type'] = 'application/json';
// axiosClient.defaults.headers.Authorization = `Bearer ${user.token}`;

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const errMessage = error.response.data.message;
    if (errMessage.includes('not logged in') && !originalRequest._retry) {
      originalRequest._retry = true;
      // await refreshAccessTokenFn();
      // return authApi(originalRequest);
    }
    return Promise.reject(error);
  }
);

export const getJWTHeader = (user) => {
  if (!user) return;
  
  return {
    Authorization: `Bearer ${user.token}`,
  };
};

export default axiosClient;
