import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from "../core/theme";

type Props = React.ComponentProps<typeof PaperButton>;

const Button = ({ mode, style, labelStyle, children, ...props }: Props) => (
  <PaperButton
    style={[
      styles.button,
      mode === "outlined" && { backgroundColor: theme.colors.surface },
      style,
    ]}
    labelStyle={[styles.text, labelStyle]}
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
    fontSize: 18,
    lineHeight: 30,
  },
});

export default memo(Button);
