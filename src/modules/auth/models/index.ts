import { StackNavigationProp } from "@react-navigation/stack";

export interface User {
  id: number;
  firstName: string;
}

export interface AuthState {
  user: undefined | User;
  token: null | string;
}

export interface SetToken {
  token: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface CreateAccountData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  streamUrl: string;
}

export type StackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type AuthStackNavigationProp = StackNavigationProp<StackParamList>;
