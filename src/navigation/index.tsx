import React from "react";
import { useTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";

import { StackNavigator as AuthNavigator } from "../modules/auth";
import { StackNavigator as SettingsNavigator } from "../modules/settings";
import {
  SplashStackNavigator,
  StackNavigator as NoInternetStackNavigator,
} from "../modules/common";
import {
  SelectLeagueHomeNavigator,
  SelectLeagueNavigator,
  StackNavigator as HomeNavigator,
} from "../modules/home";
import {
  PlayersStackNavigator,
  StandingsStackNavigator,
  MatchesStackNavigator,
} from "../modules/tournaments";
import { useAppSelector } from "../store";
import { CombinedDarkTheme } from "./../core/theme";
import { DrawerContent, TabBar, TabBarIcon } from "../components";
import { Image } from "react-native";
import { getCurrentUser } from "../modules/auth/store";
import { User } from "../modules/auth/models";
import { getActiveLeague } from "../modules/home/store";

const MaterialBottomTab = createMaterialBottomTabNavigator();
const AuthenticatedDrawer = createDrawerNavigator();
const BottomTabbar = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { Navigator, Screen } = BottomTabbar;
  const theme = useTheme();
  return (
    <Navigator>
      <Screen
        name="Home"
        component={HomeNavigator}
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

const MaterialBottomTabNavigator = () => {
  const { Navigator, Screen } = MaterialBottomTab;
  const theme = useTheme();
  return (
    <Navigator
      initialRouteName="Home"
      activeColor={theme.colors.primary}
      inactiveColor="#3e2465"
      barStyle={{
        backgroundColor: theme.colors.background,
        borderTopWidth: 1,
        borderTopColor: "#ffffff",
      }}
      labeled={true}>
      <Screen
        name="Home"
        component={HomeNavigator}
        options={{ title: "Standings", tabBarIcon: "home" }}
      />
      <Screen
        name="Home1"
        component={HomeNavigator}
        options={{ title: "Matches", tabBarIcon: "home" }}
      />
      <Screen
        name="Home2"
        component={HomeNavigator}
        options={{ title: "Players", tabBarIcon: "home" }}
      />
      <Screen
        name="Profile"
        component={SettingsNavigator}
        options={{ title: "Profile", tabBarIcon: "account" }}
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
        <Screen
          name="SelectLeague"
          component={SelectLeagueHomeNavigator}
          options={{}}
        />
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
