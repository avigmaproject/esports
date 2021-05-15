import React from "react";
import { View } from "react-native";
import { Button, Title, Paragraph } from "react-native-paper";
import {
  Tabs,
  TabScreen,
  useTabIndex,
  useTabNavigation,
} from "react-native-paper-tabs";
import { SettingsStackNavigationProp } from "../models";

type Props = {
  navigation: SettingsStackNavigationProp;
  route: any;
};

const MatchDetails = ({ navigation, route }: Props) => {
  const {
    params: { match },
  } = route;

  return (
    <Tabs>
      <TabScreen label="Info">
        <ExploreWitHookExamples />
      </TabScreen>
      <TabScreen label="Substitutes">
        <View style={{ backgroundColor: "black", flex: 1 }} />
      </TabScreen>
    </Tabs>
  );
};

export default MatchDetails;

function ExploreWitHookExamples() {
  const goTo = useTabNavigation();
  const index = useTabIndex();
  return (
    <View style={{ flex: 1 }}>
      <Title>Explore</Title>
      <Paragraph>Index: {index}</Paragraph>
      <Button onPress={() => goTo(1)}>Go to Flights</Button>
    </View>
  );
}
