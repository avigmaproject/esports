import { StackNavigationProp } from "@react-navigation/stack";

export type StackParamList = {
  Home: undefined;
  DetailPage: undefined;
};

export type SelectLeagueParamList = {
  SelectLeague: undefined;
};

export interface League {
  title: string;
  key: string;
  logo?: string;
}

export interface HomeState {
  leagues: League[];
  activeLeague: League | null;
}

export type HomeStackNavigationProp = StackNavigationProp<StackParamList>;
export type SelectLeagueStackNavigationProp = StackNavigationProp<SelectLeagueParamList>;
