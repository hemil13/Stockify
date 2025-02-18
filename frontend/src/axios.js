import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://stockify-sw2u.vercel.app/',  // Adjust the backend URL as needed
});

export default axiosInstance;
