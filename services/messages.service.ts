import service from "./config";

export const getAllTemplates = async () => {
  try {
    const response = await service.get(`/wa/whatsapp/getAllTemplates`);
    return response;
  } catch (error) {
    return { data: null, error: error };
  }
};
