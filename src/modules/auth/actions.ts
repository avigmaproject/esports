import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActionCreator } from "redux";
import { AppDispatch } from "../../store";
import {
  SET_TOKEN,
  SET_USER,
  LOGOUT,
  RESET,
  AuthActionTypes,
} from "./actionTypes";
import { User } from "./models";

const setTokenAC: ActionCreator<AuthActionTypes> = (token: string) => {
  return { type: SET_TOKEN, payload: { token } };
};

const setUserAC: ActionCreator<AuthActionTypes> = (user: User) => {
  return { type: SET_USER, payload: user };
};

const logoutAC: ActionCreator<AuthActionTypes> = () => {
  return { type: LOGOUT };
};

const clearStoreAC: ActionCreator<AuthActionTypes> = () => {
  return { type: RESET };
};

export const loginUser = (token: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setTokenAC(token));
  };
};

export const setMeDetails = (user: User) => {
  return (dispatch: AppDispatch) => {
    dispatch(setUserAC(user));
  };
};

export const logoutUser = () => {
  return (dispatch: AppDispatch) => {
    dispatch(logoutAC());
  };
};

export const clearStore = () => {
  return async (dispatch: AppDispatch) => {
    await AsyncStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
    dispatch(clearStoreAC());
  };
};
