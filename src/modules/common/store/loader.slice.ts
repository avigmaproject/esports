import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store";
import { LoaderState, LoadingText } from "../models";

export const initialState: LoaderState = {
  loading: false,
  text: null,
};

const loaderSlice = createSlice({
  name: "loader",
  initialState: initialState,
  reducers: {
    setLoadingWithText: (state, action: PayloadAction<LoadingText>) => {
      state.loading = true;
      state.text = action.payload.text;
    },
    setLoading: state => {
      state.loading = true;
      state.text = null;
    },
    resetLoading: state => {
      state.loading = false;
      state.text = null;
    },
  },
});

export const {
  setLoading,
  setLoadingWithText,
  resetLoading,
} = loaderSlice.actions;

export default loaderSlice.reducer;

export const getLoading = (state: RootState) => state.loader.loading;
export const getLoadingText = (state: RootState) => state.loader.text;
