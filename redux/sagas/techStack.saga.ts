import { AnyAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { sagaActions } from "../actions";
import {
  getAllTechStacks,
  handleTechStackSearch,
  toggleError,
  toggleLoading,
} from "../slices/techStackSlice";
import { getAllTechStackService } from "@/services/techStack.service";
import { DEBOUNCE_TIME } from "@/common/constants";

export function* searchTechStack({ payload }: AnyAction): any {
  try {
    yield put(toggleLoading());
    yield delay(DEBOUNCE_TIME.SEARCH_DEBOUNCE);
    const result = yield getAllTechStackService(payload);
    yield put(handleTechStackSearch(result.data));
  } catch (e) {
    console.log(e);
    yield put(toggleError());
  }
}

export function* getAllTechStack({ payload }: AnyAction): any {
  try {
    yield put(toggleLoading());
    const result = yield getAllTechStackService(payload);
    yield put(getAllTechStacks(result.data));
  } catch (e) {
    console.log(e);
    yield put(toggleError());
  }
}

export const techStackSaga = [
  takeEvery(sagaActions.GET_TECH_STACKS, getAllTechStack),
  takeLatest(sagaActions.SEARCH_TECH_STACK, searchTechStack),
];
