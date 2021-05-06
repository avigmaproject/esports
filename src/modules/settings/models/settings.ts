import { StackNavigationProp } from "@react-navigation/stack";

export interface Team {}

export interface Match {}

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
  id?: string;
  username?: string;
  password?: string;
  oldPassword?: string;
  email?: string;
  streamUrl: string;
  country?: string;
  nationality?: string;
  timezone?: string;
  theme?: string;
  discord?: string;
}

export interface IChangePassword {
  oldPassword: string;
  password: string;
  confirmPassword?: string;
}

export interface IUpdateLogo {
  image: FormData;
  data?: string;
}

export interface ProjectTheme {
  [key: string]: string;
}

export interface SettingsState {
  myTeams: Team[];
  myMatches: Match[];
}

export type StackParamList = {
  SettingsMenu: undefined;
  UpdateProfile: undefined;
  ChangePassword: undefined;
  MyTeams: undefined;
  MyMatches: undefined;
};

export type SettingsStackNavigationProp = StackNavigationProp<StackParamList>;
