import { PayloadAction, isPending, createSlice } from "@reduxjs/toolkit";
import { googleLogout } from "@react-oauth/google";
import { LOGIN } from "../constants";
import { getDataFromLocalStorage, setDataInLocalStorage } from "@/common/utils";
import { REFRESH_TOKEN, TOKEN, USER_TOKEN } from "@/common/constants";
import { ILoginStates, ITokens } from "@/common/login.types";

const initialState: ILoginStates = {
  isLoggedIn: !!getDataFromLocalStorage(REFRESH_TOKEN),
  isLoading: false,
  isError: false,
  featureData: {},
};

export const loginSlice = createSlice({
  name: LOGIN,
  initialState,
  reducers: {
    handleLogin: (state, action: PayloadAction<ITokens>) => {
      const { accessToken, refresh_token } = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.isError = false;
      setDataInLocalStorage(TOKEN, accessToken);
      setDataInLocalStorage(REFRESH_TOKEN, refresh_token);
    },
    handleFeatureAccess: (state, { payload }: any) => {
      state.isLoggedIn = true;
      state.isError = false;
      state.featureData = payload;
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
  },
});
export default loginSlice.reducer;
export const {
  handleLogin,
  handleLogout,
  toggleLoading,
  toggleError,
  handleFeatureAccess,
} = loginSlice.actions;
