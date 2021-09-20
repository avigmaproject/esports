import React, { useState } from "react";
import { Platform, StyleSheet, TouchableOpacity, Keyboard } from "react-native";
import { IconButton, TouchableRipple, useTheme } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Icon from "react-native-vector-icons/Feather";
import axios from "axios";

import { Block, Text, Button, Logo, TextInput } from "../../../components";
import { theme as coreTheme } from "./../../../core/theme";
import {
  AuthStackNavigationProp,
  ILogin,
  ILoginResponse,
  User,
} from "../models";

import Header from "../components/Header";
import { login, meDetails } from "../services/auth";
import { useAppDispatch } from "../../../store";
import { loginUser, setMeDetails } from "../store";

type Props = {
  navigation: AuthStackNavigationProp;
};

const loginSchema = yup.object().shape({
  username: yup.string().required("Username is required."),
  password: yup.string().required("Password is required."),
});

const Login = ({ navigation }: Props) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setError: setErrorForm,
  } = useForm<ILogin>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [isSecureText, setIsSecureText] = useState(true);

  const handleLogin = async (data: ILogin) => {
    Keyboard.dismiss();
    try {
      setLoading(true);
      const { access_token }: ILoginResponse = await login(data);
      axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
      const user: User = await meDetails();
      dispatch(loginUser(access_token));
      dispatch(setMeDetails(user));
      setLoading(false);
    } catch (error) {
      let message = "";
      if (error.response) {
        const {
          data: { Message },
        } = error.response;
        if (Message) {
          setErrorForm("password", { message: Message });
        } else {
          message = "An error occurred while processing your request.";
        }
      } else if (error.request) {
        message = "An error occurred while processing your request.";
      } else {
        message = "An error occurred while processing your request.";
      }

      if (message) {
        setErrorForm("password", { message: message });
      }

      setLoading(false);
    }
  };

  const hasError = (field: string) => {
    return errors.hasOwnProperty(field);
  };

  return (
    <Block color={theme.colors.background} style={styles.container}>
      <Header goBack={() => navigation.goBack()} />
      <Block flex>
        <Block noflex center marginVertical={10}>
          <Logo />
        </Block>
        <Block noflex paddingHorizontal={30}>
          <Block noflex marginBottom={10}>
            <Text color={theme.colors.text}>Username</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Your username"
                  returnKeyType="next"
                  value={value}
                  onChangeText={value => onChange(value)}
                  error={hasError("username")}
                  errorText={errors?.username?.message}
                  autoCapitalize="none"
                  autoCompleteType="email"
                  textContentType="emailAddress"
                  keyboardType="email-address"
                  inputStyle={styles.textInput}
                  placeholderTextColor="#adadad"
                  containerStyle={styles.textInputContainer}
                />
              )}
              name="username"
              rules={{ required: true }}
              defaultValue=""
            />
          </Block>
          <Block noflex>
            <Text color={theme.colors.text}>Password</Text>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Your Password"
                  returnKeyType="done"
                  onChangeText={value => onChange(value)}
                  error={hasError("password")}
                  errorText={errors?.password?.message}
                  secureTextEntry={isSecureText}
                  inputStyle={styles.textInput}
                  placeholderTextColor="#adadad"
                  autoCapitalize="none"
                  containerStyle={styles.textInputContainer}
                  right={
                    <IconButton
                      icon={props => (
                        <Icon
                          name={isSecureText ? "eye-off" : "eye"}
                          {...props}
                        />
                      )}
                      onPress={() => setIsSecureText(!isSecureText)}
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        zIndex: 100,
                      }}
                    />
                  }
                />
              )}
              name="password"
              rules={{ required: true }}
              defaultValue=""
            />

            <Block style={{ justifyContent: "flex-end" }} row noflex>
              <TouchableRipple
                onPress={() => navigation.navigate("ForgotPassword")}>
                <Block
                  row
                  noflex
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: theme.colors.primary,
                  }}>
                  <Text color={theme.colors.primary}> Forgot Password?</Text>
                </Block>
                {/* <Text color={theme.colors.text} right subtitle>
                  Forgot Password?
                </Text> */}
              </TouchableRipple>
            </Block>
          </Block>
          <Block noflex marginTop={30} marginBottom={50}>
            <Button
              mode="contained"
              uppercase={false}
              labelStyle={{ color: coreTheme.colors.text }}
              onPress={handleSubmit(handleLogin)}
              loading={loading}
              disabled={loading}>
              Sign in
            </Button>
          </Block>
        </Block>
        <Block noflex center>
          <Block row noflex>
            {/* <Text color={theme.colors.text}>I'm a new user. </Text> */}
            <Text color={theme.colors.text}>New user?</Text>

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
    </Block>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: Platform.OS === "ios" ? 45 : 0,
  },
  textInputContainer: {
    marginVertical: 0,
    marginBottom: 10,
  },
  textInput: {
    zIndex: 100,
    backgroundColor: coreTheme.colors.background,
  },
});
