import { AnyAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { sagaActions } from "../constants";
import {
  getAllTechStacks,
  toggleError,
  toggleLoading,
} from "../slices/techStackSlice";
import { getAllTechStackService } from "@/services/techStack.service";

export function* getTechStackData({ payload }: AnyAction): any {
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
  takeEvery(sagaActions.GET_TECH_STACKS, getTechStackData),
];
