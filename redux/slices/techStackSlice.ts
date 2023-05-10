import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TECH_STACK } from "../constants";
import { ITechStackList } from "@/common/types";
import { number } from "yup";
import { notify } from "@/helpers/toastHelper";
import { toast } from "react-toastify";

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
    getAllTechStacks: (state, { payload }: any) => {
      toast.dismiss();
      return {
        ...state,
        isLoading: false,
        isError: false,
        totalPages: payload.totalPages,
        techStackList: [...state.techStackList, ...payload.techStacks],
        hasNextPage: payload.hasNextPage,
        currentPage: payload.currentPage,
      };
    },
    handleTechStackSearch: (state, { payload }: any) => {
      toast.dismiss();

      return {
        ...state,
        isLoading: false,
        isError: false,
        totalPages: payload.totalPages,
        currentTechStacks: payload.techStacks,
        hasNextPage: payload.hasNextPage,
        currentPage: payload.currentPage,
      };
    },
    toggleError: (state) => {
      notify(
        true,
        "Something went wrong...",
        "error",
        () => {},
        "error",
        false
      );
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    },
    resetPage: (state) => {
      return {
        isLoading: false,
        isError: false,
        techStackList: [],
        currentTechStacks: [],
        currentPage: 1,
        hasNextPage: false,
        totalPages: 1,
      };
    },
  },
});
export default techStackSlice.reducer;
export const {
  toggleError,
  getAllTechStacks,
  handleTechStackSearch,
  toggleLoading,
  resetPage,
} = techStackSlice.actions;
