import { CancelToken } from "axios";
import { api } from "../../../utils";
import { LOGIN, REGISTER, ME_DETAILS, SEARCH_EXISTS } from "../constants";
import {
  CreateAccountData,
  ILogin,
  ILoginResponse,
  IUsernameExists,
  User,
} from "../models";

export const login = async ({ username, password }: ILogin) => {
  return await api().get<any, ILoginResponse>(
    `${LOGIN}?username=${username}&password=${password}`,
  );
};

export const meDetails = async (cancelToken?: CancelToken | undefined) => {
  return api().get<any, User>(`${ME_DETAILS}`, {
    cancelToken: cancelToken,
  });
};

export const register = async (data: CreateAccountData) => {
  return await api().put(`${REGISTER}`, data);
};

export const checkUsername = async (username: string) => {
  return await api().get<string, IUsernameExists>(
    `${SEARCH_EXISTS}?name=${username}`,
  );
};

export const forgotPassword = async () => {};

export const resetPassword = async () => {};
