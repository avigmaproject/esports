import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import PlayersScreen from "./screens/PlayersScreen";
import { Header } from "../../components";
import reducers from "./store";
import Standings from "./screens/Standings";
import TeamDetails from "./screens/TeamDetails";
import Matches from "./screens/Matches";

const PlayersStack = createStackNavigator();
const StandingsStack = createStackNavigator();
const MatchesStack = createStackNavigator();

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

const StandingsStackNavigator = () => {
  const { Navigator, Screen } = StandingsStack;
  return (
    <Navigator
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      <Screen name="Standings" component={Standings} />
      <Screen name="TeamDetails" component={TeamDetails} />
    </Navigator>
  );
};

const MatchesStackNavigator = () => {
  const { Navigator, Screen } = MatchesStack;
  return (
    <Navigator
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      <Screen name="Matches" component={Matches} />
      {/* <Screen name="TeamDetails" component={TeamDetails} /> */}
    </Navigator>
  );
};

export {
  reducers,
  PlayersStackNavigator,
  StandingsStackNavigator,
  MatchesStackNavigator,
};
