import { SERVICE_WHATSAPP } from "@/common/routes";
import service from "./config";

export const getAllTemplates = async () => {
  try {
    const response = await service.get(SERVICE_WHATSAPP.GET_ALL_TEMPLATES);
    return response;
  } catch (error) {
    return { data: null, error: error };
  }
};

export const getRoomData = async (params?: any) => {
  delete params.hasOutsideData;
  try {
    const { data } = await service.post(SERVICE_WHATSAPP.GET_ROOM_DATA, params);
    return data?.data;
  } catch (error) {
    return error;
  }
};
