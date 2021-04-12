import React from "react";
import { DarkTheme, DefaultTheme, useTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";

import { StackNavigator as AuthNavigator, AuthState } from "../modules/auth";
import { StackNavigator as NoInternetStackNavigator } from "../modules/common";
import { RootState } from "../store";
import Login from "../modules/auth/screens/Login";

const Authenticated = createStackNavigator();

const AuthenticatedNavigator = () => {
  const { Navigator, Screen } = Authenticated;
  return (
    <Navigator>
      <Screen name="Test" component={Login} />
    </Navigator>
  );
};

export const RootNavigator = () => {
  const authState: AuthState = useSelector(
    (state: RootState) => state.authReducer,
  );
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer>
      {authState.user ? <AuthenticatedNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export const NoInternetNavigator = () => {
  const theme = useTheme();
  const navigationTheme = theme.dark ? DarkTheme : DefaultTheme;
  return (
    <NavigationContainer>
      <NoInternetStackNavigator />
    </NavigationContainer>
  );
};
