import { PayloadAction, isPending, createSlice } from "@reduxjs/toolkit";
import { googleLogout } from "@react-oauth/google";
import { LOGIN } from "../constants";
import { getDataFromLocalStorage, setDataInLocalStorage } from "@/common/utils";
import { REFRESH_TOKEN, TOKEN } from "@/common/constants";
import { IUserData } from "@/common/types";
import { ILoginStates, ITokens } from "@/common/types/login.types";

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
      const { accessToken, refreshToken } = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isLoginError = false;
      setDataInLocalStorage(TOKEN, accessToken);
      setDataInLocalStorage(REFRESH_TOKEN, refreshToken);
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
  toggleLoading,
  toggleError,
  handleFeatureAccess,
  handleUserDetail,
  toggleLoginError,
} = loginSlice.actions;
