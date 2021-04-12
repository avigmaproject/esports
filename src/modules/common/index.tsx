import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import NoInternetScreen from "./screens/NoInternetScreen";
import { CommonState } from "./models";
import reducer, { appReadySelector } from "./reducer";

const Stack = createStackNavigator();

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

export { reducer, StackNavigator, appReadySelector };
export type { CommonState };
