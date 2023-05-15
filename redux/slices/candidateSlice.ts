// import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { CANDIDATES } from "../constants";
// import { number } from "yup";
// import { notify } from "@/helpers/toastHelper";
// import { toast } from "react-toastify";

// interface ICandidateStates {
//   isLoading: boolean;
//   isError: boolean;
//   candidatesList: any[];
//   currentCandidates: any[];
//   currentPage: number;
//   hasNextPage: boolean;
//   totalPages: number;
// }
// const initialState: ICandidateStates = {
//     isLoading: false,
//     isError: false,
//     candidatesList: [],
//     currentCandidates: [],
//     currentPage: 1,
//     hasNextPage: false,
//     totalPages: 1,
//   };

//   export const candidateSlice = createSlice({
//     name: CANDIDATES,
//     initialState,
//     reducers: {
//       toggleLoading: (state) => {
//         state.isLoading = true;
//       },
//       getAllCandidates: (state, { payload }: any) => {
//         toast.dismiss();
//         return {
//           ...state,
//           isLoading: false,
//           isError: false,
//           totalPages: payload.totalPages,
//           candidatesList: [...state.candidatesList, ...payload.candidates],
//           hasNextPage: payload.hasNextPage,
//           currentPage: payload.currentPage,
//         };
//       },
//       handleCandidateSearch: (state, { payload }: any) => {
//         toast.dismiss();
//         return {
//           ...state,
//           isLoading: false,
//           isError: false,
//           totalPages: payload.totalPages,
//           currentCandidates: payload.candidates,
//           hasNextPage: payload.hasNextPage,
//           currentPage: payload.currentPage,
//         };
//       },
//       updateRecruiterData: (state, { payload }: any) => {
//         return {
//           ...state,
//           isLoading: false,
//           isError: false,
//           candidatesList: [...payload.candidates].map((candidate) =>
//           candidate.employeeId === payload.employeeId
//               ? { ...candidate, isActive: !candidate.isActive }
//               : candidate
//           ),
//         };
//       },
//       toggleError: (state) => {
//         notify(
//           true,
//           "Something went wrong...",
//           "error",
//           () => {},
//           "error",
//           false
//         );
//         return {
//           ...state,
//           isLoading: false,
//           isError: true,
//         };
//       },
//       resetPage: (state) => {
//         return {
//           isLoading: false,
//           isError: false,
//           candidatesList: [],
//           currentCandidates: [],
//           currentPage: 1,
//           hasNextPage: false,
//           totalPages: 1,
//         };
//       },
//     },
//   });
//   export default candidateSlice.reducer;
//   export const {
//     toggleError,
//     getAllCandidates,
//     handleCandidateSearch,
//     toggleLoading,
//     resetPage,
//     updateRecruiterData,
//   } = candidateSlice.actions;
  