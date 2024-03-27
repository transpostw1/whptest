// import axios, { AxiosInstance } from "axios";
// import { baseUrl } from "./constants";
// import Cookies from "js-cookie";

// const getLocalToken = () => {


//   return Cookies.get("localtoken");
// };

// const CookieToken = getLocalToken();
// console.log(CookieToken, "COOKIE TOKEN CONSOLED");

// const instance: AxiosInstance = axios.create({
//   baseURL: baseUrl,
//   headers: {
//     Authorization: `Bearer ${CookieToken}`,
//   },
// });

// //request.interceptor//
// instance.interceptors.response.use(
//   (response) => {

//     const refreshToken = response.headers["refreshed_token"];
//     if (refreshToken) {
//       ("IN");
//       Cookies.set("localtoken", refreshToken);
//     }
//     return response;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default instance;




import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./constants";
import Cookies from "js-cookie";


// Add a function to get the local token from cookies
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

// Add a response interceptor to update the local token if a new one is provided
instance.interceptors.response.use(
  (response) => {
    const refreshToken = response.headers["refreshed_token"];
    if (refreshToken) {
      updateLocalToken(refreshToken);
      // Update the Authorization header with the new token
      instance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${refreshToken}`;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;