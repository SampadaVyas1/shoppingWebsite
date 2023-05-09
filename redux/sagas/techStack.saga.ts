import { AnyAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { sagaActions } from "../constants";
import {
  getAllTechStacks,
  handleTechStackSearch,
  toggleError,
  toggleLoading,
} from "../slices/techStackSlice";
import { getAllTechStackService } from "@/services/techStack.service";

export function* searchTechStack({ payload }: AnyAction): any {
  try {
    yield put(toggleLoading());
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
  takeEvery(sagaActions.SEARCH_TECH_STACK, searchTechStack),
];
