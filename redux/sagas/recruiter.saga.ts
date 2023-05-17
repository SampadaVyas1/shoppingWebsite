import { AnyAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { sagaActions } from "../constants";
import {
  getAllRecruiterService,
  updateRecruiterService,
} from "@/services/recruiters.service";
import {
  getAllRecruiter,
  handleRecruiterSearch,
  toggleError,
  toggleLoading,
  updateRecruiterData,
} from "../slices/recruiterSlice";
import { DEBOUNCE_TIME } from "@/common/constants";

export function* searchRecruiters({ payload }: AnyAction): any {
  try {
    yield put(toggleLoading());
    yield delay(DEBOUNCE_TIME.SEARCH_DEBOUNCE);
    const result = yield getAllRecruiterService(payload);
    yield put(handleRecruiterSearch(result.data));
  } catch (e) {
    console.log(e);
    yield put(toggleError());
  }
}

export function* getAllRecruiters({ payload }: AnyAction): any {
  try {
    yield put(toggleLoading());
    const result = yield getAllRecruiterService(payload);
    yield put(getAllRecruiter(result.data));
  } catch (e) {
    console.log(e);
    yield put(toggleError());
  }
}

export function* updateRecruiter({ payload }: AnyAction): any {
  try {
    const { employeeId, recruiters, isActive } = payload;
    const recruiterData = { employeeId, recruiters };
    yield put(toggleLoading());
    const result = yield updateRecruiterService(employeeId, isActive);
    if (result.data) {
      yield put(updateRecruiterData(recruiterData as unknown as void));
    } else {
      yield put(toggleError());
    }
  } catch (e) {
    console.log(e);
    yield put(toggleError());
  }
}

export const recruiterSaga = [
  takeEvery(sagaActions.GET_RECRUITERS, getAllRecruiters),
  takeEvery(sagaActions.UPDATE_RECRUITER, updateRecruiter),
  takeLatest(sagaActions.SEARCH_RECRUITER, searchRecruiters),
];
