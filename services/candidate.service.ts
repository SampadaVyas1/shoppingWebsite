import { API_ROUTES } from "@/common/routes";
import service from "./config";

export const getCandidatesService = async (params?: any) => {
  delete params.hasOutsideData;
  try {
    const response = await service.post(
      API_ROUTES.GET_CANDIDATES,
      params ? params : {}
    );
    return response?.data?.data;
  } catch (error) {
    return error;
  }
};

export const getFilterService = async () => {
  try {
    const response = await service.get(API_ROUTES.GET_FILTER);
    return response?.data?.data;
  } catch (error) {
    return error;
  }
};

export const addCandidatesService = async (params?: any) => {
  try {
    const response = await service.post(API_ROUTES.ADD_CANDIDATES, params);
    return response;
  } catch (error) {
    return error;
  }
};
