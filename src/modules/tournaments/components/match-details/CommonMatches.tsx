import React from "react";
import { StyleSheet, Image, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { Card } from "react-native-paper";
import { Block, EmptyBlockMessage, Text } from "../../../../components";
import { formatDate, openUrl, resolveImage } from "../../../../utils";
import * as fromModels from "../../models";

type Props = {
  matches?: fromModels.MatchDetails[];
};

const CommonMatches = ({ matches = [] }: Props) => {
  const renderItem = (item: fromModels.MatchDetails) => {
    return (
      <Card style={{ marginBottom: 10 }}>
        <Card.Title
          title={item.seasonName}
          subtitle={`Played on ${formatDate(
            item.dateScheduled,
            "ddd, MMM DD, YYYY HH:mm A",
          )}`}
        />
        <Card.Content>
          <Block flex row>
            <Block center>
              <Image
                source={{ uri: resolveImage(item.homeTeam.logo) }}
                style={styles.image}
              />
              <Text primary subtitle center>
                {item.homeTeam.name}
              </Text>
            </Block>
            <Block noflex marginHorizontal={25} center middle>
              <Block row noflex center marginBottom={10}>
                {item.homeTeam.id === item.winningTeamID ? (
                  <Icon name="arrow-up" color={"green"} size={20} />
                ) : (
                  <Icon name="arrow-down" color={"red"} size={20} />
                )}
                <Block row noflex>
                  <Text>{item.homeScore}</Text>
                  <Text>{" - "}</Text>
                  <Text>{item.awayScore}</Text>
                </Block>
                {item.awayTeam.id === item.winningTeamID ? (
                  <Icon name="arrow-up" color={"green"} size={20} />
                ) : (
                  <Icon name="arrow-down" color={"red"} size={20} />
                )}
              </Block>
              <Block noflex center>
                <Text subtitle bold>
                  {formatDate(item.dateScheduled, "DD MMM, YYYY")}
                </Text>
                <Text subtitle>at</Text>
                <Text subtitle bold>
                  {formatDate(item.dateScheduled, "hh:mm A")}
                </Text>
              </Block>
              {item.vodURL && (
                <Block center marginTop={10}>
                  <Icon
                    name="eye"
                    size={15}
                    color="#fafafa"
                    onPress={() => openUrl(item.vodURL!)}
                  />
                </Block>
              )}
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
        </Card.Content>
      </Card>
    );
  };

  if (matches.length > 0) {
    return (
      <Block marginBottom={10}>
        <Block noflex center middle paddingVertical={10}>
          <Text title primary>
            Common Past Matches
          </Text>
        </Block>
        <FlatList
          nestedScrollEnabled
          scrollEnabled={false}
          data={matches}
          keyExtractor={item => `common-past-match-${item.id}`}
          renderItem={({ item }) => renderItem(item)}
          ListEmptyComponent={
            <EmptyBlockMessage message="No common past matches are available." />
          }
        />
      </Block>
    );
  } else {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <EmptyBlockMessage message="No common past matches are available." />
        </Card.Content>
      </Card>
    );
  }
};
export default CommonMatches;

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  cell: {
    justifyContent: "center",
  },
  title: {
    justifyContent: "center",
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#cacaca",
    borderRadius: 5,
  },
});
