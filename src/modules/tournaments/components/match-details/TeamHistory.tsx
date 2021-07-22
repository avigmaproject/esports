import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { Card, Divider, DataTable } from "react-native-paper";
import { Block, EmptyBlockMessage, Text } from "../../../../components";
import * as fromModels from "../../models";

type Props = {
  histories?: fromModels.TeamHistory[];
  team: fromModels.BaseTeam;
};

const TeamHistory = ({ histories, team }: Props) => {
  const renderItem = (item: fromModels.TeamHistory) => {
    return (
      <Card style={{ marginBottom: 10 }}>
        <Card.Title title={item.map} />
        <Divider />
        <Card.Content
          style={{
            paddingHorizontal: 0,
            paddingBottom: 0,
          }}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title style={[styles.title, { flex: 3 }]}>
                Matches
              </DataTable.Title>
              <DataTable.Title style={[styles.title, { flex: 3 }]}>
                Rounds
              </DataTable.Title>
            </DataTable.Header>
            <DataTable.Header>
              <DataTable.Title style={styles.title}>Played</DataTable.Title>
              <DataTable.Title style={styles.title}>Win</DataTable.Title>
              <DataTable.Title style={styles.title}>Win %</DataTable.Title>
              <DataTable.Title style={styles.title}>Played</DataTable.Title>
              <DataTable.Title style={styles.title}>Win</DataTable.Title>
              <DataTable.Title style={styles.title}>Win %</DataTable.Title>
            </DataTable.Header>

            {histories &&
              histories.map((history, index) => (
                <DataTable.Row key={`team-history-${team.id}-${index}`}>
                  <DataTable.Cell style={styles.cell}>
                    {history.played}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    {history.win}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    {history.winPercentage}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    {history.roundsPlayed}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    {history.roundsWin}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.cell}>
                    {history.roudsWinPercentage}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
        </Card.Content>
      </Card>
    );
  };

  if (histories && histories.length > 0) {
    return (
      <Block marginBottom={10}>
        <Block noflex center middle row paddingVertical={10}>
          <Text title marginRight={5}>
            Maps all-time history for
          </Text>
          <Text title primary>
            {team.name}
          </Text>
        </Block>
        <FlatList
          nestedScrollEnabled
          scrollEnabled={false}
          data={histories}
          keyExtractor={(item, index) => `common-match-${index}`}
          renderItem={({ item }) => renderItem(item)}
          ListEmptyComponent={
            <EmptyBlockMessage message="No common maps history are available." />
          }
        />
      </Block>
    );
  } else {
    return (
      <Card style={styles.card}>
        <Card.Content>
          <EmptyBlockMessage message="No team history are available." />
        </Card.Content>
      </Card>
    );
  }
};

export default TeamHistory;

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  cell: {
    justifyContent: "center",
  },
  title: {
    flex: 1,
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
