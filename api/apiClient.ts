import axios from 'axios';

const FLATLY_BASE_URL = "http://3.67.172.45:8080"

const apiClient = axios.create({
  baseURL: FLATLY_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;