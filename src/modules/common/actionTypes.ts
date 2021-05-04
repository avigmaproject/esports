import { SnackbarInterface } from "./models";

// App Ready State
export const SET_APP_READY = "commonReducer/SET_APP_READY";
export const RESET_APP_READY = "commonReducer/RESET_APP_READY";

// Snackbar
export const SET_SNACKBAR_MESSAGE = "commonReducer/SET_SNACKBAR_MESSAGE";
export const CLEAR_SNACKBAR_MESSAGE = "commonReducer/CLEAR_SNACKBAR_MESSAGE";

export interface SetAppReady {
  type: typeof SET_APP_READY;
}

export interface ResetAppReady {
  type: typeof RESET_APP_READY;
}

export interface SetSnackbarMessage {
  type: typeof SET_SNACKBAR_MESSAGE;
  payload: SnackbarInterface;
}

export interface ClearSnackbarMessage {
  type: typeof CLEAR_SNACKBAR_MESSAGE;
}

export type CommonActionTypes =
  | SetAppReady
  | ResetAppReady
  | SetSnackbarMessage
  | ClearSnackbarMessage;
