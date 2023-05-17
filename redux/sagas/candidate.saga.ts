import { AnyAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { sagaActions } from "../constants";
import {
  getCandidatesService,
  getFilterService,

  addCandidatesService,
} from "@/services/candidate.service";
import {
  getAllCandidates,
  toggleError,
  toggleLoading,
  getAllFilters,
  updateDataByFiltering,
  updateCandidateData,
} from "../slices/candidateSlice";
import { notify } from "@/helpers/toastHelper";

export function* getAllCandidatesValue({ payload }: AnyAction): any {
  try {
    yield put(toggleLoading());
    const result = yield getCandidatesService(payload);
    yield put(getAllCandidates(result));
  } catch (e) {
    console.log(e);
    yield put(toggleError());
  }
}
export function* getAllFilter(): any {
  try {
    yield put(toggleLoading());
    const result = yield getFilterService();
    console.log(result)
    yield put(getAllFilters(result));
  } catch (e) {
    console.log(e);
    yield put(toggleError());
  }
}
export function* handleFilterData({ payload }: AnyAction): any {
  try {
    yield put(toggleLoading());
    const result = yield getCandidatesService(payload);
    yield put(updateDataByFiltering(result));
  } catch (e) {
    console.log(e);
    yield put(toggleError());
  }
}

export const candidateSaga = [
  takeEvery(sagaActions.GET_ALL_CANDIDATES, getAllCandidatesValue),
  takeEvery(sagaActions.GET_CANDIDATE_FILTER,getAllFilter),
  takeEvery(sagaActions.DATA_AFTER_FILTERING,handleFilterData)
];


