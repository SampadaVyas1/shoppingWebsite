import { createSlice } from "@reduxjs/toolkit";
import { COMMON } from "../constants";

export interface IMessageSliceStates {
  isLoading: boolean;
  phone: string;
  templates: any;
  isError: boolean;
}

const initialState: IMessageSliceStates = {
  isLoading: false,
  phone: "",
  templates: [],
  isError: false,
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
    setAllTemplates: (state, action) => {
      state.templates = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    MESSAGE_SAGA_FAILED: (state) => {
      state.isError = true;
    },
  },
});
export default messageSlice.reducer;
export const { toggleLoading, setAllTemplates } = messageSlice.actions;
