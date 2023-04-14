import { AnyAction, Store } from "@reduxjs/toolkit";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { AppDispatch, RootState } from "../store";

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppThunkDispatch: () => AppThunkDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
