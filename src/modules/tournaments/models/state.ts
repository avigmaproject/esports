import { SerializedError } from "@reduxjs/toolkit";
import { Caster, BaseStadium, Region, Season, Team } from "./games";

export interface TournamentState {
  players: string[];
  regions: Region[];
  seasons: Season[];
  casters: Caster[];
  maps: BaseStadium[];
  standings: Team[];
  error: SerializedError | null;
}
