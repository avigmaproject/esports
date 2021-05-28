import { Caster, BaseStadium, Region, Season, Team } from "./games";

export interface GameState {
  players: string[];
  regions: Region[];
  seasons: Season[];
  casters: Caster[];
  maps: BaseStadium[];
  standings: Team[];
}
