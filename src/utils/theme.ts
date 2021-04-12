import { Dimensions } from "react-native";
import { DefaultTheme } from "react-native-paper";
const window = Dimensions.get("window");

const width = window.width;
const height = window.height;

const primary = "#259d6d"; // Blue: #3F51B5
const secondary = "#757575"; // Blue: #757575
const error = DefaultTheme.colors.error;

export const COLORS = {
  // default font color
  font: "#000000",

  // base colors
  primary: primary,
  secondary: secondary,
  tertiary: "#FFE358",

  // non-colors
  black: "#000020",
  white: "#FFFFFF",

  // color variations
  gray: "#535453",
  error: error,
  warning: "#FFE358",
  success: "#4CD964",
  info: "#4DA1FF",
  lightGray: "#dee2e6",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 16,
  radius: 4,
  padding: 24,

  // font sizes
  h1: 34,
  h2: 24,
  h3: 20,
  title: 18,
  subtitle: 14,
  caption: 12,
  small: 10,

  // app dimensions
  width,
  height,
};

export const FONTS = {
  h1: { fontSize: SIZES.h1, letterSpacing: 0.15 },
  h2: { fontSize: SIZES.h2, letterSpacing: 0 },
  h3: { fontSize: SIZES.h3, letterSpacing: 0.15 },
  title: { fontSize: SIZES.title, letterSpacing: 0.15 },
  subtitle: { fontSize: SIZES.subtitle },
  caption: { fontSize: SIZES.caption, letterSpacing: 0.4 },
  small: { fontSize: SIZES.small, letterSpacing: 1.5 },
};

export const WEIGHTS = {
  regular: "normal",
  bold: "bold",
  semibold: "500",
  medium: "400",
  light: "300",
};

export const paperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#ffffff",
    primary: primary,
    secondary: secondary,
    error: error,
    text: "#212121",
    accent: "#00BCD4", // Blue: #00BCD4
  },
};

export default { COLORS, SIZES, FONTS, WEIGHTS, paperTheme };
