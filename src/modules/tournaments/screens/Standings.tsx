import React, { useCallback, useEffect, useState } from "react";
import {
  ScrollView,
  Image,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { useFocusEffect, useIsFocused } from "@react-navigation/core";
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
} from "react-native-paper";

import { Block, Text, TextInput } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../store";
import { getLeagueStandings, loadStandingsByLeague } from "../store";
import { getActiveLeague } from "../../home/store";
import { resolveImage } from "../../../utils";
import * as fromModels from "../models";
import { theme as coreTheme } from "../../../core/theme";

type Props = {
  navigation: fromModels.StandingsStackNavigationProp;
};

const Standings = ({ navigation }: Props) => {
  const ref = React.useRef<ScrollView>(null);
  const dispatch = useAppDispatch();
  const activeLeague = useAppSelector(getActiveLeague)!;
  const standings = useAppSelector(getLeagueStandings);
  const isFocused = useIsFocused();

  const [selectedRegion, setSelectedRegion] = useState<string>("");
  const [regions, setRegions] = useState<{ code: string; title: string }[]>([
    {
      code: "NA",
      title: "America East",
    },
    {
      code: "OCE",
      title: "Oceanic/Asia",
    },
    {
      code: "EU",
      title: "Europe",
    },
    {
      code: "",
      title: "None",
    },
  ]);
  const [rankMin, setRankMin] = useState<string>("");
  const [paginateRankMax, setPaginateRankMax] = useState<number | undefined>(
    undefined,
  );
  const [visible, setVisible] = React.useState(false);
  const [filterRegionRank, setFilterRegionRank] = useState<
    | {
        region: string;
        rankMin: string;
      }
    | undefined
  >(undefined);

  const showDialog = () => {
    if (filterRegionRank) {
      setSelectedRegion(filterRegionRank.region);
      setRankMin(filterRegionRank.rankMin);
    }
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      if (mounted) {
        navigation.setOptions({
          headerTitle: `Worldwide`,
        });

        let request: fromModels.StandingRequest = {
          league: activeLeague.key,
        };
        if (filterRegionRank) {
          request = {
            ...request,
            region: filterRegionRank.region,
            rankMin: parseInt(filterRegionRank.rankMin, 10),
          };
          if (filterRegionRank.region) {
            const rg = regions.find(
              item => item.code === filterRegionRank.region,
            );
            navigation.setOptions({
              headerTitle: rg?.title,
            });
          } else {
            navigation.setOptions({
              headerTitle: "Worldwide",
            });
          }
        }

        dispatch(loadStandingsByLeague(request));
      }

      return () => {
        mounted = false;
      };
    }, [activeLeague.key, filterRegionRank]),
  );

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      if (paginateRankMax) {
        const request: fromModels.StandingRequest = {
          league: activeLeague.key,
          rankMin: paginateRankMax,
        };
        const resultAction = dispatch(loadStandingsByLeague(request));
        resultAction.then(() => {
          ref.current?.scrollTo({ x: 0, y: 0, animated: true });
        });
      }
    }
    return () => {
      mounted = false;
    };
  }, [paginateRankMax]);

  const goToTeamDetails = (team: fromModels.Team) => {
    navigation.navigate("TeamDetails", {
      teamId: team.id,
      teamName: team.name,
    });
  };

  const recruitMe = () => {
    Alert.alert("Info", "Under Construction");
  };

  const handleRegionFilterModal = () => {
    setFilterRegionRank({
      region: selectedRegion,
      rankMin: rankMin,
    });
    hideDialog();
  };

  const paginate = () => {
    const maxRank = Math.max(...standings.map(item => item.rank));
    setPaginateRankMax(maxRank + 1);
  };

  const renderRegionRegFilterModal = () => {
    return (
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Filter</Dialog.Title>
          <Divider />
          <Dialog.Content
            style={{
              paddingHorizontal: 0,
            }}>
            <List.Section>
              <List.Subheader>Region</List.Subheader>
              <RadioButton.Group
                onValueChange={newValue => setSelectedRegion(newValue)}
                value={selectedRegion}>
                {regions.map(region => (
                  <RadioButton.Item
                    label={region.title}
                    value={region.code}
                    key={`region-${region.code}`}
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
                  keyboardType="numeric"
                />
              </Block>
            </List.Section>
          </Dialog.Content>
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
    <React.Fragment>
      <SafeAreaView style={{ flex: 1 }}>
        <DataTable
          style={{
            marginBottom: 50,
          }}>
          <DataTable.Header style={{ paddingHorizontal: 0 }}>
            <DataTable.Title style={{ justifyContent: "center" }}>
              <Text subtitle primary>
                POS
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center" }}>
              <Text subtitle primary>
                DIV
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center", flex: 3 }}>
              <Text subtitle primary>
                TEAM
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center" }}>
              <Text subtitle primary>
                REG
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center" }}>
              <Text subtitle primary>
                W/L
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center" }}>
              <Text subtitle primary>
                PTS
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center" }}>
              <Text subtitle primary>
                MMR
              </Text>
            </DataTable.Title>
          </DataTable.Header>

          {standings.length > 0 ? (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={ref}>
              {standings.map(standing => (
                <DataTable.Row
                  key={`standings-${standing.id}`}
                  style={{ paddingHorizontal: 0 }}>
                  <DataTable.Cell
                    style={{
                      justifyContent: "center",
                    }}>
                    {standing.rank}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      justifyContent: "center",
                    }}>
                    <Image
                      source={{ uri: resolveImage(standing.divisionLogo) }}
                      style={{ width: 20, height: 20 }}
                    />
                  </DataTable.Cell>

                  <Block row style={{ flex: 3 }} center>
                    <TouchableRipple
                      style={{ flex: 1, flexDirection: "row" }}
                      onPress={() => goToTeamDetails(standing)}>
                      <Block row>
                        <Image
                          source={{ uri: resolveImage(standing.logo) }}
                          style={{
                            width: 20,
                            height: 20,
                            marginRight: 10,
                            marginLeft: 5,
                          }}
                        />
                        <Text
                          subtitle
                          size={13}
                          style={{ flex: 1, flexWrap: "wrap" }}>
                          {standing.name}
                        </Text>
                      </Block>
                    </TouchableRipple>
                    {standing.isRecruiting && (
                      <TouchableRipple
                        style={{ flex: 0, borderRadius: 50 }}
                        onPress={recruitMe}>
                        <Image
                          source={require("../../../assets/icons/teamIsRecruiting.png")}
                          style={{ width: 20, height: 20 }}
                        />
                      </TouchableRipple>
                    )}
                  </Block>
                  <DataTable.Cell
                    style={{
                      justifyContent: "center",
                    }}>
                    {"EU"}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      justifyContent: "center",
                    }}>
                    {standing.w}/{standing.l}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      justifyContent: "center",
                    }}>
                    {standing.pts}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      justifyContent: "center",
                    }}>
                    {standing.mmr}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
              <Block noflex center>
                <IconButton
                  icon="arrow-down"
                  color="#fafafa"
                  onPress={paginate}
                  size={30}
                />
              </Block>
            </ScrollView>
          ) : (
            <Block noflex center marginVertical={20}>
              <Text white>No data is available.</Text>
            </Block>
          )}
        </DataTable>
        {renderRegionRegFilterModal()}
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
      </SafeAreaView>
    </React.Fragment>
  );
};

export default Standings;

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
