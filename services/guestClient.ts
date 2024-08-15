import { PUBLIC_BASE_URL } from "@/app/constants/api";
import axios from "axios";

const guestClient = axios.create({
  baseURL: PUBLIC_BASE_URL,
  headers: { Accept: "application/json" },
});

// Request Interceptor
guestClient.interceptors.request.use(
  (config) => {
    // Modify config if needed before the request is sent
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

// Response Interceptor
guestClient.interceptors.response.use(
  async (response) => {
    // Any status code within the range of 2xx will trigger this function
    return response;
  },
  (error) => {
    // Any status code outside the range of 2xx will trigger this function
    return Promise.reject(error.response); // Note: error.response is used for Axios error objects
  }
);

export default guestClient;
