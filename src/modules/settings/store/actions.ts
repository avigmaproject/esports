import { Action, ActionCreator } from "redux";
import { AppDispatch } from "../../../store";
import { User } from "../../auth/models";
import { setSnackbarMessage } from "../../common/actions";
import { IRegion, Match, MyMatches, MyTeams, Team } from "../models";
import * as fromServices from "../services";

export const UPDATE_PROFILE = "settingsReducer/UPDATE_PROFILE";

// My Teams
export const MY_TEAMS = "settingsReducer/MY_TEAMS";
export const MY_TEAMS_LOADING = "settingsReducer/MY_TEAMS_LOADING";
export const MY_TEAMS_ERROR = "settingsReducer/MY_TEAMS_ERROR";
export const GAME_REGIONS = "settingsReducer/GAME_REGIONS";

// My Matches
export const MY_MATCHES = "settingsReducer/MY_MATCHES";

// Action Types

interface UpdateProfile {
  type: typeof UPDATE_PROFILE;
  payload: User;
}

interface MyTeamsActionType {
  type: typeof MY_TEAMS;
  payload: MyTeams;
}

interface MyTeamsLoadingActionType {
  type: typeof MY_TEAMS_LOADING;
}

interface MyTeamsErrorActionType {
  type: typeof MY_TEAMS_ERROR;
  payload: string;
}

interface GameRegionActionType {
  type: typeof GAME_REGIONS;
  payload: IRegion[];
}

interface MyMatchesActionType {
  type: typeof MY_MATCHES;
  payload: MyMatches;
}

export type SettingsActionTypes =
  | UpdateProfile
  | MyTeamsActionType
  | MyTeamsLoadingActionType
  | MyTeamsErrorActionType
  | GameRegionActionType
  | MyMatchesActionType;

// End of Action Types

const setUpdateProfileAc: ActionCreator<SettingsActionTypes> = (user: User) => {
  return { type: UPDATE_PROFILE, payload: user };
};

export const updateUser = (user: User) => {
  return (dispatch: AppDispatch) => {
    dispatch(setUpdateProfileAc(user));
  };
};

// My Teams

export const MyTeamsAc: ActionCreator<SettingsActionTypes> = (
  data: MyTeams,
) => {
  return { type: MY_TEAMS, payload: data };
};

// export class MyTeamsAction implements Action {
//   type = MY_TEAMS;
//   constructor(public payload: MyTeams) {}
// }

export const MyTeamsLoading: ActionCreator<SettingsActionTypes> = () => {
  return { type: MY_TEAMS_LOADING };
};

// export class MyTeamsLoading implements Action {
//   type = MY_TEAMS_LOADING;
// }

export const MyTeamsError: ActionCreator<SettingsActionTypes> = (
  data: string,
) => {
  return { type: MY_TEAMS_ERROR, payload: data };
};

// export class MyTeamsError implements Action {
//   type = MY_TEAMS_ERROR;
//   constructor(public payload: string) {}
// }

export const LoadGameRegions: ActionCreator<SettingsActionTypes> = (
  data: IRegion[],
) => {
  return { type: GAME_REGIONS, payload: data };
};

export const loadMyTeams = () => {
  return (dispatch: AppDispatch) => {
    dispatch(MyTeamsLoading());
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fromServices.myTeams();
        dispatch(MyTeamsAc(data));
        resolve(true);
      } catch (error) {
        dispatch(
          setSnackbarMessage("An error occurred while processing your request"),
        );
        reject(error);
      }
    });
  };
};

export const leaveTeam = (team: Team) => {
  return (dispatch: AppDispatch) => {
    dispatch(MyTeamsLoading());
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fromServices.leaveTeam(team);
        resolve(true);
      } catch (error) {
        console.log({ res: error.response });

        reject(error);
      }
    });
  };
};

export const loadGameRegions = (game: string) => {
  // console.log({ game });

  return (dispatch: AppDispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fromServices.fetchGameRegions(game);
        dispatch(data);
        resolve(true);
      } catch (error) {
        dispatch(LoadGameRegions([]));
        reject(error);
      }
    });
  };
};

// End of My Teams

// Start of My Matches

export const MyMatchesAc: ActionCreator<SettingsActionTypes> = (
  data: MyMatches,
) => {
  return { type: MY_MATCHES, payload: data };
};

export const loadMyMatches = () => {
  return (dispatch: AppDispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await fromServices.myMatches();
        dispatch(MyMatchesAc(data));
        resolve(true);
      } catch (error) {
        dispatch(
          setSnackbarMessage("An error occurred while processing your request"),
        );
        reject(error);
      }
    });
  };
};
// End of My Matches
