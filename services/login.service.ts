import { REFRESH_TOKEN, TOKEN } from "@/common/constants";
import { SERVICE_GAUTH } from "@/common/routes";
import service from "./config";

export const getLoginData = async (codeResponse?: any) => {
  try {
    const response = await service.post(SERVICE_GAUTH.LOGIN, {
      authorizationCode: codeResponse.code,
    });
    return { data: response.data.data, error: null };
  } catch (error) {
    return { data: null, error: error };
  }
};

export const getAccessToken = async () => {
  try {
    const response = await service.post(SERVICE_GAUTH.GET_ACCESS_TOKEN, null, {
      params: { refreshToken: localStorage.getItem(REFRESH_TOKEN) },
    });
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllFeatureAccess = async () => {
  try {
    const response = await service.get(SERVICE_GAUTH.FEATURE_ACCESS);
    return response.data;
  } catch (error) {
    return { data: null, error: error };
  }
};

export const getUserDetail = async () => {
  try {
    const response = await service.get(SERVICE_GAUTH.GET_USER_DETAILS);
    return response.data;
  } catch (error) {
    return { data: null, error: error };
  }
};
