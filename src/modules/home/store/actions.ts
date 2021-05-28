import { Action, ActionCreator } from "redux";
import { AppDispatch } from "../../../store";
import { League } from "../models";

//constants
export const SET_LEAGUES = "homeReducer/SET_LEAGUES";
export const SET_ACTIVE_LEAGUE = "homeReducer/SET_ACTIVE_LEAGUE";

interface LeagueActionType {
  type: typeof SET_LEAGUES;
  payload: League[];
}

interface ActiveLeagueActionType {
  type: typeof SET_ACTIVE_LEAGUE;
  payload: League;
}

export type HomeActionTypes = LeagueActionType | ActiveLeagueActionType;

// Leagues
export const SetLeagueAC: ActionCreator<HomeActionTypes> = (
  leagues: League[],
) => {
  return { type: SET_LEAGUES, payload: leagues };
};

export const SetActiveLeagueAC: ActionCreator<HomeActionTypes> = (
  league: League,
) => {
  return {
    type: SET_ACTIVE_LEAGUE,
    payload: league,
  };
};

export const setLeagues = (leagues: League[]) => {
  return (dispatch: AppDispatch) => {
    dispatch(SetLeagueAC(leagues));
  };
};

export const setActiveLeague = (league: League) => {
  return (dispatch: AppDispatch) => {
    dispatch(SetActiveLeagueAC(league));
  };
};
