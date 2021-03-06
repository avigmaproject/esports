import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { CommonState } from "../models";

export const initialState: CommonState = {
  appReady: false,
  snackbarVisible: false,
  snackbarMsg: "",
  headerSubTitle: null,
};

export const commonSlice = createSlice({
  name: "common",
  initialState: initialState,
  reducers: {
    setAppReady: state => {
      state.appReady = true;
    },
    resetAppReady: state => {
      state.appReady = false;
    },
    setSnackbarMessage: (state, action: PayloadAction<string>) => {
      state.snackbarMsg = action.payload;
      state.snackbarVisible = true;
    },
    clearSnackbarMessage: state => {
      state.snackbarMsg = "";
      state.snackbarVisible = false;
    },
    setHeaderSubTitle: (state, action: PayloadAction<string>) => {
      state.headerSubTitle = action.payload;
    },
    clearHeaderSubTitle: state => {
      state.headerSubTitle = null;
    },
  },
});

export const {
  setAppReady,
  resetAppReady,
  setSnackbarMessage,
  clearSnackbarMessage,
  setHeaderSubTitle,
  clearHeaderSubTitle,
} = commonSlice.actions;

export default commonSlice.reducer;

// Selectors
export const isAppReady = (state: RootState) => state.common.appReady;
export const isSnackVisible = (state: RootState) =>
  state.common.snackbarVisible;
export const getSnackMsg = (state: RootState) => state.common.snackbarMsg;
export const getHeaderSubTitle = (state: RootState) =>
  state.common.headerSubTitle;
