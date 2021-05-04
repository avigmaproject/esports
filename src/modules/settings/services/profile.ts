import { api } from "../../../utils";
import { User } from "../../auth/models";

const UPDATE_PROFILE = `/User`;

export const myTeams = async () => {};

export const myMatches = async () => {};

export const uploadLogo = async () => {};

export const updateUser = async (data: User) => {
  return await api().patch(`${UPDATE_PROFILE}/${data.id}`, data);
};
