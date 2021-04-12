import React, { Component } from "react";
import { Animated, SafeAreaView, StyleSheet, View } from "react-native";
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
  flex?: boolean;
  noflex?: boolean;
  row?: boolean;
  column?: boolean;
  center?: boolean;
  middle?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  bottom?: boolean;
  card?: boolean;
  shadow?: null | boolean;
  elevation?: number;
  wrap?: boolean;
  animated?: boolean;
  safe?: boolean;
  color?: null | string;
  space?: null | string;
  radius?: null | number;
  style?: null | object;
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
  theme?: null | object;
};

class Block extends Component<Props> {
  static defaultProps = {
    flex: true,
    row: false,
    column: false,
    center: false,
    middle: false,
    left: false,
    right: false,
    top: false,
    bottom: false,
    card: false,
    shadow: null,
    elevation: 3,
    color: null,
    space: null,
    margin: null,
    padding: null,
    radius: null,
    wrap: false,
    animated: false,
    safe: false,
    style: {},
    theme: {},
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
      flex,
      noflex,
      row,
      column,
      center,
      middle,
      left,
      right,
      top,
      bottom,
      card,
      shadow,
      elevation,
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
      // positioning
      space,
      radius,
      wrap,
      animated,
      theme,
      safe,
      style,
      children,
      ...props
    } = this.props;

    const excludeProps: string[] = [
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

    const { SIZES, COLORS } = mergeTheme(baseTheme, theme);
    const marginSpacing = this.getSpacings("margin");
    const paddingSpacing = this.getSpacings("padding");

    const blockStyles: any = StyleSheet.flatten([
      styles.block,
      flex && { flex: flex === true ? 1 : flex },
      (!flex || noflex) && { flex: 0 },
      row && styles.row,
      column && styles.column,
      center && styles.center,
      middle && styles.middle,
      left && styles.left,
      right && styles.right,
      top && styles.top,
      bottom && styles.bottom,
      marginSpacing,
      paddingSpacing,
      wrap && styles.wrap,
      shadow && {
        elevation,
        shadowColor: COLORS.black,
        shadowOffset: elevation && { width: 0, height: elevation - 1 },
        shadowOpacity: 0.1,
        shadowRadius: elevation,
      },
      space && { justifyContent: `space-${space}` },
      card && { borderRadius: SIZES.border },
      radius && { borderRadius: radius },
      // color shortcuts
      primary && { backgroundColor: COLORS.primary },
      secondary && { backgroundColor: COLORS.secondary },
      tertiary && { backgroundColor: COLORS.tertiary },
      black && { backgroundColor: COLORS.black },
      white && { backgroundColor: COLORS.white },
      gray && { backgroundColor: COLORS.gray },
      error && { backgroundColor: COLORS.error },
      warning && { backgroundColor: COLORS.warning },
      success && { backgroundColor: COLORS.success },
      info && { backgroundColor: COLORS.info },
      color && { backgroundColor: color }, // custom backgroundColor
      style, // rewrite predefined styles
    ]);

    if (animated) {
      return (
        <Animated.View style={blockStyles} {...extraProps}>
          {children}
        </Animated.View>
      );
    }

    if (safe) {
      return (
        <SafeAreaView style={blockStyles} {...extraProps}>
          {children}
        </SafeAreaView>
      );
    }

    return (
      <View style={blockStyles} {...extraProps}>
        {children}
      </View>
    );
  }
}

// Block.defaultProps = {
//   flex: true,
//   row: false,
//   column: false,
//   center: false,
//   middle: false,
//   left: false,
//   right: false,
//   top: false,
//   bottom: false,
//   card: false,
//   shadow: null,
//   elevation: 3,
//   color: null,
//   space: null,
//   margin: null,
//   padding: null,
//   radius: null,
//   wrap: false,
//   animated: false,
//   safe: false,
//   style: {},
//   theme: {},
// };

export default Block;

export const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
  },
  column: {
    flexDirection: "column",
  },
  center: {
    alignItems: "center",
  },
  middle: {
    justifyContent: "center",
  },
  left: {
    justifyContent: "flex-start",
  },
  right: {
    justifyContent: "flex-end",
  },
  top: {
    justifyContent: "flex-start",
  },
  bottom: {
    justifyContent: "flex-end",
  },
  wrap: { flexWrap: "wrap" },
});
