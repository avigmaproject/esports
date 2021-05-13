import { createSelector } from "reselect";
import { Team } from "../models";

import * as fromReducers from "./reducer";

export const getPendingRecruits = createSelector(
  fromReducers.getMyTeams,
  myTeams => myTeams?.pendingRecruits,
);
export const getTeams = createSelector(
  fromReducers.getMyTeams,
  myTeams => myTeams?.teams,
);
export const getTeamById = createSelector(getTeams, teams => (teamId: string) =>
  teams.find(team => team.id === teamId),
);

// export const isTeamOwner = createSelector(
//   // getTeamById,
//   // (team: Team) => (userId: string) =>
//   //   team.players.find(player => team.id === userId),
//   // player => player.name === "Team Owner",
//   fromReducers.
// );

// export const isTeamOwner = createSelector(
//   fromReducers.getMyTeams,
//   (teams: Team[], teamId: string, userId: string) => teams.find(item => item.id === teamId),
//   (team: Team, userId: string) => team.players.find(item => item.id === userId),
//   player => player.name === "Team Owner",
// );
