import { PayloadAction, isPending, createSlice } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import { googleLogout } from "@react-oauth/google";
import { LOGIN } from "../constants";
import { getDataFromLocalStorage, setDataInLocalStorage } from "@/common/utils";
import {
  API_ERROR_MESSAGES,
  REFRESH_KEY,
  REFRESH_TOKEN,
  TOKEN,
} from "@/common/constants";
import { IUserData } from "@/common/types";
import { ILoginStates, ITokens } from "@/common/types/login.types";
import { PRIVATE_ROUTES } from "@/common/routes";

const initialState: ILoginStates = {
  isLoggedIn: !!getDataFromLocalStorage(REFRESH_TOKEN),
  isLoading: false,
  isError: false,
  featureData: {},
  isLoginError: false,
  userDetails: {} as IUserData,
  errorMessage: "",
};

export const loginSlice = createSlice({
  name: LOGIN,
  initialState,
  reducers: {
    handleLogin: (state, action: PayloadAction<ITokens>) => {
      const { accessToken, refreshToken } = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isLoginError = false;
      state.errorMessage = "";
      setDataInLocalStorage(TOKEN, accessToken);
      setDataInLocalStorage(REFRESH_TOKEN, refreshToken);
    },
    handleFeatureAccess: (state, { payload }: any) => {
      state.isError = false;
      state.featureData = payload;
    },
    handleUserDetail: (state, { payload }: any) => {
      state.isError = false;
      state.userDetails = payload;
      setDataInLocalStorage(
        REFRESH_KEY,
        window.btoa(state.userDetails?.employeeId?.toString())
      );
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
    setErrorMessage: (state) => {
      state.errorMessage = API_ERROR_MESSAGES.LOGIN_ERROR;
      state.isLoginError = true;
      state.isLoading = false;
    },
    resetErrorMessage: (state) => {
      state.errorMessage = "";
      state.isLoginError = false;
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
  setErrorMessage,
  resetErrorMessage,
} = loginSlice.actions;
