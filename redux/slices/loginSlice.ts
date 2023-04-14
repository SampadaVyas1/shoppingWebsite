import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN } from "../constants";
import { setDataInLocalStorage } from "@/common/utils";
import { REFRESH_TOKEN, TOKEN, USER_TOKEN } from "@/common/constants";
import { googleLogout } from "@react-oauth/google";

export interface ILoginStates {
  isLoggedIn: boolean;
  count: number;
}

interface ITokens {
  accessToken: string;
  refreshToken: string;
  userToken: string;
}

const initialState: ILoginStates = {
  isLoggedIn: false,
  count: 0,
};

export const loginSlice = createSlice({
  name: LOGIN,
  initialState,
  reducers: {
    printNumber: (state, action: PayloadAction<number>) => {
      state.count = action.payload;
    },
  },
});
export default loginSlice.reducer;
export const { printNumber } = loginSlice.actions;
