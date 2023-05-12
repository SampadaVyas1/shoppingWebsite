import { AnyAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { sagaActions } from "../actions";
import { handleMediaSend, toggleLoading } from "../slices/commonSlice";

export function* sendMediaSaga({ formData }: AnyAction): any {
  try {
    yield put(toggleLoading());
  } catch (e) {
    console.log(e);
    yield put({ type: sagaActions.LOGIN_SAGA_FAILED });
  }
}

export const commonSaga = [
  takeEvery(sagaActions.SEND_MEDIA_SAGA, sendMediaSaga),
];
