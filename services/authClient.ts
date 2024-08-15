import axios from "axios";
import {
  getAccessToken,
  getRefreshToken,
  setTokens,
  clearTokens,
} from "./asyncStorage"; // Use AsyncStorage instead of localStorage
import { BASE_URL } from "@/constants/api";

// Create an Axios instance
const authClient = axios.create({
  baseURL: BASE_URL,
  headers: { Accept: "application/json" },
});

// Request Interceptor to add Authorization token
authClient.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken(); // Use AsyncStorage to retrieve token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor to handle token refresh and errors
authClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 500) &&
      originalRequest.url === `${BASE_URL}/auth/token/refresh`
    ) {
      await clearTokens(); // Clear tokens if refresh token fails
      // Redirect user to login screen (adjust this depending on your navigation setup)
      // e.g., NavigationService.navigate('Login');
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      originalRequest.url === `/auth/token/pointclickcare/onboarding`
    ) {
      return Promise.reject(error);
    }

    if (error.response && error.response.status === 401) {
      const refreshToken = await getRefreshToken(); // Retrieve refresh token

      if (!refreshToken) {
        // Redirect user to login screen if no refresh token is available
        // e.g., NavigationService.navigate('Login');
        return Promise.reject(error);
      }

      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await authClient.post(`${BASE_URL}/auth/token/refresh`, {
            refreshToken,
          });

          if (res.status === 200) {
            const {
              access_token: accessToken,
              refresh_token: newRefreshToken,
            } = res.data || {};
            await setTokens({
              access_token: accessToken,
              refresh_token: newRefreshToken,
            });
            authClient.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            return authClient(originalRequest);
          }
        } catch (tokenRefreshError) {
          await clearTokens();
          // Redirect to login on token refresh failure
          // e.g., NavigationService.navigate('Login');
          return Promise.reject(tokenRefreshError);
        }
      }
    }

    if (error.response) {
      if (__DEV__) {
        console.log("Response Error:", error.response.data);
        console.log("Status:", error.response.status);
        console.log("Headers:", error.response.headers);
      }
    } else if (error.request) {
      if (__DEV__) {
        console.log("No Response:", error.request);
      }
      return Promise.reject({
        response: {
          data: "Unexpected error while sending request. Please check your internet connection",
        },
      });
    } else {
      if (__DEV__) {
        console.log("Request Error:", error.message);
      }
    }
    return Promise.reject(error);
  }
);

export default authClient;
