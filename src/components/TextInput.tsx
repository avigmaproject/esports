import React, { memo, ReactNode } from "react";
import {
  View,
  StyleSheet,
  TextInput as NativeTextInput,
  ViewStyle,
} from "react-native";
import { HelperText, TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

type Props = React.ComponentProps<typeof NativeTextInput> & {
  errorText?: string;
  inputStyle?: object;
  right?: ReactNode;
  left?: ReactNode;
  error?: boolean;
  containerStyle?: ViewStyle;
};

const TextInput = ({
  errorText,
  inputStyle,
  containerStyle,
  right,
  left,
  ...props
}: Props) => (
  <View style={[styles.container, containerStyle]}>
    <NativeTextInput
      style={[styles.input, inputStyle]}
      selectionColor={theme.colors.primary}
      {...props}
    />
    {left}
    {right}
    {errorText ? (
      <HelperText type="error" style={styles.error}>
        {errorText}
      </HelperText>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 12,
  },
  input: {
    backgroundColor: theme.colors.surface,
    height: 45,
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
    color: theme.colors.text,
    fontSize: 16,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 0,
    paddingTop: 4,
  },
});

export default memo(TextInput);
