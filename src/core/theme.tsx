import { DarkTheme } from "react-native-paper";
import { DarkTheme as NavigationDarkTheme } from "@react-navigation/native";
import { DarkTheme as PaperDarkTheme } from "react-native-paper";
import merge from "deepmerge";

const paperTheme: typeof PaperDarkTheme = {
  ...PaperDarkTheme,
  roundness: 0,
  colors: {
    ...DarkTheme.colors,
    primary: "#ef741c",
    background: "#01091e",
    error: "#f13a59",
    text: "#ffffff",
  },
};

const navigationTheme: typeof NavigationDarkTheme = {
  ...NavigationDarkTheme,
  dark: true,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: "#ef741c",
    background: "#01091e",
    text: "#ffffff",
    border: "#ffffff",
  },
};

export const CombinedDarkTheme = merge(paperTheme, navigationTheme);

export const theme = {
  ...CombinedDarkTheme,
  colors: {
    ...CombinedDarkTheme.colors,
    secondary: "#031b39",
  },
};
