import React from "react";
import { StyleSheet } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";
import { Block, Text, Button, Logo } from "../../../components";
import { theme as coreTheme } from "./../../../core/theme";
import { AuthStackNavigationProp } from "../models";
import { SafeAreaView } from "react-native-safe-area-context";
import { TERMS_AND_CONDITIONS_URL } from "../../../config";
import { openUrl } from "../../../utils";

type Props = {
  navigation: AuthStackNavigationProp;
};

const WelcomeScreen = ({ navigation }: Props) => {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <Block color={theme.colors.background} style={styles.container} middle>
        <Block noflex paddingHorizontal={20} marginTop={40}>
          <Block noflex center marginTop={0} marginBottom={20}>
            <Logo />
          </Block>
          <Block noflex>
            <Text color={theme.colors.text} center h4>
              The Perfect VRML app to keep track of news, schedules and results
              for your favorite teams, players and tournaments.
            </Text>
          </Block>
        </Block>
        <Block noflex paddingHorizontal={40} marginVertical={30} middle>
          <Button
            mode="contained"
            uppercase={false}
            style={{ backgroundColor: coreTheme.colors.secondary }}
            labelStyle={{ color: coreTheme.colors.text }}
            onPress={() => navigation.navigate("Register")}>
            {/* Let's Get Started */}
            Create an account
          </Button>
          <Button
            mode="contained"
            uppercase={false}
            labelStyle={{
              color: coreTheme.colors.text,
            }}
            onPress={() => navigation.navigate("Login")}>
            Sign In
          </Button>
        </Block>
        <Block
          noflex
          // marginBottom={20}
          paddingVertical={20}
          paddingHorizontal={40}
          center
          space="around"
          middle>
          <Block noflex row>
            <Block
              noflex
              // style={{
              //   borderBottomWidth: 2,
              //   borderBottomColor: theme.colors.primary,
              // }}
            >
              <Text color={theme.colors.primary} bold>
                Join +19,000
              </Text>
            </Block>
            <Text color={theme.colors.text}> other VRML players </Text>
          </Block>
          <Text color={theme.colors.text}> and users</Text>
        </Block>
        <Block noflex paddingHorizontal={40} center bottom>
          <Text color={theme.colors.text} style={{ fontSize: 10 }} center>
            By using this service you accept
          </Text>
          <TouchableRipple onPress={() => openUrl(TERMS_AND_CONDITIONS_URL)}>
            <Text
              color={theme.colors.text}
              style={{ fontSize: 10 }}
              center
              underline>
              Terms & Services and Privacy Policy
            </Text>
          </TouchableRipple>
        </Block>
      </Block>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  border: {
    borderWidth: 1,
    borderColor: "#ffffff",
  },
});
