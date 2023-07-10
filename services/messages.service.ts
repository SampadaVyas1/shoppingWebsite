import { SERVICE_WHATSAPP } from "@/common/routes";
import service from "./config";
import { getDataFromLocalStorage, setDataInLocalStorage } from "@/common/utils";
import axios from "axios";
import { TOKEN } from "@/common/constants";
import { SOCKET_CONSTANTS } from "@/common/constants/socketConstants";

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

export const sendMediaData = async (params: any) => {
  try {
    const response = await service.post(SERVICE_WHATSAPP.UPLOAD_MEDIA,params);
    return response;
  } catch (error) {
    return { data: null, error: error };
  }
};

export const syncChat = async (params?: any) => {
  try {
    const response = await service.post(
      `${SERVICE_WHATSAPP.SYNC_CHATS}`,
      params
    );
    const { lastBackupTime } = response.data.data;
    setDataInLocalStorage(SOCKET_CONSTANTS.LAST_BACKUP_TIME, lastBackupTime);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getChats = async () => {
  try {
    const response = await service.get(`${SERVICE_WHATSAPP.GET_CHATS}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const getFileData = async (file: string) => {
  try {
    const response = await axios.get(file);
    return response.data;
  } catch (error) {
    return error;
  }
};
