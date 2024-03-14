import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./constants";
import { auth } from "@/app/config";

const instance: AxiosInstance = axios.create({
  baseURL: baseUrl, // Add baseURL here
});

instance.interceptors.request.use(
  async (config) => {
    try {
      // Get the Firebase auth token result
      const tokenResult = await auth.currentUser?.getIdTokenResult(true); // Force refresh

      if (tokenResult) {
        const token = tokenResult.token;

        console.log(token, "Interceptor token");
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Error getting ID token result:", error);
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
