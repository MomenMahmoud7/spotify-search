import axios from 'axios';

const backendUrl = process.env.REACT_APP_BACKEND_URL ?? '';

const axiosInstance = axios.create({
  baseURL: backendUrl,
});

export default axiosInstance;
