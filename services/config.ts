import ROUTES from "@/common/routes";
import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:3000",
});

service.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined"
      ? window.atob(`${localStorage.getItem("token")}`)
      : "";
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

service.interceptors.response.use(
  (value: any) => Promise.resolve(value),
  (error: any) => {
    if (error.code === "ERR_NETWORK") {
      const data = {
        data: null,
        error: {
          code: "ERR_NETWORK",
          message: error.message,
        },
      };
      error.response.data = data;
      return Promise.reject(error);
    } else if (error?.response?.status === 401) {
      window.location.href = ROUTES.LOGIN;
      return Promise.reject(error);
    }
    return Promise.reject(error);
  }
);

export default service;
