import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;