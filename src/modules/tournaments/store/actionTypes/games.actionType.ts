import { ActionCreator } from "redux";

import * as fromModels from "../../models";

// Constants
export const SET_PLAYERS = "tournamentsReducer/SET_PLAYERS";
export const SET_CASTERS = "tournamentsReducer/SET_CASTERS";

// Action Types
interface SetPlayersActionType {
  type: typeof SET_PLAYERS;
  payload: any[];
}

interface SetCastersActionType {
  type: typeof SET_CASTERS;
  payload: fromModels.Caster[];
}

export type GamesActionTypes = SetPlayersActionType | SetCastersActionType;

// Action Creators
