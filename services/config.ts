import axios from "axios";
import { googleLogout } from "@react-oauth/google";
import { getDataFromLocalStorage, setDataInLocalStorage } from "@/common/utils";
import { ERROR_CODES, TOKEN, USER_TOKEN } from "@/common/constants";
import { PRIVATE_ROUTES } from "@/common/routes";
import { getAccessToken, logoutUser } from "./login.service";
import { createDataForSync } from "@/common/utils/dbUtils";
import { syncChat } from "./messages.service";

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
    } 
    else if (
      error?.response?.status == ERROR_CODES.ERROR_FORBIDDEN &&
      !!token
    ) {
      if (!originalRequest._retry) {
        originalRequest._retry = true;
        const response = await getAccessToken();
        if (response?.status === ERROR_CODES.STATUS_OK) {
          const { data } = response.data;
          setDataInLocalStorage(TOKEN, data.accessToken);
          originalRequest.headers.Authorization = data.accessToken;
          return axios(originalRequest);
        } 
        else {
          const syncData = await createDataForSync();
          const result = await syncChat(syncData);
          localStorage.clear();
          window.location.href = PRIVATE_ROUTES.LOGIN;
          googleLogout();
        }
        
      }
    } else if (
      error?.response?.status == ERROR_CODES.ERROR_UNAUTHORIZED &&
      !!token
    ) {
      const syncData = await createDataForSync();
      const result = await syncChat(syncData);
      const isLogout = await logoutUser();
      if (isLogout?.data) {
        window.location.href = PRIVATE_ROUTES.LOGIN;
        googleLogout();
        localStorage.clear();
      }
    }
    return Promise.reject(error);
  }
);
export default service;
