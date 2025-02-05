import axios from 'axios';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let authToken: string | null = null;

export function setAuthToken(token: string) {
  authToken = token;
  console.log('Token set:', authToken);
}

// Add a request interceptor to attach the Bearer token
apiClient.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;