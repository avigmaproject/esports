import React from "react";
import { Alert, StyleSheet } from "react-native";
import { DrawerItem, DrawerContentScrollView } from "@react-navigation/drawer";
import { useTheme, Drawer, List, Divider } from "react-native-paper";

import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import { theme } from "./../core/theme";
import Block from "./Block";
import { useAppDispatch, useAppSelector } from "../store";
import { getActiveLeague } from "../modules/tournaments/store";
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
          <Divider />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label={
              activeLeague ? `${activeLeague.title} League` : "Select League"
            }
            onPress={() =>
              props.navigation.navigate("Home", {
                screen: "Home",
                params: {
                  screen: "SelectLeague",
                  params: {
                    afterLogin: true,
                  },
                },
              })
            }
          />
          <Divider />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Home"
            onPress={() =>
              props.navigation.navigate("Home", { screen: "Home" })
            }
          />
          <Divider />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Standings"
            onPress={() =>
              props.navigation.navigate("Home", { screen: "Standings" })
            }
          />
          <Divider />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Matches"
            onPress={() =>
              props.navigation.navigate("Home", { screen: "Tournaments" })
            }
          />
          <Divider />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Members"
            onPress={() =>
              props.navigation.navigate("Home", { screen: "Players" })
            }
          />
          <Divider />
          <List.Accordion
            title="Register"
            left={props => (
              <SimpleLineIcons name="check" {...props} size={25} />
            )}
            style={{ marginLeft: 11 }}
            titleStyle={{
              marginLeft: 20,
              fontSize: 14,
            }}>
            <Divider />
            <List.Item
              title="Create a Team"
              titleStyle={{ fontSize: 14 }}
              onPress={() =>
                props.navigation.navigate("Home", {
                  screen: "Home",
                  params: {
                    screen: "CreateTeam",
                  },
                })
              }
            />
            <Divider />
            <List.Item
              title="Join as subsitute"
              titleStyle={{ fontSize: 14 }}
              onPress={() =>
                props.navigation.navigate("Home", {
                  screen: "Home",
                  params: {
                    screen: "JoinAsSubstitute",
                  },
                })
              }
            />
            <Divider />
            <List.Item
              title="Recruiting Teams"
              titleStyle={{ fontSize: 14 }}
              onPress={() =>
                props.navigation.navigate("Home", {
                  screen: "Home",
                  params: {
                    screen: "RecruitingTeams",
                  },
                })
              }
            />
          </List.Accordion>
          <Divider />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="FAQs"
            onPress={() =>
              props.navigation.navigate("Home", {
                screen: "Home",
                params: { screen: "FAQs" },
              })
            }
          />
          <Divider />
          <DrawerItem
            icon={({ color, size }) => (
              <SimpleLineIcons name="check" color={color} size={size} />
            )}
            label="Our Sponsors"
            onPress={() =>
              props.navigation.navigate("Home", {
                screen: "Home",
                params: { screen: "OurSponsors" },
              })
            }
          />
          <Divider />
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
