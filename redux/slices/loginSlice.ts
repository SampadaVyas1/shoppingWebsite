import { PayloadAction, isPending, createSlice } from "@reduxjs/toolkit";
import { googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { LOGIN } from "../constants";
import { getDataFromLocalStorage, setDataInLocalStorage } from "@/common/utils";
import { REFRESH_TOKEN, TOKEN, USER_TOKEN } from "@/common/constants";
import { ILoginStates, ITokens } from "@/common/login.types";
import { IUserData } from "@/common/types";

const initialState: ILoginStates = {
  isLoggedIn: !!getDataFromLocalStorage(REFRESH_TOKEN),
  isLoading: false,
  isError: false,
  featureData: {},
  isLoginError: false,
  userDetails: {} as IUserData,
};

export const loginSlice = createSlice({
  name: LOGIN,
  initialState,
  reducers: {
    handleLogin: (state, action: PayloadAction<ITokens>) => {
      const { accessToken, refresh_token } = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isLoginError = false;
      setDataInLocalStorage(TOKEN, accessToken);
      setDataInLocalStorage(REFRESH_TOKEN, refresh_token);
    },
    handleFeatureAccess: (state, { payload }: any) => {
      state.isLoggedIn = true;
      state.isError = false;
      state.featureData = payload;
    },
    handleUserDetail: (state, { payload }: any) => {
      state.isLoggedIn = true;
      state.isError = false;
      state.userDetails = payload;
      const userData: any = jwt_decode(`${getDataFromLocalStorage(TOKEN)}`);
      if (userData.role !== payload.role) {
        state.isLoggedIn = false;
        localStorage.clear();
        googleLogout();
        const win = window as Window;
        win.location = "/login";
      }
    },
    handleLogout: (state) => {
      state.isLoggedIn = false;
      localStorage.clear();
      googleLogout();
    },
    toggleLoading: (state) => {
      state.isLoading = true;
    },
    toggleError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
    toggleLoginError: (state) => {
      state.isLoading = false;
      state.isLoginError = true;
    },
  },
});
export default loginSlice.reducer;
export const {
  handleLogin,
  handleLogout,
  toggleLoading,
  toggleError,
  handleFeatureAccess,
  handleUserDetail,
  toggleLoginError,
} = loginSlice.actions;
