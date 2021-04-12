import { RESET_APP_READY, SET_APP_READY } from "./actionTypes";
import { AppDispatch } from "../../store";

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
