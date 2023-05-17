import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { RECRUITERS } from "../constants";
import { IRecruitersList } from "@/common/types";
import { notify } from "@/helpers/toastHelper";

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
        currentRecruiters: [...state.currentRecruiters, ...payload.recruiters],
        hasNextPage: payload.hasNextPage,
        currentPage: payload.currentPage,
      };
    },
    resetCurrentRecruiters: (state) => {
      return {
        ...state,
        isLoading: true,
        currentRecruiters: [],
        recruitersList: [],
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
  resetCurrentRecruiters,
} = recruiterSlice.actions;
