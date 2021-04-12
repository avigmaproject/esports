import { api } from "../../../utils";
import { LOGIN, REGISTER } from "../constants";
import { CreateAccountData, Login } from "../models";

export const login = async (data: Login) => {
  return await api().post(`${LOGIN}`, data);
};

export const register = async (data: CreateAccountData) => {
  return await api().post(`${REGISTER}`, data);
};
