import {
  CLEAR_SNACKBAR_MESSAGE,
  CommonActionTypes,
  RESET_APP_READY,
  SET_APP_READY,
  SET_SNACKBAR_MESSAGE,
} from "./actionTypes";
import { AppDispatch } from "../../store";
import { ActionCreator } from "redux";

const setSnackMsg: ActionCreator<CommonActionTypes> = msg => {
  return { type: SET_SNACKBAR_MESSAGE, payload: { message: msg } };
};

const clearSnackMsg: ActionCreator<CommonActionTypes> = () => {
  return { type: CLEAR_SNACKBAR_MESSAGE };
};

export const resetAppReady = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: RESET_APP_READY,
    });
  };
};

export const setAppReady = () => {
  return (dispatch: AppDispatch) => {
    dispatch({
      type: SET_APP_READY,
    });
  };
};

export const setSnackbarMessage = (msg: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setSnackMsg(msg));
  };
};

export const clearSnackbarMessage = () => {
  return (dispatch: AppDispatch) => {
    dispatch(clearSnackMsg());
  };
};
