import { SettingsState } from "../models/settings";
import * as fromActions from "./actions";

const initialState: SettingsState = {
  myTeamsLoading: false,
  myTeamsLoaded: false,
  myTeamsError: null,
  myTeams: {
    pendingRecruits: [],
    teams: [],
  },
  myMatches: {
    pending: [],
    scheduled: [],
  },
  regions: [],
};

const reducer = (
  state: SettingsState = initialState,
  action: fromActions.SettingsActionTypes,
): SettingsState => {
  switch (action.type) {
    case fromActions.MY_TEAMS_LOADING: {
      return {
        ...state,
        myTeamsLoading: true,
        myTeamsError: null,
      };
    }
    case fromActions.MY_TEAMS: {
      return {
        ...state,
        myTeamsLoading: false,
        myTeamsError: null,
        myTeams: action.payload,
      };
    }
    case fromActions.MY_TEAMS_ERROR: {
      return {
        ...state,
        myTeamsLoading: false,
        myTeamsError: action.payload,
      };
    }
    case fromActions.MY_MATCHES: {
      return {
        ...state,
        myMatches: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default reducer;

export const getMyTeams = (state: SettingsState) => state.myTeams;
export const getMyTeamsLoading = (state: SettingsState) => state.myTeamsLoaded;
export const getMyTeamsError = (state: SettingsState) => state.myTeamsError;

export const getGameRegions = (state: SettingsState) => state.regions;

export const getMyMatches = (state: SettingsState) => state.myMatches;
