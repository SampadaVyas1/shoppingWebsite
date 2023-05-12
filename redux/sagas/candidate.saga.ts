// import { AnyAction } from "@reduxjs/toolkit";
// import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
// import { sagaActions } from "../constants";
// import {
//   getCandidatesService,
//   getFilterService,
//   addCandidatesService
// } from "@/services/candidate.service";
// import {
//   getAllCandidates,
//   handleCandidateSearch,
//   toggleError,
//   toggleLoading,
//   updateRecruiterData,
// } from "../slices/candidateSlice";
// import { notify } from "@/helpers/toastHelper";

// export function* searchCandidates({ payload }: AnyAction): any {
//   try {
//     yield put(toggleLoading());
//     yield delay(500);
//     const result = yield getAllCandidates(payload);
//     yield put(handleCandidateSearch(result.data));
//   } catch (e) {
//     console.log(e);
//     yield put(toggleError());
//   }
// }

// export function* getAllRecruiters({ payload }: AnyAction): any {
//   try {
//     yield put(toggleLoading());
//     const result = yield getAllCandidates(payload);
//     yield put(getAllRecruiter(result.data));
//   } catch (e) {
//     console.log(e);
//     yield put(toggleError());
//   }
// }

// export function* updateRecruiter({ payload }: AnyAction): any {
//   try {
//     const { employeeId, recruiters, isActive } = payload;
//     const recruiterData = { employeeId, recruiters };
//     yield put(toggleLoading());
//     const result = yield updateRecruiterService(employeeId, isActive);
//     if (result.data) {
//       yield put(updateRecruiterData(recruiterData as unknown as void));
//     } else {
//       yield put(toggleError());
//     }
//   } catch (e) {
//     console.log(e);
//     yield put(toggleError());
//   }
// }

// export const recruiterSaga = [
//   takeEvery(sagaActions.GET_RECRUITERS, getAllRecruiters),
//   takeEvery(sagaActions.UPDATE_RECRUITER, updateRecruiter),
//   takeLatest(sagaActions.SEARCH_RECRUITER, searchRecruiters),
// ];