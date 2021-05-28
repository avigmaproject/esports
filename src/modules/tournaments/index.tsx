import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PlayersScreen from "./screens/PlayersScreen";
import { Header } from "../../components";

const PlayersStack = createStackNavigator();

const PlayersStackNavigator = () => {
  const { Navigator, Screen } = PlayersStack;
  return (
    <Navigator
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      <Screen name="Players" component={PlayersScreen} />
    </Navigator>
  );
};

export { PlayersStackNavigator };
