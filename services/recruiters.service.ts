import service from "./config";
import { SERVICE_TPI } from "@/common/routes";

export const getAllRecruiterService = async (filters?: any) => {
  try {
    const response = await service.post(SERVICE_TPI.GET_RECRUITER, filters);
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
      SERVICE_TPI.UPDATE_RECRUITER,
      { isActive },
      {
        params: {
          id: employeeId,
        },
      }
    );
    return response.data;
  } catch (error: any) {
    console.log(error);
    return error?.response.data;
  }
};
