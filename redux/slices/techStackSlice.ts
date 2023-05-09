import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TECH_STACK } from "../constants";
import { ITechStackList } from "@/common/types";
import { number } from "yup";

interface ITechStackStates {
  isLoading: boolean;
  isError: boolean;
  techStackList: ITechStackList[];
  currentTechStacks: ITechStackList[];
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}

const initialState: ITechStackStates = {
  isLoading: false,
  isError: false,
  techStackList: [],
  currentTechStacks: [],
  currentPage: 1,
  hasNextPage: false,
  totalPages: 1,
};

export const techStackSlice = createSlice({
  name: TECH_STACK,
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = true;
    },
    getAllTechStacks: (state, action: any) => {
      state.isLoading = false;
      state.isError = false;
      state.totalPages = action.payload.totalPages;
      state.currentTechStacks = action.payload.techStacks;
      state.techStackList = action.payload.techStacks;
      state.hasNextPage = action.payload.hasNextPage;
      state.currentPage = action.payload.currentPage;
    },
    toggleError: (state) => {
      state.isLoading = false;
      state.isError = true;
    },
  },
});
export default techStackSlice.reducer;
export const { toggleError, getAllTechStacks, toggleLoading } =
  techStackSlice.actions;
