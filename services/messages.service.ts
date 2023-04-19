import { REFRESH_TOKEN } from "@/common/constants";
import axios from "axios";

const sendMedia = async () => {
  try {
    const response = await axios.post(
      "https://08ed-103-176-135-206.ngrok-free.app//whatsapp/sendMedia",
      null,
      {}
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};
