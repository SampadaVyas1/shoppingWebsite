import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loginSlice from "../slices/loginSlice";
import rootSaga from "../sagas";
import messageSlice from "../slices/messageSlice";
import candidateSlice from "../slices/candidateSlice";
import techstackSlice from "../slices/techStackSlice";
import recruiterSlice from "../slices/recruiterSlice";
import commonSlice from "../slices/commonSlice";

const rootReducer = combineReducers({
  login: loginSlice,
  common: commonSlice,
  messages: messageSlice,
  candidate: candidateSlice,
  techStack: techstackSlice,
  recruiters: recruiterSlice,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
