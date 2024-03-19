import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./constants";
import Cookies from "js-cookie";

const getLocalToken = () => {
  console.log("calling get token");

  return Cookies.get("localtoken");
};

const CookieToken = getLocalToken();
console.log(CookieToken, "COOKIE TOKEN CONSOLED");

const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${CookieToken}`,
  },
});

//request.interceptor//
instance.interceptors.response.use(
  (response) => {
    console.log("uuuu");
    const refreshToken = response.headers["refreshed_token"];
    console.log(response, "maan");
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
