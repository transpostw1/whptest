import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./constants";
import Cookies from "js-cookie";

const getLocalToken = () => {

  return Cookies.get("localtoken");
};

const CookieToken = getLocalToken();

const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${CookieToken}`
  },
});

//request.interceptor//
instance.interceptors.response.use(
  (response) => {
    const refreshToken = response.headers["refreshed_token"];
    if (refreshToken) {
      ("IN");
      Cookies.set("localtoken", refreshToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
