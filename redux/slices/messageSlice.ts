import { createSlice } from "@reduxjs/toolkit";
import { COMMON } from "../constants";
import { IMessageSliceStates } from "./messageSlice.types";
import { ISentMessage } from "@/common/types";

const initialState: IMessageSliceStates = {
  isLoading: false,
  phone: "",
  templates: [],
  isError: false,
  currentMessage: {} as ISentMessage,
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
    setCurrentMessage: (state, action) => {
      state.currentMessage = action.payload;
    },
    toggleError: (state) => {
      state.isError = true;
    },
  },
});
export default messageSlice.reducer;
export const {
  toggleLoading,
  setAllTemplates,
  toggleError,
  setCurrentMessage,
} = messageSlice.actions;
