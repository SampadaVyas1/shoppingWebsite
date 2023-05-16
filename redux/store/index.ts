import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loginSlice from "../slices/loginSlice";
import commonSlice from "../slices/commonSlice";
import rootSaga from "../sagas";
import messageSlice from "../slices/messageSlice"; 
import candidateSlice from "../slices/candidateSlice"

const rootReducer = combineReducers({
  login: loginSlice,
  common: commonSlice,
  messages: messageSlice,
  candidate:candidateSlice,
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
