import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { useTheme, List, Avatar, Divider } from "react-native-paper";
import { useSelector } from "react-redux";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

import { Block, Text } from "../../../components";
import { RootState } from "../../../store";
import { formatDate, resolveImage } from "../../../utils";
import { User } from "../../auth/models";

import {
  SettingsStackNavigationProp,
  StackParamList,
} from "../models/settings";

type Props = {
  navigation: SettingsStackNavigationProp;
};

const SettingsMenu = ({ navigation }: Props) => {
  const theme = useTheme();
  const user: User = useSelector((state: RootState) => state.authReducer.user)!;

  const navigateToScreen = (screen: keyof StackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Block noflex color={theme.colors.background}>
        <Block noflex row paddingHorizontal={20} paddingVertical={20}>
          {user.logo ? (
            <Block noflex>
              <Avatar.Image
                size={75}
                source={{
                  uri: resolveImage(user.logo),
                }}
              />
            </Block>
          ) : null}

          <Block noflex marginLeft={20}>
            <Text h2 primary marginBottom={10}>
              @{user.username}
            </Text>
            <Block row>
              <Text title marginBottom={10} primary>
                Joined On:{" "}
              </Text>
              <Text title marginBottom={10}>
                {formatDate(user.dateJoined, "DD MMM, YYYY")}
              </Text>
            </Block>
          </Block>
        </Block>
        <Divider style={styles.divider} />
        <List.Section style={{ marginTop: 0 }}>
          <List.Subheader style={{}}>Account</List.Subheader>
          <Divider style={styles.divider} />
          <List.Item
            title="Profile Information"
            left={() => <List.Icon icon="account-edit" />}
            onPress={() => navigateToScreen("UpdateProfile")}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="My Teams"
            left={() => (
              <List.Icon
                icon={props => <AntDesignIcon name="team" {...props} />}
              />
            )}
            onPress={() => navigateToScreen("MyTeams")}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="My Matches"
            left={() => (
              <List.Icon
                icon={props => (
                  <MaterialIcon name="sports-esports" {...props} />
                )}
              />
            )}
            onPress={() => navigateToScreen("MyMatches")}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Change Password"
            left={() => <List.Icon icon="lock" />}
            onPress={() => navigateToScreen("ChangePassword")}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Terms and Conditions"
            left={() => (
              <List.Icon
                icon={props => <MaterialIcon name="privacy-tip" {...props} />}
              />
            )}
            onPress={() => navigateToScreen("UpdateProfile")}
          />
          <Divider style={styles.divider} />
          <List.Item
            title="Logout"
            left={() => <List.Icon color={theme.colors.error} icon="logout" />}
            onPress={() => {}}
          />
          <Divider style={styles.divider} />
        </List.Section>
      </Block>
    </ScrollView>
  );
};

export default SettingsMenu;

const styles = StyleSheet.create({
  divider: {
    borderBottomWidth: 1,
    borderColor: "#ffffff",
  },
});
