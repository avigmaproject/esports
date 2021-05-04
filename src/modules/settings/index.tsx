import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import reducer from "./store/reducer";
import { StackParamList } from "./models/settings";
import SettingsMenu from "./screens/SettingsMenu";
import UpdateProfile from "./screens/UpdateProfile";
import { Header } from "../../components";
import ChangePassword from "./screens/ChangePassword";
import MyTeams from "./screens/MyTeams";
import MyMatches from "./screens/MyMatches";

const SettingsStack = createStackNavigator<StackParamList>();

const StackNavigator = () => {
  const { Navigator, Screen } = SettingsStack;

  return (
    <Navigator
      screenOptions={{
        header: props => <Header {...props} />,
      }}>
      <Screen
        name="SettingsMenu"
        component={SettingsMenu}
        options={{ title: "Settings" }}
      />
      <Screen
        name="UpdateProfile"
        component={UpdateProfile}
        options={{
          title: "Profile",
        }}
      />
      <Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: "Change Password",
        }}
      />
      <Screen
        name="MyTeams"
        component={MyTeams}
        options={{
          title: "My Teams",
        }}
      />
      <Screen
        name="MyMatches"
        component={MyMatches}
        options={{
          title: "My Matches",
        }}
      />
    </Navigator>
  );
};

export { reducer, StackNavigator };
