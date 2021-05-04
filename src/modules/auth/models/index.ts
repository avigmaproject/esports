import { StackNavigationProp } from "@react-navigation/stack";

export interface User {
  id?: string;
  email?: string;
  username?: string;
  logo?: string;
  country?: string;
  nationality?: string;
  dateJoined?: Date;
  theme?: string;
  timezone?: string;
  discordID?: string;
  discordTag?: string;
}

export interface AuthState {
  user: User | null;
  token: null | string;
}

export interface SetToken {
  token: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface ILoginResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
}

export interface CreateAccountData {
  username: string;
  password: string;
  confirmPassword?: string;
  email: string;
  streamUrl: string;
}

export interface IUsernameExists {
  exists: boolean;
}

export type StackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
};

export type AuthStackNavigationProp = StackNavigationProp<StackParamList>;
