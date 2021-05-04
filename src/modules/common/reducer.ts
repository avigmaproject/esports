import { RootState } from "../../store";
import {
  CommonActionTypes,
  SET_APP_READY,
  RESET_APP_READY,
  SET_SNACKBAR_MESSAGE,
  CLEAR_SNACKBAR_MESSAGE,
} from "./actionTypes";
import { CommonState } from "./models";

export const initialState: CommonState = {
  appReady: false,
  snackbarVisible: false,
  snackbarMsg: "",
};

const reducer = (
  state: CommonState = initialState,
  action: CommonActionTypes,
): CommonState => {
  switch (action.type) {
    case SET_APP_READY: {
      return {
        ...state,
        appReady: true,
      };
    }
    case RESET_APP_READY: {
      return {
        ...state,
        appReady: false,
      };
    }
    case SET_SNACKBAR_MESSAGE: {
      const {
        payload: { message },
      } = action;
      return {
        ...state,
        snackbarVisible: true,
        snackbarMsg: message,
      };
    }
    case CLEAR_SNACKBAR_MESSAGE: {
      return {
        ...state,
        snackbarVisible: false,
        snackbarMsg: "",
      };
    }
    default:
      return state;
  }
};

export default reducer;

// Selectors
export const appReadySelector = (state: RootState) =>
  state.commonReducer.appReady;
