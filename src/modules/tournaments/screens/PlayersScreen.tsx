import React, { useCallback, useState } from "react";
import Icon from "react-native-vector-icons/Feather";
import {
  ScrollView,
  StyleSheet
} from "react-native";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import { useFocusEffect, useIsFocused} from "@react-navigation/core";
import {
  DataTable,
  FAB,
  Portal,
  TouchableRipple,
  useTheme,
  Dialog,
  Button,
  RadioButton,
  Divider,
  List,
  IconButton,
  ActivityIndicator,
  Modal,
} from "react-native-paper";
import { theme as coreTheme, theme } from "../../../core/theme";
import { Block, Text, TextInput } from "../../../components";
import {
  Players,
  Connoissueurs,
  Substitutes,
  Casters,
} from "./../components/players";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getActiveLeague } from "../../tournaments/store";
import {
  getLeagueRegions,
  getLeagueRegionsWithCode,
  getLeagueSeasons,
  getLeagueStandings,
  getCasters,
  getPlayers,
  getPlayerScreenLoading,
  loadCastersByLeague,
  loadPlayersByLeague,
} from "../store";
import * as fromModels from "../models";

type Props = {
  navigation: fromModels.PlayersStackNavigatorProp;
};

const PlayersScreen = ({ navigation }: Props) => {
  const seasons = useAppSelector(getLeagueSeasons);
  const regions = useAppSelector(getLeagueRegionsWithCode);
  const dispatch = useAppDispatch();
  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [selectedSeason, setSelectedSeason] = useState<string>("");
  const [rankMin, setRankMin] = useState<string>("");
  const activeLeague: fromModels.League = useAppSelector(getActiveLeague)!;
  const teams = useAppSelector(getPlayers);
  // const casters = useAppSelector(getCasters);
  const loading = useAppSelector(getPlayerScreenLoading);
  const [visible, setVisible] = React.useState(false);
  const isFocused = useIsFocused();
  

   const [filterRegionRank, setFilterRegionRank] = useState<
    | {
        region: string;
        rankMin: string;
        season: string;
      }
    | undefined
  >(undefined);

 useFocusEffect(
    useCallback(() => {
      let mounted = true;

      if (mounted) {
        navigation.setOptions({
          headerTitle: `Worldwide`,
        });
        dispatch(setHeaderSubTitle("Ladder"));

        let request: fromModels.StandingRequest = {
          league: activeLeague.key,
        };
        if (filterRegionRank) {
          request = {
            ...request,
            region: filterRegionRank.region,
            rankMin: parseInt(filterRegionRank.rankMin, 10),
            season: filterRegionRank.season,
          };

          if (filterRegionRank.region) {
            const rg = regions.find(
              item => item.code === filterRegionRank.region,
            );
            navigation.setOptions({
              headerTitle: rg?.name,
            });
          } else {
            navigation.setOptions({
              headerTitle: "Worldwide",
            });
          }
        }
      if (teams.length === 0){
        dispatch(loadStandingsByLeague(request));
      }
      }
      return () => {
        mounted = false;
      };
    }, [activeLeague, filterRegionRank]),
  );
  
  const indexSeasons: { [key: string]: string } = seasons.reduce(
    (acc, cur) => ({
      ...acc,
      [cur.id]: cur.name,
    }),
    {},
  );

  const showDialog = () => {
    if (filterRegionRank) {
      setSelectedRegion(filterRegionRank.region);
      setRankMin(filterRegionRank.rankMin);
      setSelectedSeason(filterRegionRank.season);
    }
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const redirectToPlayerDetails = (player: fromModels.Player) => {
    navigation.navigate("PlayerDetails", {
      playerId: player.id,
      playerName: player.name,
    });
  };

  const handleRefreshTeamsData = () => {
    dispatch(loadPlayersByLeague(activeLeague.key));
  };

  const handleRefreshCastersData = () => {
    dispatch(loadCastersByLeague(activeLeague.key));
  };

    const handleRegionFilterModal = () => {
    setFilterRegionRank({
      region: selectedRegion,
      rankMin: rankMin,
      season: selectedSeason,
    });
    hideDialog();
  };

    const renderRegionRegFilterModal = () => {
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Filter</Dialog.Title>
          <Divider />
          <Dialog.ScrollArea
            style={{
              paddingHorizontal: 0,
              maxHeight: 400,
            }}>
            <ScrollView>
              <List.Section>
                <List.Subheader>Season</List.Subheader>
                <RadioButton.Group
                  onValueChange={newValue => setSelectedSeason(newValue)}
                  value={selectedSeason}>
                  {seasons.map(season => (
                    <RadioButton.Item
                      label={season.name}
                      value={season.id}
                      key={`region-${season.id}`}
                      style={{
                        paddingVertical: 2,
                      }}
                    />
                  ))}
                </RadioButton.Group>
              </List.Section>
              <List.Section>
                <List.Subheader>Region</List.Subheader>
                <RadioButton.Group
                  onValueChange={newValue => setSelectedRegion(newValue)}
                  value={selectedRegion}>
                  {regions.map(region => (
                    <RadioButton.Item
                      label={region.name}
                      value={region.code}
                      key={`region-${region.code}`}
                      style={{
                        paddingVertical: 2,
                      }}
                    />
                  ))}
                </RadioButton.Group>
              </List.Section>
              <Divider />
              <List.Section>
                <List.Subheader>Min Rank</List.Subheader>
                <Block noflex marginHorizontal={15}>
                  <TextInput
                    placeholder="Minimum Rank"
                    returnKeyType="next"
                    value={rankMin}
                    onChangeText={text => setRankMin(text)}
                    autoCapitalize="none"
                    inputStyle={styles.textInput}
                    placeholderTextColor="#adadad"
                    containerStyle={styles.textInputContainer}
                    // keyboardType="numeric"
                  />
                </Block>
              </List.Section>
            </ScrollView>
          </Dialog.ScrollArea>
          <Divider />
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={handleRegionFilterModal}>Filter</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };

  return (
    <Tabs>
      <TabScreen label={"Players"}>
        <Players
          teams={teams}
          handlePlayerDetails={redirectToPlayerDetails}
          refreshData={handleRefreshTeamsData}
          loading={loading}
        />
      </TabScreen>
      <TabScreen label={"Substitutes"}>
        <Substitutes />
      </TabScreen>
      {/* 
      <TabScreen label={"Connoissueurs"}>
        <Connoissueurs />
      </TabScreen> */}
      {/* <TabScreen label={"Casters"}>
        <Block margin={10}>
          <Casters casters={casters} refreshData={handleRefreshCastersData} />
        </Block>
      </TabScreen> */}
      {/* <TabScreen label={"Cooldown"}>
        <Connoissueurs />
      </TabScreen> */}
      {renderRegionRegFilterModal()}
       {!visible && (
          <Portal>
            <FAB
              style={{
                position: "absolute",
                margin: 16,
                right: 0,
                bottom: 75,
              }}
              icon="filter"
              onPress={showDialog}
              visible={isFocused}
            />
          </Portal>
        )}
    </Tabs>
  );
};

export default PlayersScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  header: { height: 50, backgroundColor: "#537791" },
  text: { textAlign: "center", fontWeight: "100" },
  dataWrapper: { marginTop: -1 },
  row: { flexDirection: "row", backgroundColor: "#FFF1C1" },
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
