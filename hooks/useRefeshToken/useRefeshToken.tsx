import { REFRESH_TOKEN, TOKEN } from "@/common/constants";
import { setDataInLocalStorage } from "@/common/utils";
import service from "../../services/config";

const useRefeshToken = () => {
  const refresh = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    const response = await service.post(
      `/auth/getNewAccessToken?refreshToken=${refreshToken}`
    );
    setDataInLocalStorage(TOKEN, response.data.data);
    return response;
  };
  return refresh;
};

export default useRefeshToken;
