import { ActionCreator } from "redux";
import { AppDispatch } from "../../../../store";
import { setSnackbarMessage } from "../../../common/actions";
import { Player, Team } from "../../../settings/models";

import * as fromServices from "../../services";

// Constants
export const SET_PLAYERS = "tournamentsReducer/SET_PLAYERS";
export const SET_CASTERS = "tournamentsReducer/SET_CASTERS";

// Action Types
interface SetPlayersActionType {
  type: typeof SET_PLAYERS;
  payload: Player[];
}

interface SetCastersActionType {
  type: typeof SET_CASTERS;
  payload: any[];
}

export type GamesActionTypes = SetPlayersActionType | SetCastersActionType;

// Action Creators
export const SetPlayersActionCreator: ActionCreator<GamesActionTypes> = (
  data: Player[],
) => {
  return { type: SET_PLAYERS, payload: data };
};

export const SetCastersActionCreator: ActionCreator<GamesActionTypes> = (
  data: any[],
) => {
  return { type: SET_CASTERS, payload: data };
};

// Actions

export const getPlayers = (league: string) => {
  return (dispatch: AppDispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: Team[] = await fromServices.getPlayersByLeague(league);
        const players = data
          .map((team: Team) =>
            team.players?.map((player: Player) => {
              const { players, ...rest } = team;
              player.team = rest;
              return player;
            }),
          )
          .flat();
        console.log({ players });
        // dispatch(SetPlayersActionCreator(data));
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

export const getCasters = (league: string) => {
  return (dispatch: AppDispatch) => {
    return new Promise(async (resolve, reject) => {
      try {
        const data: any[] = await fromServices.getCastersByLeague(league);

        // dispatch(SetPlayersActionCreator(data));
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
