import axios from "axios";
import { ERROR_CODES, TOKEN } from "@/common/constants";
import { PRIVATE_ROUTES } from "@/common/routes";
import { getDataFromLocalStorage } from "@/common/utils";

const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

service.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? getDataFromLocalStorage(TOKEN) : "";
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

service.interceptors.response.use(
  (value: any) => Promise.resolve(value),
  (error: any) => {
    if (error.code === ERROR_CODES.ERROR_NETWORK) {
      const data = {
        data: null,
        error: {
          code: ERROR_CODES.ERROR_NETWORK,
          message: error.message,
        },
      };
      error.response.data = data;
      return Promise.reject(error);
    } else if (error?.response?.status === ERROR_CODES.ERROR_UNAUTHORIZED) {
      window.location.href = PRIVATE_ROUTES.LOGIN;
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default service;
