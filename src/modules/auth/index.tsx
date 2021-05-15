import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import reducer from "./reducer";
import { AuthState, StackParamList } from "./models";

import WelcomeScreen from "./screens/Welcome";
import Login from "./screens/Login";
import Register from "./screens/Register";
import ForgotPassword from "./screens/ForgotPassword";

const AuthStack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  const { Navigator, Screen } = AuthStack;

  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name="Welcome" component={WelcomeScreen} />
      <Screen name="Login" component={Login}></Screen>
      <Screen name="Register" component={Register}></Screen>
      <Screen name="ForgotPassword" component={ForgotPassword}></Screen>
    </Navigator>
  );
};

export { reducer, StackNavigator };

export type { AuthState };
