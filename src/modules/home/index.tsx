import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { StackParamList } from "./models";
import Home from "./screens/Home";
import reducer from "./reducer";
import { Header } from "../../components";
import Details from "./screens/Details";

const HomeStack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  const { Navigator, Screen } = HomeStack;

  return (
    <Navigator
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      <Screen name="Home" component={Home} options={{ title: "Home" }} />
      <Screen
        name="DetailPage"
        component={Details}
        options={{ title: "Details" }}
      />
    </Navigator>
  );
};

export { reducer, StackNavigator };
