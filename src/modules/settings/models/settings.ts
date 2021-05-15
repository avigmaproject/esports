import { StackNavigationProp } from "@react-navigation/stack";

export interface PendingRectruit {
  id: string;
  teamID: string;
  user: string;
  userID: string;
  logo?: string;
}

export interface Player {
  id: string;
  userID: string;
  name: string;
  logo: string;
  country: string;
  nationality: string;
  roleID: string;
  role: string;
}

export interface Team {
  id: string;
  game?: string;
  name: string;
  logo: string;
  regionID: string;
  region: string;
  active?: boolean;
  retired?: boolean;
  players?: Player[];
}

export interface PendingMatch {
  id: string;
  invitingTeam: string;
  invitingTeamName: string;
  invitingTeamLogo: string;
  invitingTeamOK: boolean;
  invitedTeam: string;
  invitedTeamName: string;
  invitedTeamLogo: string;
  invitedTeamOK: boolean;
  dateScheduled: string;
}

export interface MapOptions {
  id: string;
  name: string;
}

export interface Score {
  map: string;
  homeScore: string | number | null;
  awayScore: string | number | null;
}

export interface Substitute {
  id: string;
  name: string;
}

export interface Match {
  homeTeam: Team;
  awayTeam: Team;
  scores: Score[];
  mapsOptions: MapOptions[];
  substitutesOptions: Substitute[];
  dateScheduled: string;
}

export interface MyMatches {
  pending: PendingMatch[];
  scheduled: Match[];
}

export interface MyTeams {
  pendingRecruits: PendingRectruit[];
  teams: Team[];
}

export interface Country {
  countryNameEn: string;
  countryNameLocal: string;
  countryCode: string;
  currencyCode: string;
  currencyNameEn: string;
  tinType: string;
  tinName: string;
  officialLanguageCode: string;
  officialLanguageNameEn: string;
  officialLanguageNameLocal: string;
  countryCallingCode: string;
  region: string;
  flag: string;
}

export interface IndexedCountries {
  [key: string]: string;
}

export interface IUpdateProfile {
  [key: string]: string | undefined;
  id?: string;
  username?: string;
  password?: string;
  oldPassword?: string;
  email?: string;
  streamURL?: string;
  country?: string;
  nationality?: string;
  timezone?: string;
  theme?: string;
  discord?: string;
}

export interface IPatchJson {
  op: string;
  path: string;
  value?: any;
}

export interface IChangePassword {
  [key: string]: string | undefined;
  oldPassword: string;
  password: string;
  confirmPassword?: string;
}

export interface IUpdateLogo {
  image: FormData;
  data?: string;
}

export interface IUpdateTeam {
  name?: string;
  region?: string;
  active?: boolean;
  recruiting?: boolean;
  blockingRecruit?: boolean;
  retire?: boolean;
  scrim?: boolean;
  weekdays: {
    start: string | undefined;
    end: string | undefined;
  };
  weekends: {
    start: string | undefined;
    end: string | undefined;
  };
}

export interface IRegion {
  id: string;
  name: string;
}

export interface ProjectTheme {
  [key: string]: string;
}

export interface SettingsState {
  myTeamsLoading: boolean;
  myTeamsLoaded: boolean;
  myTeamsError: string | null;
  myTeams: MyTeams;
  myMatches: MyMatches;
  regions: IRegion[];
}

export type StackParamList = {
  SettingsMenu: undefined;
  UpdateProfile: undefined;
  ChangePassword: undefined;
  MyTeams: undefined;
  MyMatches: undefined;
  MyTeamsDetails: {
    teamId: string;
    teamName: string;
  };
  MatchDetails: {
    match: Match;
  };
};

export type SettingsStackNavigationProp = StackNavigationProp<StackParamList>;
