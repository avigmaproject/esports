export interface CommonState {
  appReady: boolean;
  snackbarVisible: boolean;
  snackbarMsg: string;
}

export interface SnackbarInterface {
  message: string;
}
