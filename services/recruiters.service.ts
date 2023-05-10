import service from "./config";
import { API_ROUTES } from "@/common/routes";

export const getAllRecruiterService = async (filters?: any) => {
  try {
    const response = await service.post(API_ROUTES.GET_RECRUITER, filters);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateRecruiterService = async (
  employeeId: number,
  isActive: boolean
) => {
  try {
    const response = await service.put(
      API_ROUTES.UPDATE_RECRUITER,
      { isActive },
      {
        params: {
          id: employeeId,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
