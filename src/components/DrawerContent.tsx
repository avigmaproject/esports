import React from "react";
import { Alert, StyleSheet } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { useTheme, Drawer } from "react-native-paper";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import { theme } from "./../core/theme";
import Block from "./Block";
import { useAppDispatch, useAppSelector } from "../store";
import { getActiveLeague } from "../modules/home/store";
import { logoutUser } from "../modules/auth/store";

const DrawerContent = (props: any) => {
  const paperTheme = useTheme();
  const dispatch = useAppDispatch();
  const activeLeague = useAppSelector(getActiveLeague);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Logout",
          onPress: () => dispatch(logoutUser()),
        },
        { text: "Cancel" },
      ],
      { cancelable: false },
    );
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{
        backgroundColor: theme.colors.secondary,
        flexGrow: 1,
      }}>
      <Block style={styles.drawerContent}>
        <Drawer.Section style={styles.drawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label={
              activeLeague ? `${activeLeague.title} League` : "Select League"
            }
            onPress={() => props.navigation.navigate("SelectLeague")}
          />
          {/* 
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Teams"
            onPress={() => {}}
            />*/}
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Home"
            onPress={() =>
              props.navigation.navigate("Home", { screen: "Home" })
            }
          />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Standings"
            onPress={() =>
              props.navigation.navigate("Home", { screen: "Standings" })
            }
          />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Matches"
            onPress={() =>
              props.navigation.navigate("Home", { screen: "Tournaments" })
            }
          />

          {/* 
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Members"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Rules"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Register"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Sponsers"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Merch Store"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="About VRML"
            onPress={() => {}}
          />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Contact Us"
            onPress={() => {}}
          /> */}
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Logout"
            onPress={handleLogout}
          />
        </Drawer.Section>
      </Block>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    marginTop: 20,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default DrawerContent;
