import { AnyAction } from "@reduxjs/toolkit";
import { put, takeEvery } from "redux-saga/effects";
import { sagaActions } from "../actions";
import { setAllTemplates, toggleLoading } from "../slices/messageSlice";
import { getAllTemplates } from "@/services/messages.service";
3;
export function* getAllTemplateSaga({}: AnyAction): any {
  try {
    yield put(toggleLoading());
    const result = yield getAllTemplates();
    const templatesData=result.data.data.templates;
    yield put(setAllTemplates(templatesData));
  } catch (e) {
    console.log(e);
    yield put({ type: sagaActions.MESSAGE_SAGA_FAILED });
  }
}

export const messageSaga = [
  takeEvery(sagaActions.GET_ALL_TEMPLATES, getAllTemplateSaga),
];
