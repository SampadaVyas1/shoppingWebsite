import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LOGIN } from "../constants";

export interface ILoginStates {
  isLoggedIn: boolean;
  count: number;
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
