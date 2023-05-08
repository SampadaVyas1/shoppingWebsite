import { REFRESH_TOKEN } from "@/common/constants";
import axios from "axios";

export const getMedia = async (imageId: string) => {
  try {
    const response = await axios.get(
      `https://graph.facebook.com/v15.0/${imageId}`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
