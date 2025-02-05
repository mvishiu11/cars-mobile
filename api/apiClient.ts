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

// REQUEST INTERCEPTOR: logs every request
apiClient.interceptors.request.use(
  (config) => {
    console.log("Axios Request:", {
      method: config.method,
      url: config.url,
      params: config.params,
      data: config.data,
      headers: config.headers,
    });
    return config;
  },
  (error) => {
    console.log("Axios Request Error:", error);
    return Promise.reject(error);
  }
);

// RESPONSE INTERCEPTOR: logs every response (or error)
apiClient.interceptors.response.use(
  (response) => {
    console.log("Axios Response:", {
      status: response.status,
      data: response.data,
      headers: response.headers,
      config: response.config,
    });
    return response;
  },
  (error) => {
    console.log("Axios Response Error:", {
      message: error.message,
      response: error.response,
    });
    return Promise.reject(error);
  }
);

export default apiClient;
