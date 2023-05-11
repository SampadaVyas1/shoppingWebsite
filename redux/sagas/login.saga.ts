import {
  getAllFeatureAccess,
  getLoginData,
  getUserDetail,
} from "@/services/login.service";
import { AnyAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import {
  toggleLoading,
  handleLogin,
  toggleError,
  handleFeatureAccess,
  handleUserDetail,
} from "../slices/loginSlice";
import { sagaActions } from "../constants";

export function* handleLoginSaga({ token }: AnyAction): any {
  try {
    yield put(toggleLoading());
    const result = yield getLoginData(token);
    if (!!!result.error) {
      yield put(handleLogin(result.data));
    } else {
      yield put(toggleError());
    }
  } catch (e) {
    console.log(e);
    yield put({ type: sagaActions.LOGIN_SAGA_FAILED });
  }
}

export function* fetchRoleSaga(): any {
  try {
    const result = yield getAllFeatureAccess();
    if (!!!result.error) {
      yield put(handleFeatureAccess(result.data));
    } else {
      yield put(toggleError());
    }
  } catch (e) {
    yield put({ type: sagaActions.LOGIN_SAGA_FAILED });
  }
}

export function* userDetailSaga(): any {
  try {
    const result = yield getUserDetail();
    if (!!!result.error) {
      yield put(handleUserDetail(result.data));
    } else {
      yield put(toggleError());
    }
  } catch (e) {
    console.log(e);
    yield put({ type: sagaActions.LOGIN_SAGA_FAILED });
  }
}

export const loginSaga = [
  takeEvery(sagaActions.GET_LOGIN_DATA, handleLoginSaga),
  takeEvery(sagaActions.FETCH_ROLE, fetchRoleSaga),
  takeEvery(sagaActions.GET_USER_DETAILS, userDetailSaga),
];
