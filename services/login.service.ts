import { REFRESH_TOKEN, TOKEN } from "@/common/constants";
import service from "./config";

export const getLoginData = async (codeResponse?: any) => {
  try {
    const response = await service.post("/auth/login", {
      authorizationCode: codeResponse.code,
    });
    return { data: response.data.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const getAccessToken = async () => {
  try {
    const response = await service.post(`/auth/getNewAccessToken`, null, {
      params: { refreshToken: localStorage.getItem(REFRESH_TOKEN) },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDummyData = async () => {
  try {
    const response = await service.get(`/auth/checkHealthStatus`);
    return response;
  } catch (error) {
    return { data: null, error: error };
  }
};
