import { PayloadAction, isPending, createSlice } from "@reduxjs/toolkit";
import { googleLogout } from "@react-oauth/google";
import { LOGIN } from "../constants";
import { getDataFromLocalStorage, setDataInLocalStorage } from "@/common/utils";
import { REFRESH_TOKEN, TOKEN, USER_TOKEN } from "@/common/constants";
import { ILoginStates, ITokens } from "@/pages/login/login.types";

const initialState: ILoginStates = {
  isLoggedIn: !!getDataFromLocalStorage(REFRESH_TOKEN),
  isLoading: false,
};

export const loginSlice = createSlice({
  name: LOGIN,
  initialState,
  reducers: {
    handleLogin: (state, action: PayloadAction<ITokens>) => {
      const { accessToken, refreshToken, userToken } = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      setDataInLocalStorage(TOKEN, accessToken);
      setDataInLocalStorage(REFRESH_TOKEN, refreshToken);
      setDataInLocalStorage(USER_TOKEN, userToken);
    },
    handleLogout: (state) => {
      state.isLoggedIn = false;
      localStorage.clear();
      googleLogout();
    },
    toggleLoading: (state) => {
      state.isLoading = true;
    },
  },
});
export default loginSlice.reducer;
export const { handleLogin, handleLogout, toggleLoading } = loginSlice.actions;
