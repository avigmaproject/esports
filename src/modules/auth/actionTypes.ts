import { SetToken as SetTokenInterface, User } from "./models";

// Constants
export const SET_TOKEN = "auth/SET_TOKEN";
export const SET_USER = "auth/SET_USER";
export const LOGOUT = "auth/LOGOUT";
export const RESET = "auth/RESET";

interface SetToken {
  type: typeof SET_TOKEN;
  payload: SetTokenInterface;
}

interface SetUser {
  type: typeof SET_USER;
  payload: User;
}

interface Logout {
  type: typeof LOGOUT;
}

interface Reset {
  type: typeof RESET;
}

export type AuthActionTypes = SetToken | SetUser | Logout | Reset;
