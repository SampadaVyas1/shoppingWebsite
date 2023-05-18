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
