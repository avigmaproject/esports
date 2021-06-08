import { RouteProp } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Caster,
  BaseStadium,
  Region,
  Season,
  Team,
  Match,
  Player,
  MatchHistory,
} from "./games";

export interface CustomError {
  message: string;
}

export interface TournamentState {
  players: string[];
  regions: Region[];
  seasons: Season[];
  casters: Caster[];
  maps: BaseStadium[];
  standings: Team[];
  error: string | undefined;
  filterRegRank: FilterRegionMinRank | undefined;
  teamDetails: Team | undefined;
  teamDetPlayers: Player[];
  teamUpcomingMatches: Match[];
  teamMatchesHistory: MatchHistory[];
  upcomingMatches: Match[];
  pastMatches: MatchHistory[];
}

export interface FilterRegionMinRank {
  region: string | null;
  rankMin: number | null;
}

export type StandingsStackParamList = {
  Standings: undefined;
  TeamDetails: {
    teamId: string;
    teamName: string;
  };
};

export type MatchesStackParamList = {
  Matches: undefined;
};

export type TeamDetailsRouteProp = RouteProp<
  StandingsStackParamList,
  "TeamDetails"
>;

export type StandingsStackNavigationProp = StackNavigationProp<
  StandingsStackParamList,
  "TeamDetails"
>;

export type MatchesStackNavigationProp = StackNavigationProp<MatchesStackParamList>;
