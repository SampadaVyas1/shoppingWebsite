import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { TECH_STACK } from "../constants";
import { ITechStackList } from "@/common/types";
import { number } from "yup";
import { notify } from "@/helpers/toastHelper";
import { toast } from "react-toastify";

interface ITechStackStates {
  isLoading: boolean;
  isError: boolean;
  recruitersList: ITechStackList[];
  currentRecruiters: ITechStackList[];
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}

const initialState: ITechStackStates = {
  isLoading: false,
  isError: false,
  recruitersList: [],
  currentRecruiters: [],
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
      state.techStackList = [
        ...state.techStackList,
        ...action.payload.techStacks,
      ];
      state.hasNextPage = action.payload.hasNextPage;
      state.currentPage = action.payload.currentPage;
      toast.dismiss();
    },
    handleTechStackSearch: (state, action: any) => {
      state.isLoading = false;
      state.isError = false;
      state.totalPages = action.payload.totalPages;
      state.currentTechStacks = action.payload.techStacks;
      state.hasNextPage = action.payload.hasNextPage;
      state.currentPage = action.payload.currentPage;
      toast.dismiss();
    },
    toggleError: (state) => {
      state.isLoading = false;
      state.isError = true;
      notify(
        true,
        "Something went wrong...",
        "jugdu",
        () => {},
        "error",
        false
      );
    },
    resetPage: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.techStackList = [];
      state.currentTechStacks = [];
      state.currentPage = 1;
      state.hasNextPage = false;
      state.totalPages = 1;
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
