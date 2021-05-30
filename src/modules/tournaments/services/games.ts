import { api } from "../../../utils";
import * as fromModels from "../models";

// Function Calls
export const getPlayersByLeague = (
  league: string,
  region?: string,
): Promise<fromModels.Team[]> => {
  return api().get(`/${league}/Players?region=${region}`);
};

export const getSubstitutesByLeague = (
  league: string,
  region?: string,
): Promise<fromModels.Substitute[]> => {
  return api().get(`/${league}/Players?region=${region}`);
};

export const getConnoissuersByLeague = (league: string, region?: string) => {
  return api().get(`/${league}/Players?region=${region}`);
};

export const getCastersByLeague = (
  league: string,
): Promise<fromModels.Caster[]> => {
  return api().get(`/${league}/Casters`);
};

export const getRegionsByLeague = (
  league: string,
): Promise<fromModels.Region[]> => {
  return api().get(`/${league}/Regions`);
};

export const getSeasonsByLeague = (
  league: string,
): Promise<fromModels.Season[]> => {
  return api().get(`/${league}/Seasons`);
};
