import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loginSlice from "../slices/loginSlice";
import rootSaga from "../sagas";
import techstackSlice from "../slices/techStackSlice";
import recruiterSlice from "../slices/recruiterSlice";

const rootReducer = combineReducers({
  login: loginSlice,
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
