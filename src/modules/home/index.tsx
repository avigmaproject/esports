import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { StackParamList } from "./models";
import Home from "./screens/Home";
import reducer from "./store";
import { Header } from "../../components";
import Details from "./screens/Details";
import SelectLeague from "./screens/SelectLeague";
import SelectLeagueHome from "./screens/SelectLeagueHome";

const HomeStack = createStackNavigator<StackParamList>();
const SelectLeagueStack = createStackNavigator();
const SelectLeagueHomeStack = createStackNavigator();

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

const SelectLeagueNavigator = () => {
  const { Navigator, Screen } = SelectLeagueStack;
  return (
    <Navigator>
      <Screen
        name="SelectLeague"
        component={SelectLeague}
        options={{ headerTitle: "Select League" }}
      />
    </Navigator>
  );
};

const SelectLeagueHomeNavigator = () => {
  const { Navigator, Screen } = SelectLeagueHomeStack;
  return (
    <Navigator
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      <Screen
        name="SelectLeague"
        component={SelectLeagueHome}
        options={{ headerTitle: "Select League" }}
      />
    </Navigator>
  );
};

export {
  reducer,
  StackNavigator,
  SelectLeagueNavigator,
  SelectLeagueHomeNavigator,
};
