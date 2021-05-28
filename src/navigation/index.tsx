import React from "react";
import { useTheme } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";

import { StackNavigator as AuthNavigator, AuthState } from "../modules/auth";
import { StackNavigator as SettingsNavigator } from "../modules/settings";
import {
  SplashStackNavigator,
  StackNavigator as NoInternetStackNavigator,
} from "../modules/common";
import {
  SelectLeagueNavigator,
  StackNavigator as HomeNavigator,
} from "../modules/home";
import { PlayersStackNavigator } from "../modules/tournaments";
import { RootState } from "../store";
import { CombinedDarkTheme } from "./../core/theme";
import { DrawerContent, TabBar, TabBarIcon } from "../components";
import { Image } from "react-native";
import { HomeState } from "../modules/home/models";

const MaterialBottomTab = createMaterialBottomTabNavigator();
const AuthenticatedDrawer = createDrawerNavigator();
const BottomTabbar = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { Navigator, Screen } = BottomTabbar;
  return (
    <Navigator>
      <Screen
        name="Standings"
        component={HomeNavigator}
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
        component={HomeNavigator}
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
  const { activeLeague }: HomeState = useSelector(
    (state: RootState) => state.homeReducer,
  );

  if (!activeLeague) {
    return <SelectLeagueNavigator />;
  } else {
    return (
      <Navigator drawerContent={() => <DrawerContent />}>
        <Screen name="Home" component={BottomTabNavigator} />
      </Navigator>
    );
  }
};

export const RootNavigator = () => {
  const authState: AuthState = useSelector(
    (state: RootState) => state.authReducer,
  );
  return (
    <NavigationContainer theme={CombinedDarkTheme}>
      {authState.user ? <AuthenticatedDrawerNavigator /> : <AuthNavigator />}
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
