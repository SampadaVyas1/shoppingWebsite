import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RECRUITERS, TECH_STACK } from "../constants";
import { IRecruitersList, ITechStackList } from "@/common/types";
import { number } from "yup";
import { notify } from "@/helpers/toastHelper";
import { toast } from "react-toastify";

interface IRecruiterStates {
  isLoading: boolean;
  isError: boolean;
  recruitersList: IRecruitersList[];
  currentRecruiters: IRecruitersList[];
  currentPage: number;
  hasNextPage: boolean;
  totalPages: number;
}

const initialState: IRecruiterStates = {
  isLoading: false,
  isError: false,
  recruitersList: [],
  currentRecruiters: [],
  currentPage: 1,
  hasNextPage: false,
  totalPages: 1,
};

export const recruiterSlice = createSlice({
  name: RECRUITERS,
  initialState,
  reducers: {
    toggleLoading: (state) => {
      state.isLoading = true;
    },
    getAllRecruiter: (state, { payload }: any) => {
      toast.dismiss();
      return {
        ...state,
        isLoading: false,
        isError: false,
        totalPages: payload.totalPages,
        recruitersList: [...state.recruitersList, ...payload.recruiters],
        hasNextPage: payload.hasNextPage,
        currentPage: payload.currentPage,
      };
    },
    handleRecruiterSearch: (state, { payload }: any) => {
      toast.dismiss();
      return {
        ...state,
        isLoading: false,
        isError: false,
        totalPages: payload.totalPages,
        currentRecruiters: payload.recruiters,
        hasNextPage: payload.hasNextPage,
        currentPage: payload.currentPage,
      };
    },
    updateRecruiterData: (state, { payload }: any) => {
      return {
        ...state,
        isLoading: false,
        isError: false,
        recruitersList: [...payload.recruiters].map((recruiter) =>
          recruiter.employeeId === payload.employeeId
            ? { ...recruiter, isActive: !recruiter.isActive }
            : recruiter
        ),
      };
    },
    toggleError: (state) => {
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
        recruitersList: [],
        currentRecruiters: [],
        currentPage: 1,
        hasNextPage: false,
        totalPages: 1,
      };
    },
  },
});
export default recruiterSlice.reducer;
export const {
  toggleError,
  getAllRecruiter,
  handleRecruiterSearch,
  toggleLoading,
  resetPage,
  updateRecruiterData,
} = recruiterSlice.actions;
