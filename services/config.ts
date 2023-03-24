import { useRouter } from "next/router";
import axios from "axios";
import { getDataFromLocalStorage } from "@/common/utils";
import useRefeshToken from "@/hooks/useRefeshToken/useRefeshToken";
import { ERROR_CODES, TOKEN, USER_TOKEN } from "@/common/constants";
import { PRIVATE_ROUTES } from "@/common/routes";

const service = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});
service.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? getDataFromLocalStorage(TOKEN) : "";
  const userToken =
    typeof window !== "undefined" ? getDataFromLocalStorage(USER_TOKEN) : "";
  if (token) {
    config.headers.Authorization = token;
    config.headers.userToken = userToken;
  }
  return config;
});
service.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const token = localStorage.getItem(TOKEN);
    if (
      error?.response?.status == 403 &&
      token != undefined &&
      token !== null
    ) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const refresh = useRefeshToken();
        const res = await refresh();
        if (res.status === 200) {
          const newToken = localStorage.getItem(TOKEN);
          originalRequest.headers.Authorization = newToken;
          return axios(originalRequest);
        }
      }
    } else {
      window.location.href = PRIVATE_ROUTES.LOGIN;
    }
    return Promise.reject(error);
  }
);
export default service;
