import axios, { AxiosError } from 'axios';

const API_URL = process.env.REACT_APP_API_URL as string;
const axiosInstance = axios.create({ baseURL: API_URL });

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token && config.headers) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  async (error: AxiosError & { config?: any }) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken });
          localStorage.setItem('accessToken', data.accessToken);
          localStorage.setItem('refreshToken', data.refreshToken);
          if (config.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${data.accessToken}`;
          }
          return axiosInstance(originalRequest);
        } catch {}
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;