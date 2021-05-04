import { ActionCreator } from "redux";
import { AppDispatch } from "../../../store";
import { User } from "../../auth/models";

export const UPDATE_PROFILE = "settingsReducer/UPDATE_PROFILE";

interface UpdateProfile {
  type: typeof UPDATE_PROFILE;
  payload: User;
}

export type SettingsActionTypes = UpdateProfile;

const setUpdateProfileAc: ActionCreator<SettingsActionTypes> = (user: User) => {
  return { type: UPDATE_PROFILE, payload: user };
};

export const updateUser = (user: User) => {
  return (dispatch: AppDispatch) => {
    dispatch(setUpdateProfileAc(user));
  };
};
