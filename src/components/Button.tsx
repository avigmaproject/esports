import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({
  mode,
  style,
  labelStyle,
  disabled,
  children,
  ...props
}: Props) => (
  <PaperButton
    style={[
      styles.button,
      mode === "outlined" && { backgroundColor: theme.colors.surface },
      // disabled && { backgroundColor: "#dedede" },
      disabled && { backgroundColor: theme.colors.primary },

      style,
    ]}
    labelStyle={[styles.text, labelStyle, disabled && { color: "#000" }]}
    mode={mode}
    {...props}>
    {children}
  </PaperButton>
);

const styles = StyleSheet.create({
  button: {
    width: "100%",
    marginVertical: 10,
    height: 50,
  },
  text: {
    fontSize: 17,
    lineHeight: 28, //changes by minal
  },
});

export default memo(Button);
