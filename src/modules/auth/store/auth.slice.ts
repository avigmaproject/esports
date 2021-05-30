import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../store";
import { AuthState, User } from "../models";

export const initialState: AuthState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    setMeDetails: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    logoutUser: state => {
      delete axios.defaults.headers.common["Authorization"];
      state.token = null;
      state.user = null;
    },
    clearStore: state => {
      delete axios.defaults.headers.common["Authorization"];
      state.user = initialState.user;
      state.token = initialState.token;
    },
  },
});

export const {
  loginUser,
  setMeDetails,
  logoutUser,
  clearStore,
} = authSlice.actions;

export default authSlice.reducer;

// Selectors
export const getToken = (state: RootState) => state.auth.token;
export const getCurrentUser = (state: RootState) => state.auth.user;
