import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./constants";
import Cookies from "js-cookie";

const getLocalToken = () => {
  return typeof window !== "undefined"? localStorage.getItem("localtoken"):null;
};

const CookieToken = getLocalToken();

const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${CookieToken}`,
  },
});

export default instance;
