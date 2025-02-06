import axios from 'axios';
import * as Location from 'expo-location'; // Import Expo Location API

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL;
console.log(API_BASE_URL);

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

let authToken: string | null = null;

// Function to set Authorization Token
export function setAuthToken(token: string) {
  authToken = token;
  console.log('Token set:', authToken);
}

const DEFAULT_COORDINATES = "21.1311;52.1337"; // Warsaw

async function getLocationHeader() {
  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.warn("Location permission denied.");
      return DEFAULT_COORDINATES;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.High,
    });

    return `${location.coords.longitude};${location.coords.latitude}`;
  } catch (error) {
    console.error("Error getting location:", error);
    return DEFAULT_COORDINATES;
  }
}

// Add a request interceptor to attach the Bearer token & coordinates
apiClient.interceptors.request.use(
  async (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    const coordinates = await getLocationHeader();
    console.log('Coordinates:', coordinates);
    if (coordinates) {
      config.headers["X-Coordinates"] = coordinates;
    }

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