





// import axios, { AxiosInstance } from "axios";
// import { baseUrl } from "./constants";
// import Cookies from "js-cookie";

// const instance: AxiosInstance = axios.create({
//   baseURL: baseUrl,
// });

// // Add a function to get the local token from cookies

// const getLocalToken = () => {
//   return Cookies.get("localtoken");
// };

// // Add a function to update the local token in cookies

// const updateLocalToken = (token: string) => {
//   Cookies.set("localtoken", token);
// };

// // Set the initial Authorization header
// // instance.defaults.headers.common["Authorization"] = `Bearer ${getLocalToken()}`;

// instance.interceptors.request.use(
//   (config) => {
//     const tokenString =  `Bearer ${getLocalToken()}`;
//     if (tokenString) {
//       config.headers.Authorization = tokenString;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Add a response interceptor to update the local token if a new one is provided
// instance.interceptors.response.use(
//   (response) => {
//     const refreshToken = response.headers["refreshed_token"];
//     if (refreshToken) {
//       updateLocalToken(refreshToken);
//       // Update the Authorization header with the new token
//       instance.defaults.headers.common[
//         "Authorization"
//       ] = `Bearer ${refreshToken}`;
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
