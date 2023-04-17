import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { googleLogout } from "@react-oauth/google";
import { LOGIN } from "../constants";
import { getDataFromLocalStorage, setDataInLocalStorage } from "@/common/utils";
import { REFRESH_TOKEN, TOKEN, USER_TOKEN } from "@/common/constants";
import service from "@/services/config";
export interface ILoginStates {
  isLoggedIn: boolean;
}
interface ITokens {
  accessToken: string;
  refreshToken: string;
  userToken: string;
}
const initialState: ILoginStates = {
  isLoggedIn: !!getDataFromLocalStorage(TOKEN),
};

export const loginSlice = createSlice({
  name: LOGIN,
  initialState,
  reducers: {
    handleLogin: (state, action: PayloadAction<ITokens>) => {
      const { accessToken, refreshToken, userToken } = action.payload;
      state.isLoggedIn = true;
      setDataInLocalStorage(TOKEN, accessToken);
      setDataInLocalStorage(REFRESH_TOKEN, refreshToken);
      setDataInLocalStorage(USER_TOKEN, userToken);
    },
    handleLogout: (state) => {
      state.isLoggedIn = false;
      localStorage.clear();
      googleLogout();
    },
  },
});
export default loginSlice.reducer;
export const { handleLogin, handleLogout } = loginSlice.actions;
