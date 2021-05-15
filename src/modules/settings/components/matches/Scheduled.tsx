import React from "react";
import { FlatList, Image, StyleSheet } from "react-native";
import { Divider, TouchableRipple } from "react-native-paper";
import { Block, EmptyBlockMessage, Text } from "../../../../components";
import { formatDate, resolveImage } from "../../../../utils";
import { Match, SettingsStackNavigationProp } from "../../models";

type Props = {
  items: Match[];
  navigation: SettingsStackNavigationProp;
};

const Scheduled = ({ items, navigation }: Props) => {
  const renderItem = ({ item }: { item: Match; index: number }) => {
    return (
      // <TouchableRipple
      //   onPress={() => navigation.navigate("MatchDetails", { match: item })}>
      // </TouchableRipple>
      <Block
        flex
        row
        padding={10}
        marginBottom={10}
        style={{
          borderWidth: 1,
          borderColor: "#cacaca",
        }}>
        <Block center>
          <Image
            source={{ uri: resolveImage(item.homeTeam.logo) }}
            style={styles.image}
          />
          <Text primary subtitle center>
            {item.awayTeam.name}
          </Text>
        </Block>
        <Block noflex marginHorizontal={25} center middle>
          <Block noflex center>
            <Text subtitle bold>
              {formatDate(item.dateScheduled, "DD MMM, YYYY")}
            </Text>
            <Text subtitle>at</Text>
            <Text subtitle bold>
              {formatDate(item.dateScheduled, "hh:mm A")}
            </Text>
          </Block>
        </Block>
        <Block center>
          <Image
            source={{ uri: resolveImage(item.awayTeam.logo) }}
            style={styles.image}
          />
          <Text primary subtitle center>
            {item.awayTeam.name}
          </Text>
        </Block>
      </Block>
    );
  };

  return (
    <Block margin={10}>
      <FlatList
        data={items}
        keyExtractor={(item, key) => `schedule-item-${key}`}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={() => (
          <EmptyBlockMessage message={"No matches are schedules."} />
        )}
      />
    </Block>
  );
};

export default Scheduled;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#cacaca",
    borderRadius: 5,
  },
});
