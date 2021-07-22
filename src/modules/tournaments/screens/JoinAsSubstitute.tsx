import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/core";
import { FlatList, SafeAreaView, StyleSheet } from "react-native";
import { Card, Button, Text } from "react-native-paper";
import { useToast } from "react-native-paper-toast";

import { EmptyBlockMessage, Block } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../store";
import { loadMyTeams } from "../../settings/store";
import * as fromModels from "../models";
import { theme as coreTheme } from "../../../core/theme";
import {
  getActiveLeague,
  getActiveLeagueRegionIDsMap,
  getLeagueRegions,
  isUserRegistered,
  loadRegionsByLeague,
  registerAsSubstitute,
} from "../store";

const JoinAsSubstitute = () => {
  const dispatch = useAppDispatch();
  const toaster = useToast();

  const isRegisteredInTeam = useAppSelector(isUserRegistered);
  const regionIDs = useAppSelector(getActiveLeagueRegionIDsMap);
  const activeLeague = useAppSelector(getActiveLeague)!;
  const regions = useAppSelector(getLeagueRegions);
  const [selectedRegion, setSelectedRegion] = React.useState<string | null>(
    null,
  );
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      if (mounted) {
        dispatch(loadRegionsByLeague(activeLeague.key));
      }

      return () => {
        mounted = false;
      };
    }, [activeLeague.key]),
  );

  const isRegistered = (region: fromModels.Region) => {
    return regionIDs.includes(region.id);
  };

  const handleRegister = async (item: fromModels.Region) => {
    try {
      setSelectedRegion(item.id);
      setDisabled(true);
      setLoading(true);
      await dispatch(
        registerAsSubstitute({
          game: activeLeague.key,
          region: item.id,
        }),
      );
      dispatch(loadMyTeams());
      dispatch(loadRegionsByLeague(activeLeague.key));
      setDisabled(false);
      setLoading(false);
      setSelectedRegion(null);
      toaster.show({
        message: "Registered as substitute successfully.",
        type: "success",
      });
    } catch (error) {
      setDisabled(false);
      setLoading(false);
      setSelectedRegion(null);
    }
  };

  const renderItem = (item: fromModels.Region) => {
    return (
      <Card style={{ marginBottom: 10 }}>
        <Card.Title
          title={item.name}
          right={() =>
            regionIDs.length > 0 ? (
              !isRegistered(item) ? null : (
                <Block marginRight={15} center middle>
                  <Text>Registered</Text>
                </Block>
              )
            ) : (
              <Button
                disabled={disabled}
                loading={loading && selectedRegion === item.id}
                onPress={() => handleRegister(item)}>
                Register
              </Button>
            )
          }
        />
      </Card>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      {isRegisteredInTeam ? (
        <Block marginVertical={10}>
          <EmptyBlockMessage message="You are already playing in a team." />
        </Block>
      ) : (
        <FlatList
          data={regions}
          keyExtractor={item => `region-item-${item.id}`}
          renderItem={({ item }) => renderItem(item)}
          ListEmptyComponent={() => (
            <EmptyBlockMessage message={"No regions are available."} />
          )}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          style={{
            margin: 10,
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default JoinAsSubstitute;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    zIndex: 100,
    backgroundColor: coreTheme.colors.background,
    paddingLeft: 10,
  },
  textInputContainer: {
    marginVertical: 0,
    marginBottom: 10,
  },
});
