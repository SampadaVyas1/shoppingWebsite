import { AnyAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { sagaActions } from "../constants";
import { sendMedia } from "@/services/common.service";
import { handleMediaSend, toggleLoading } from "../slices/commonSlice";

export function* sendMediaSaga({ formData }: AnyAction): any {
  try {
    console.log(formData);
    yield put(toggleLoading());
    const result = yield sendMedia(formData);
    yield put(handleMediaSend(result));
  } catch (e) {
    console.log(e);
    yield put({ type: sagaActions.LOGIN_SAGA_FAILED });
  }
}

export const commonSaga = [
  takeEvery(sagaActions.SEND_MEDIA_SAGA, sendMediaSaga),
];
