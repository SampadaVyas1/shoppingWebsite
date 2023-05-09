import { createSlice } from "@reduxjs/toolkit";
import { COMMON } from "../constants";

export interface IMessageSliceStates {
  isLoading: boolean;
  phone: string;
}

const initialState: IMessageSliceStates = {
  isLoading: false,
  phone: "",
};

export const messageSlice = createSlice({
  name: COMMON,
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = true;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
});
export default messageSlice.reducer;
export const { toggleLoading, setPhone } = messageSlice.actions;
