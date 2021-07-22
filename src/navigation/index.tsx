import React from "react";
import { useTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/Feather";

import { StackNavigator as AuthNavigator } from "../modules/auth";
import { StackNavigator as SettingsNavigator } from "../modules/settings";
import {
  SplashStackNavigator,
  StackNavigator as NoInternetStackNavigator,
} from "../modules/common";
import {
  PlayersStackNavigator,
  StandingsStackNavigator,
  MatchesStackNavigator,
  HomeStackNavigator,
  SelectLeagueNavigator,
  TeamRegisterStackNavigator,
} from "../modules/tournaments";
import { useAppSelector } from "../store";
import { CombinedDarkTheme } from "./../core/theme";
import { DrawerContent } from "../components";
import { Image } from "react-native";
import { getCurrentUser } from "../modules/auth/store";
import { User } from "../modules/auth/models";
import { getActiveLeague } from "../modules/tournaments/store";

const AuthenticatedDrawer = createDrawerNavigator();
const BottomTabbar = createBottomTabNavigator();
const DrawerStack = createStackNavigator();

const BottomTabNavigator = () => {
  const { Navigator, Screen } = BottomTabbar;
  const theme = useTheme();
  return (
    <Navigator>
      <Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => {
            return (
              <Icon
                name="home"
                color={focused ? theme.colors.primary : "#fafafa"}
                size={20}
              />
            );
          },
        }}
      />
      <Screen
        name="Standings"
        component={StandingsStackNavigator}
        options={{
          title: "Standings",
          tabBarIcon: ({ focused }) => {
            let image = require("./../assets/tab-bar/inactive/leagues.png");
            if (focused) {
              image = require("./../assets/tab-bar/active/leagues.png");
            }
            return <Image source={image} />;
          },
        }}
      />
      <Screen
        name="Tournaments"
        component={MatchesStackNavigator}
        options={{
          title: "Matches",
          tabBarIcon: ({ focused }) => {
            let image = require("./../assets/tab-bar/inactive/tournaments.png");
            if (focused) {
              image = require("./../assets/tab-bar/active/tournaments.png");
            }
            return <Image source={image} />;
          },
        }}
      />
      <Screen
        name="Players"
        component={PlayersStackNavigator}
        options={{
          title: "Players",
          tabBarIcon: ({ focused }) => {
            let image = require("./../assets/tab-bar/inactive/members.png");
            if (focused) {
              image = require("./../assets/tab-bar/active/members.png");
            }
            return <Image source={image} />;
          },
        }}
      />
      <Screen
        name="Settings"
        component={SettingsNavigator}
        options={{
          title: "Profile",
          tabBarIcon: ({ focused }) => {
            let image = require("./../assets/tab-bar/inactive/profile.png");
            if (focused) {
              image = require("./../assets/tab-bar/active/profile.png");
            }
            return <Image source={image} style={{ width: 24, height: 24 }} />;
          },
        }}
      />
    </Navigator>
  );
};

const AuthenticatedDrawerNavigator = () => {
  const { Navigator, Screen } = AuthenticatedDrawer;
  const activeLeague = useAppSelector(getActiveLeague);

  if (!activeLeague) {
    return <SelectLeagueNavigator />;
  } else {
    return (
      <Navigator drawerContent={props => <DrawerContent {...props} />}>
        <Screen name="Home" component={BottomTabNavigator} />
      </Navigator>
    );
  }
};

const AuthenticatedNavigator = () => {
  const { Navigator, Screen } = DrawerStack;
  const activeLeague = useAppSelector(getActiveLeague);

  if (!activeLeague) {
    return <SelectLeagueNavigator />;
  } else {
    return (
      <Navigator mode="modal">
        <Screen
          name="Home"
          component={AuthenticatedDrawerNavigator}
          options={{ headerShown: false }}
        />
        <Screen name="TeamRegister" component={TeamRegisterStackNavigator} />
      </Navigator>
    );
  }
};

export const RootNavigator = () => {
  const user: User | null = useAppSelector(getCurrentUser);
  return (
    <NavigationContainer theme={CombinedDarkTheme}>
      {user ? <AuthenticatedDrawerNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export const NoInternetNavigator = () => {
  return (
    <NavigationContainer theme={CombinedDarkTheme}>
      <NoInternetStackNavigator />
    </NavigationContainer>
  );
};

export const SplashScreenNavigator = () => {
  return (
    <NavigationContainer theme={CombinedDarkTheme}>
      <SplashStackNavigator />
    </NavigationContainer>
  );
};
