import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000',  // Adjust the backend URL as needed
});

export default axiosInstance;
