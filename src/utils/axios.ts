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

<<<<<<< HEAD
const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});
=======
const getLocalToken = () => {
>>>>>>> bc1fd5c9fbef04c0d77af7675fc585cc17f2cb6d

// Add a function to get the local token from cookies
const getLocalToken = () => {
  return Cookies.get("localtoken");
};

<<<<<<< HEAD
// Add a function to update the local token in cookies
const updateLocalToken = (token: string) => {
  Cookies.set("localtoken", token);
};

// Set the initial Authorization header
instance.defaults.headers.common["Authorization"] = `Bearer ${getLocalToken()}`;
=======
const CookieToken = getLocalToken();

const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    Authorization: `Bearer ${CookieToken}`
  },
});
>>>>>>> bc1fd5c9fbef04c0d77af7675fc585cc17f2cb6d

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
