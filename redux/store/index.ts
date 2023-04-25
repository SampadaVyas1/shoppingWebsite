import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import loginSlice from "../slices/loginSlice";
import rootSaga from "../sagas/rootSaga";
import commonSlice from "../slices/commonSlice";

const rootReducer = combineReducers({
  login: loginSlice,
  common: commonSlice,
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
