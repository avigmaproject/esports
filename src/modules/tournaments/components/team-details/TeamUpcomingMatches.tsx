import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { DataTable, Divider } from "react-native-paper";
import { Block, EmptyBlockMessage, Text } from "../../../../components";
import * as fromModels from "../../models";

type Props = {
  matches: fromModels.Match[];
};

const TeamUpcomingMatches = ({ matches }: Props) => {
  return (
    <React.Fragment>
      <Block noflex margin={10}>
        <Block noflex center marginBottom={10}>
          <Text title primary>
            Upcoming Matches
          </Text>
        </Block>
        <Block noflex>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Scheduled</DataTable.Title>
              <DataTable.Title>Home</DataTable.Title>
              <DataTable.Title>Away</DataTable.Title>
            </DataTable.Header>
            {matches.length > 0 ? (
              <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {matches.map(match => (
                  <DataTable.Row key={`upcoming-match-${match.id}`}>
                    <DataTable.Cell>{match.dateScheduled}</DataTable.Cell>
                    <DataTable.Cell>{match.homeTeam.name}</DataTable.Cell>
                    <DataTable.Cell>{match.awayTeam.name}</DataTable.Cell>
                  </DataTable.Row>
                ))}
              </ScrollView>
            ) : (
              <Block marginTop={10} noflex>
                <EmptyBlockMessage message="No upcoming matches are available." />
              </Block>
            )}
          </DataTable>
        </Block>
      </Block>
      <Divider />
    </React.Fragment>
  );
};

export default TeamUpcomingMatches;
