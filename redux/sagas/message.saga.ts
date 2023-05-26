import { AnyAction } from "@reduxjs/toolkit";
import { delay, put, takeEvery } from "redux-saga/effects";
import { sagaActions } from "../actions";
import {
  handleSyncing,
  setAllTemplates,
  toggleError,
  toggleLoading,
} from "../slices/messageSlice";
import { getAllTemplates, syncChat } from "@/services/messages.service";
import { createDataForSync } from "@/common/utils/dbUtils";
import { PRIVATE_ROUTES } from "@/common/routes";
import { googleLogout } from "@react-oauth/google";
import { db } from "@/db";

export function* getAllTemplateSaga({}: AnyAction): any {
  try {
    yield put(toggleLoading());
    const result = yield getAllTemplates();
    const templatesData = result.data.data.templates;
    yield put(setAllTemplates(templatesData));
  } catch (e) {
    console.log(e);
    yield put(toggleError());
  }
}

export function* backupChats({ payload }: any): any {
  try {
    yield put(handleSyncing(true));
    const syncData = yield createDataForSync();
    const result = yield syncChat(syncData);
    if (payload?.logoutUser) {
      localStorage.clear();
      window.location.href = PRIVATE_ROUTES.LOGIN;
      googleLogout();
      db.conversations.clear();
      db.messages.clear();
    }
    yield put(handleSyncing(false));
  } catch (e) {
    console.log(e);
    yield put(toggleError());
  }
}

export const messageSaga = [
  takeEvery(sagaActions.GET_ALL_TEMPLATES, getAllTemplateSaga),
  takeEvery(sagaActions.BACKUP_CHATS, backupChats),
];
