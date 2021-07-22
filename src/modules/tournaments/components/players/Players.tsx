import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { Avatar, Divider, List, useTheme } from "react-native-paper";
import { Block } from "../../../../components";
import { resolveImage } from "../../../../utils";
import * as fromModels from "../../models";

type Props = {
  teams: fromModels.TeamDetPlayers[];
  handlePlayerDetails: (team: fromModels.Player) => void;
  refreshData?: () => void;
  loading?: boolean;
};

const Players = ({
  teams,
  handlePlayerDetails,
  refreshData,
  loading = false,
}: Props) => {
  const theme = useTheme();
  const ref = React.useRef<ScrollView>(null);

  const onRefresh = React.useCallback(() => {
    refreshData && refreshData();
  }, []);
  return (
    <React.Fragment>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
            colors={[theme.colors.primary, theme.colors.text]}
          />
        }>
        {teams ? (
          <List.Section>
            {teams.map(team => (
              <Block key={`team-${team.id}`}>
                <List.Accordion
                  title={team.name}
                  left={props => (
                    <Avatar.Image
                      source={{ uri: resolveImage(team.logo) }}
                      size={40}
                    />
                  )}>
                  {team.players?.map(player => (
                    <Block noflex key={`player-${player.id}`}>
                      <List.Item
                        title={player.name}
                        left={props => (
                          <Avatar.Image
                            source={{ uri: resolveImage(player.logo) }}
                            size={30}
                          />
                        )}
                        style={{
                          flex: 1,
                          paddingLeft: 0,
                          marginLeft: 0,
                        }}
                        onPress={() => handlePlayerDetails(player)}
                      />
                      <Divider />
                    </Block>
                  ))}
                </List.Accordion>
                <Divider />
              </Block>
            ))}
          </List.Section>
        ) : null}
      </ScrollView>
    </React.Fragment>
  );
};

export default Players;
