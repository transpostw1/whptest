import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./constants";
import Cookies from "js-cookie";

const getLocalToken = () => {
  if (typeof window !== "undefined") {
    // Only execute this code in the browser
    return localStorage.getItem("localtoken");
  }
  return null;
};

const CookieToken = getLocalToken();

const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${CookieToken}`,
  },
});

export default instance;
