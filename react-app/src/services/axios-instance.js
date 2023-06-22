import axios from 'axios';

// create a new instance of axios
const axiosInstance = axios.create();

// add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // add the token to the request header
    const token = localStorage.getItem('token');
    config.headers.authtoken = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;