import React, { useState } from "react";
import { Alert, StyleSheet, ScrollView, Platform } from "react-native";
import { HelperText, useTheme } from "react-native-paper";
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
  const [username, setUsername] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [streamUrl, setStreamUrl] = useState({ value: "", error: "" });
  return (
    <ScrollView>
      <Block color={theme.colors.background} style={styles.container}>
        <Block
          noflex
          center
          style={{
            marginTop: Platform.OS === "ios" ? 30 : null,
          }}>
          <BackButton goBack={() => navigation.goBack()} />
          <Text color={theme.colors.text} h2 bold>
            CREATE ACCOUNT
          </Text>
        </Block>
        <Block noflex marginTop={20}>
          <Block noflex paddingHorizontal={40} marginBottom={10}>
            <Text color={theme.colors.text}>Username</Text>
            <TextInput
              placeholder="Your username"
              returnKeyType="next"
              value={username.value}
              onChangeText={text => setUsername({ value: text, error: "" })}
              error={!!username.error}
              errorText={username.error}
              autoCapitalize="none"
              inputStyle={styles.textInput}
              placeholderTextColor="#adadad"
            />
          </Block>
          <Block noflex paddingHorizontal={40} marginBottom={10}>
            <Text color={theme.colors.text}>Password</Text>
            <TextInput
              placeholder="Your Password"
              returnKeyType="next"
              value={password.value}
              onChangeText={text => setPassword({ value: text, error: "" })}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
              inputStyle={styles.textInput}
              placeholderTextColor="#adadad"
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                top: -50,
                right: 10,
                zIndex: 1000,
              }}
              onPress={() => Alert.alert("ttt")}>
              <Icon name={"eye-off"} size={20} color={"#fff"} />
            </TouchableOpacity>
          </Block>
          <Block noflex paddingHorizontal={40} marginBottom={10}>
            <Text color={theme.colors.text}>Confirm Password</Text>
            <TextInput
              placeholder="Confirm Password"
              returnKeyType="next"
              value={confirmPassword.value}
              onChangeText={text =>
                setConfirmPassword({ value: text, error: "" })
              }
              error={!!confirmPassword.error}
              errorText={confirmPassword.error}
              secureTextEntry
              inputStyle={styles.textInput}
              placeholderTextColor="#adadad"
            />
            <TouchableOpacity
              style={{
                position: "absolute",
                top: -50,
                right: 10,
                zIndex: 1000,
              }}
              onPress={() => Alert.alert("ttt")}>
              <Icon name={"eye-off"} size={20} color={"#fff"} />
            </TouchableOpacity>
          </Block>
          <Block noflex paddingHorizontal={40} marginBottom={10}>
            <Text color={theme.colors.text}>Email</Text>
            <TextInput
              placeholder="Your email"
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
            <HelperText type="info" style={{ paddingLeft: 0 }}>
              Your email will not be given or sold to anyone
            </HelperText>
          </Block>
          <Block
            noflex
            paddingHorizontal={40}
            paddingVertical={20}
            marginBottom={10}
            style={{ backgroundColor: "#03152f" }}>
            <Text color={theme.colors.text}>
              Stream URL (include the https://)
            </Text>
            <TextInput
              placeholder="Stream URL"
              returnKeyType="done"
              value={streamUrl.value}
              onChangeText={text => setStreamUrl({ value: text, error: "" })}
              error={!!streamUrl.error}
              errorText={streamUrl.error}
              autoCapitalize="none"
              inputStyle={[styles.textInput, { backgroundColor: "#03152f" }]}
              placeholderTextColor="#adadad"
            />
            <HelperText type="info" style={{ paddingLeft: 0 }}>
              To promote your stream
            </HelperText>
          </Block>
          <Block noflex paddingHorizontal={40} center marginVertical={5}>
            <Block row noflex>
              <Text color={theme.colors.text} size={12}>
                By signing-up, you agree to the{" "}
              </Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Block
                  noflex
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: theme.colors.text,
                  }}>
                  <Text color={theme.colors.text} size={12}>
                    Terms of Use
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
            <Button
              mode="contained"
              uppercase={false}
              labelStyle={{ color: coreTheme.colors.text }}
              onPress={() => Alert.alert("Under Construction")}>
              Submit
            </Button>
          </Block>
        </Block>
        <Block noflex center>
          <Block row noflex>
            <Text color={theme.colors.text}>I'm already a member. </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Block
                noflex
                style={{
                  borderBottomWidth: 2,
                  borderBottomColor: theme.colors.primary,
                }}>
                <Text color={theme.colors.primary}>Sign In</Text>
              </Block>
            </TouchableOpacity>
          </Block>
        </Block>
      </Block>
    </ScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  textInput: {
    zIndex: 100,
    backgroundColor: coreTheme.colors.background,
  },
});
