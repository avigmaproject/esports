import { SET_TOKEN, SET_USER } from "./actionTypes";
import { SetToken, User } from "./models";

interface SetTokenAction {
  type: typeof SET_TOKEN;
  payload: SetToken;
}

interface SetUserAction {
  type: typeof SET_USER;
  payload: User;
}

export type AuthActionTypes = SetTokenAction | SetUserAction;
