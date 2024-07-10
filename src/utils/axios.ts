import axios, { AxiosInstance } from "axios";
import { baseUrl } from "./constants";
import Cookies from "js-cookie";

const instance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

export default instance;
