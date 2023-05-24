import {
  getAllFeatureAccess,
  getLoginData,
  getUserDetail,
  logoutUser,
} from "@/services/login.service";
import { AnyAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import {
  toggleLoading,
  handleLogin,
  toggleLoginError,
  toggleError,
  handleFeatureAccess,
  handleUserDetail,
  handleLogout,
  setErrorMessage,
  resetErrorMessage,
} from "../slices/loginSlice";
import { sagaActions } from "../constants";
import { PRIVATE_ROUTES } from "@/common/routes";
import { googleLogout } from "@react-oauth/google";
import { ERROR_CODES } from "@/common/constants";

export function* handleLoginSaga({ token }: AnyAction): any {
  try {
    yield put(toggleLoading());
    yield put(resetErrorMessage());
    const result = yield getLoginData(token);
    if (!!!result.error) {
      yield put(handleLogin(result.data));
    } else {
      const { response } = result.error;
      if (response?.status === ERROR_CODES.ERROR_UNAUTHORIZED) {
        yield put(setErrorMessage());
      } else {
        yield put(toggleLoginError());
      }
    }
  } catch (e) {
    yield put({ type: sagaActions.LOGIN_SAGA_FAILED });
  }
}

export function* handleLogoutSaga(): any {
  try {
    yield put(toggleLoading());
    const result = yield logoutUser();
    if (!!!result.error) {
      yield put(handleLogout());
      window.location.href = PRIVATE_ROUTES.LOGIN;
    } else {
      yield put(toggleLoginError());
    }
  } catch (e) {
    yield put(toggleLoginError());
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
  takeEvery(sagaActions.LOGOUT_USER, handleLogoutSaga),
];
