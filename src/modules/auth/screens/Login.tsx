import React, { useState } from "react";
import { Alert, Platform, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import {
  Block,
  Text,
  Button,
  Logo,
  Paragraph,
  BackButton,
  TextInput,
} from "../../../components";
import { theme as coreTheme } from "./../../../core/theme";
import { AuthStackNavigationProp } from "../models";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/Feather";

type Props = {
  navigation: AuthStackNavigationProp;
};

const Login = ({ navigation }: Props) => {
  const theme = useTheme();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  return (
    <Block color={theme.colors.background} style={styles.container}>
      <BackButton
        goBack={() => navigation.goBack()}
        style={{ top: Platform.OS === "ios" ? 30 : 20 }}
      />
      <Block noflex center marginVertical={20}>
        <Logo />
      </Block>
      <Block noflex paddingHorizontal={40}>
        <Block noflex marginBottom={10}>
          <Text color={theme.colors.text}>Username</Text>
          <TextInput
            placeholder="Your username"
            returnKeyType="next"
            value={email.value}
            onChangeText={text => setEmail({ value: text, error: "" })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            inputStyle={styles.textInput}
            placeholderTextColor="#adadad"
          />
        </Block>
        <Block noflex>
          <Text color={theme.colors.text}>Password</Text>

          <TextInput
            placeholder="Your Password"
            returnKeyType="done"
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: "" })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
            inputStyle={styles.textInput}
            placeholderTextColor="#adadad"
          />
          <TouchableOpacity
            style={{ position: "absolute", top: -50, right: 10, zIndex: 1000 }}
            onPress={() => Alert.alert("ttt")}>
            <Icon name={"eye-off"} size={20} color={"#fff"} />
          </TouchableOpacity>
          <Block noflex>
            <Text color={theme.colors.text} right subtitle>
              Forgot Password?
            </Text>
          </Block>
        </Block>
        <Block noflex marginVertical={30}>
          <Button
            mode="contained"
            uppercase={false}
            labelStyle={{ color: coreTheme.colors.text }}
            onPress={() => Alert.alert("Under Construction")}>
            Sign in
          </Button>
        </Block>
      </Block>
      <Block noflex center>
        <Block row noflex>
          <Text color={theme.colors.text}>I'm a new user. </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Block
              noflex
              style={{
                borderBottomWidth: 2,
                borderBottomColor: theme.colors.primary,
              }}>
              <Text color={theme.colors.primary}>Create Account</Text>
            </Block>
          </TouchableOpacity>
        </Block>
      </Block>
    </Block>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 80,
  },
  textInput: {
    zIndex: 100,
    backgroundColor: coreTheme.colors.background,
    // borderBottomWidth: 2,
    // borderBottomColor: "#ffffff",
    // padding: 0,
  },
});
