import { getLoginData } from "@/services/login.service";
import { AnyAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { toggleLoading, handleLogin } from "../slices/loginSlice";
import { sagaActions } from "../actions";

export function* handleLoginSaga({ token }: AnyAction): any {
  try {
    yield put(toggleLoading());
    const result = yield getLoginData(token);
    yield put(handleLogin(result.data));
  } catch (e) {
    console.log(e);
    yield put({ type: sagaActions.LOGIN_SAGA_FAILED });
  }
}

export const loginSaga = [
  takeEvery(sagaActions.GET_LOGIN_DATA, handleLoginSaga),
];
