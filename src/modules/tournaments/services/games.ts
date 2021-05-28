import { api } from "../../../utils";
import { Team } from "../../settings/models";

// Function Calls
export const getPlayersByLeague = (
  league: string,
  region?: string,
): Promise<Team[]> => {
  return api().get(`/${league}/Players?region=${region}`);
};

export const getSubstitutesByLeague = (league: string, region?: string) => {
  return api().get(`/${league}/Players?region=${region}`);
};

export const getConnoissuersByLeague = (league: string, region?: string) => {
  return api().get(`/${league}/Players?region=${region}`);
};

export const getCastersByLeague = (league: string) => {
  return api().get(`/${league}/Casters`);
};

export const getRegionsByLeague = (league: string) => {
  return api().get(`/${league}/Regions`);
};

export const getSeasonsByLeague = (league: string) => {
  return api().get(`/${league}/Seasons`);
};
