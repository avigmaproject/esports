import { api } from "../../../utils";
import * as fromModels from "../models";

// Function Calls
export const getPlayersByLeague = async (
  league: string,
  region?: string,
): Promise<fromModels.Team[]> => {
  return await api().get(`/${league}/Players?region=${region}`);
};

export const getSubstitutesByLeague = async (
  league: string,
  region?: string,
): Promise<fromModels.Substitute[]> => {
  return api().get(`/${league}/Players?region=${region}`);
};

export const getConnoissuersByLeague = async (
  league: string,
  region?: string,
) => {
  return await api().get(`/${league}/Players?region=${region}`);
};

export const getCastersByLeague = async (
  league: string,
): Promise<fromModels.Caster[]> => {
  return await api().get(`/${league}/Casters`);
};

export const getRegionsByLeague = async (
  league: string,
): Promise<fromModels.Region[]> => {
  return await api().get(`/${league}/Regions`);
};

export const getSeasonsByLeague = async (
  league: string,
): Promise<fromModels.Season[]> => {
  return await api().get(`/${league}/Seasons`);
};

export const getStandingsByLeague = async (
  data: fromModels.StandingRequest,
): Promise<fromModels.Team[]> => {
  return await api().get(
    `/${data.league}/Standings?region=${data.region}&rankMin=${data.rankMin}`,
  );
};

export const getTeamDetails = async (
  teamId: string,
): Promise<fromModels.Team> => {
  return await api().get(`/Teams/${teamId}`);
};

export const getTeamPlayers = async (
  teamId: string,
): Promise<fromModels.TeamDetPlayers> => {
  return await api().get(`/Teams/${teamId}/Players`);
};

export const getTeamUpcomingMatches = async (
  teamId: string,
): Promise<fromModels.Match[]> => {
  return await api().get(`/Teams/${teamId}/Matches/Upcoming`);
};

export const getTeamMatchesHistory = async (
  teamId: string,
): Promise<fromModels.MatchHistory[]> => {
  return await api().get(`/Teams/${teamId}/Matches/History`);
};

export const getLeagueUpcomingMatches = async (
  request: fromModels.MatchRequest,
): Promise<fromModels.Match[]> =>
  await api().get(
    `/${request.league}/Matches/Upcoming?region?=${request.region}`,
  );

export const getLeagueUpcomingMatchDetails = async (
  league: string,
  matchId: string,
): Promise<fromModels.Match[]> =>
  await api().get(`/${league}/Matches/Upcoming/${matchId}`);

export const getLeagueUpcomingProdMatchDetails = async (
  league: string,
  matchId: string,
): Promise<fromModels.Match[]> =>
  await api().get(`/${league}/Matches/UpcomingProduction/${matchId}`);

export const getLeagueMatchesHistory = async (
  request: fromModels.MatchRequest,
): Promise<fromModels.MatchHistory[]> =>
  await api().get(
    `/${request.league}/Matches/History?region=${request.region}&posMin=${request.posMin}`,
  );

export const getLeagueMatchHistoryDetails = async (
  league: string,
  matchId: string,
): Promise<fromModels.MatchHistory[]> =>
  await api().get(`/${league}/Matches/History/${matchId}`);

export const voteForTeam = async (matchId: string) =>
  await api().get(`/Matches/${matchId}/voteTeam`);

export const voteForCast = async (matchId: string) =>
  await api().get(`/Matches/${matchId}/voteCast`);
