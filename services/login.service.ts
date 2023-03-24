import { REFRESH_TOKEN, TOKEN } from "@/common/constants";
import { API_ROUTES } from "@/common/routes";
import service from "./config";

export const getLoginData = async (codeResponse?: any) => {
  try {
    const response = await service.post(API_ROUTES.LOGIN, {
      authorizationCode: codeResponse.code,
    });
    return { data: response.data.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const getAccessToken = async () => {
  try {
    const response = await service.post(API_ROUTES.GET_ACCESS_TOKEN, null, {
      params: { refreshToken: localStorage.getItem(REFRESH_TOKEN) },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getDummyData = async () => {
  try {
    const response = await service.get(API_ROUTES.CHECK_TOKEN);
    return response;
  } catch (error) {
    return { data: null, error: error };
  }
};
