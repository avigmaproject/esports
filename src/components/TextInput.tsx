import React, { memo, ReactNode } from "react";
import { View, StyleSheet, TextInput as NativeTextInput } from "react-native";
import { HelperText, TextInput as Input } from "react-native-paper";
import { theme } from "../core/theme";

type Props = React.ComponentProps<typeof Input> & {
  errorText?: string;
  inputStyle?: object;
  right?: ReactNode;
  left?: ReactNode;
};

const TextInput = ({ errorText, inputStyle, ...props }: Props) => (
  <View style={styles.container}>
    {/* <Input
      style={[styles.input, inputStyle]}
      selectionColor={theme.colors.background}
      underlineColor="red"
      mode="outlined"
      {...props}
    /> */}
    <NativeTextInput
      style={[styles.input, inputStyle]}
      selectionColor={theme.colors.primary}
      underlineColor="red"
      {...props}
    />
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
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
    color: theme.colors.text,
    fontSize: 16,
  },
  error: {
    fontSize: 14,
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
