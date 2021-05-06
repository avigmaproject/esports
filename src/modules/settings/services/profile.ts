import axios from "axios";
import { API_BASE_URL } from "../../../config";
import { api } from "../../../utils";
import { User } from "../../auth/models";

const UPDATE_PROFILE = `/User`;
const MODIFY_LOGO = `/User/Logo`;

export const updateLogo = async (data: FormData, token: string) => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: false,
    headers: {
      Accept: "application/json",
      "Content-Type": `multipart/form-data`,
      Authorization: `Bearer ${token}`,
    },
  });

  return await instance.post(`${MODIFY_LOGO}`, data);
};

export const myTeams = async () => {};

export const myMatches = async () => {};

export const uploadLogo = async () => {};

export const updateUser = async (data: User) => {
  return await api().patch(`${UPDATE_PROFILE}/${data.id}`, data);
};
