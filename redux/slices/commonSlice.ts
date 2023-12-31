import { createSlice } from "@reduxjs/toolkit";
import { COMMON } from "../constants";
import { ICommonSliceStates } from "./commonSlice.types";

const initialState: ICommonSliceStates = {
  isLoading: false,
  levelFilters: [],
};

export const commonSlice = createSlice({
  name: COMMON,
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = true;
    },
    handleMediaSend: (state, action) => {},
  },
});
export default commonSlice.reducer;
export const { toggleLoading, handleMediaSend } = commonSlice.actions;
