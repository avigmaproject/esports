export interface CommonState {
  appReady: boolean;
  snackbarVisible: boolean;
  snackbarMsg: string;
  headerSubTitle: string | null;
}

export interface LoadingText {
  text: string;
}

export interface LoaderState {
  loading: boolean;
  text: string | null;
}

export interface SnackbarInterface {
  message: string;
}
