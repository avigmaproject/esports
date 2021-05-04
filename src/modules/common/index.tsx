import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NoInternetScreen from "./screens/NoInternetScreen";
import { CommonState } from "./models";
import reducer, { appReadySelector } from "./reducer";
import SplashScreen from "./screens/SplashScreen";

const Stack = createStackNavigator();
const SplashStack = createStackNavigator();

const StackNavigator = () => {
  const { Navigator, Screen } = Stack;
  return (
    <Navigator>
      <Screen
        name="NoInternet"
        component={NoInternetScreen}
        options={({ route }) => {
          return { headerShown: false };
        }}
      />
    </Navigator>
  );
};

const SplashStackNavigator = () => {
  const { Navigator, Screen } = SplashStack;
  return (
    <Navigator>
      <Screen
        name="VRMLSplashScreen"
        component={SplashScreen}
        options={({ route }) => {
          return { headerShown: false };
        }}
      />
    </Navigator>
  );
};

export { reducer, StackNavigator, appReadySelector, SplashStackNavigator };
export type { CommonState };
