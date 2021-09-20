import React, { Component } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { spacing, parseSpacing, mergeTheme } from "../utils";
import * as baseTheme from "../utils/theme";

type Props = {
  margin?: number;
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginVertical?: number;
  marginHorizontal?: number;
  padding?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  paddingVertical?: number;
  paddingHorizontal?: number;
  color?: null | string;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  black?: boolean;
  white?: boolean;
  gray?: boolean;
  error?: boolean;
  warning?: boolean;
  success?: boolean;
  info?: boolean;
  animated?: boolean;
  theme?: null | object;
  style?: null | object;
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  title?: boolean;
  subtitle?: boolean;
  caption?: boolean;
  small?: boolean;
  size?: null | number;
  transform?: null;
  regular?: boolean;
  bold?: boolean;
  semibold?: boolean;
  medium?: boolean;
  weight?: boolean;
  light?: boolean;
  center?: boolean;
  right?: boolean;
  spacing?: null | number; // letter-spacing
  height?: null | number; // line-height
  ellipsizeMode: null;
};

class Typography extends Component<Props> {
  static defaultProps = {
    // fonts & sizes
    h1: false,
    h2: false,
    h3: false,
    title: false,
    subtitle: false,
    caption: false,
    small: false,
    size: null,
    margin: null,
    padding: null,
    // styling
    transform: null,
    regular: false,
    bold: false,
    semibold: false,
    medium: false,
    weight: false,
    light: false,
    center: false,
    right: false,
    spacing: null, // letter-spacing
    height: null, // line-height
    // colors
    color: null,
    primary: false,
    secondary: false,
    tertiary: false,
    black: false,
    white: false,
    gray: false,
    error: false,
    warning: false,
    success: false,
    info: false,
    theme: {},
    style: {},
    ellipsizeMode: null,
  };

  getSpacings(type: "margin" | "padding") {
    const {
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginVertical,
      marginHorizontal,
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingVertical,
      paddingHorizontal,
      theme,
    } = this.props;
    const { SIZES } = mergeTheme(baseTheme, theme);

    if (type === "margin") {
      return [
        margin && spacing(type, margin, SIZES.base),
        marginTop && parseSpacing("marginTop", marginTop, SIZES.base),
        marginRight && parseSpacing("marginRight", marginRight, SIZES.base),
        marginBottom && parseSpacing("marginBottom", marginBottom, SIZES.base),
        marginLeft && parseSpacing("marginLeft", marginLeft, SIZES.base),
        marginVertical &&
          parseSpacing("marginVertical", marginVertical, SIZES.base),
        marginHorizontal &&
          parseSpacing("marginHorizontal", marginHorizontal, SIZES.base),
      ];
    }

    if (type === "padding") {
      return [
        padding && spacing(type, padding, SIZES.base),
        paddingTop && parseSpacing("paddingTop", paddingTop, SIZES.base),
        paddingRight && parseSpacing("paddingRight", paddingRight, SIZES.base),
        paddingBottom &&
          parseSpacing("paddingBottom", paddingBottom, SIZES.base),
        paddingLeft && parseSpacing("paddingLeft", paddingLeft, SIZES.base),
        paddingVertical &&
          parseSpacing("paddingVertical", paddingVertical, SIZES.base),
        paddingHorizontal &&
          parseSpacing("paddingHorizontal", paddingHorizontal, SIZES.base),
      ];
    }
  }

  render() {
    const {
      // fonts & sizes
      h1,
      h2,
      h3,
      title,
      subtitle,
      caption,
      small,
      size,
      // styling
      transform,
      regular,
      bold,
      semibold,
      medium,
      weight,
      light,
      center,
      right,
      spacing, // letter-spacing
      height, // line-height
      // colors
      color,
      primary,
      secondary,
      tertiary,
      black,
      white,
      gray,
      error,
      warning,
      success,
      info,
      animated,
      theme,
      style,
      children,
      underline,
      ellipsizeMode,
      ...props
    } = this.props;

    const excludeProps = [
      "margin",
      "marginTop",
      "marginRight",
      "marginBottom",
      "marginLeft",
      "marginVertical",
      "marginHorizontal",
      "padding",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "paddingVertical",
      "paddingHorizontal",
    ];

    const remainingProps = Object.keys(props) as Array<keyof typeof props>;

    const extraProps = remainingProps.reduce((prop: any, key) => {
      if (!excludeProps.includes(`${key}`)) {
        prop[key] = props[key];
      }
      return prop;
    }, {} as Record<`${keyof typeof props}`, number>);

    const { SIZES, COLORS, FONTS, WEIGHTS } = mergeTheme(
      { ...baseTheme },
      theme,
    );

    const marginSpacing = this.getSpacings("margin");
    const paddingSpacing = this.getSpacings("padding");

    const textStyles = StyleSheet.flatten([
      {
        fontWeight: WEIGHTS.regular,
        fontSize: SIZES.font,
        color: COLORS.font,
      },
      h1 && FONTS.h1,
      h2 && FONTS.h2,
      h3 && FONTS.h3,
      title && FONTS.title,
      subtitle && FONTS.subtitle,
      caption && FONTS.caption,
      small && FONTS.small,
      size && { fontSize: size },
      marginSpacing,
      paddingSpacing,
      transform && { textTransform: transform },
      height && { lineHeight: height },
      spacing && { letterSpacing: spacing },
      weight && { fontWeight: weight },
      regular && { fontWeight: WEIGHTS.regular },
      bold && { fontWeight: WEIGHTS.bold },
      semibold && { fontWeight: WEIGHTS.semibold },
      medium && { fontWeight: WEIGHTS.medium },
      light && { fontWeight: WEIGHTS.light },
      center && styles.center,
      right && styles.right,
      underline && { textDecorationLine: "underline" },
      ellipsizeMode && { ellipsizeMode: "tail" },
      // color shortcuts
      primary && { color: COLORS.primary },
      secondary && { color: COLORS.secondary },
      tertiary && { color: COLORS.tertiary },
      black && { color: COLORS.black },
      white && { color: COLORS.white },
      gray && { color: COLORS.gray },
      error && { color: COLORS.error },
      warning && { color: COLORS.warning },
      success && { color: COLORS.success },
      info && { color: COLORS.info },
      color && { color },
      style, // rewrite predefined styles
    ]);

    if (animated) {
      return (
        <Animated.Text style={textStyles} {...extraProps}>
          {children}
        </Animated.Text>
      );
    }

    return (
      <Text style={textStyles} {...extraProps}>
        {children}
      </Text>
    );
  }
}

// Typography.defaultProps = {
//   // fonts & sizes
//   h1: false,
//   h2: false,
//   h3: false,
//   title: false,
//   subtitle: false,
//   caption: false,
//   small: false,
//   size: null,
//   margin: null,
//   padding: null,
//   // styling
//   transform: null,
//   regular: false,
//   bold: false,
//   semibold: false,
//   medium: false,
//   weight: false,
//   light: false,
//   center: false,
//   right: false,
//   spacing: null, // letter-spacing
//   height: null, // line-height
//   // colors
//   color: null,
//   primary: false,
//   secondary: false,
//   tertiary: false,
//   black: false,
//   white: false,
//   gray: false,
//   error: false,
//   warning: false,
//   success: false,
//   info: false,
//   theme: {},
//   style: {},
// };

export default Typography;

const styles = StyleSheet.create({
  // positioning
  center: { textAlign: "center" },
  right: { textAlign: "right" },
});
