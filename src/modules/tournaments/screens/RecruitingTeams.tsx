import React, { useCallback } from "react";
import { ScrollView, Image, SafeAreaView, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import { DataTable, TouchableRipple } from "react-native-paper";
import { useToast } from "react-native-paper-toast";

import { Block, Text } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../store";
import {
  getRecruitingTeams,
  getStandingsLoading,
  loadStandingsByLeague,
  submitRecruitMe,
} from "../store";
import { getActiveLeague } from "../../tournaments/store";
import { resolveImage } from "../../../utils";
import * as fromModels from "../models";
import { theme as coreTheme } from "../../../core/theme";

type Props = {
  navigation: fromModels.StandingsStackNavigationProp;
};

const RecruitingTeams = ({ navigation }: Props) => {
  const ref = React.useRef<ScrollView>(null);
  const toaster = useToast();
  const dispatch = useAppDispatch();
  const activeLeague = useAppSelector(getActiveLeague)!;
  const standings = useAppSelector(getRecruitingTeams);

  const loading = useAppSelector(getStandingsLoading);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      if (mounted) {
        navigation.setOptions({
          headerTitle: `Recruiting Teams`,
        });

        let request: fromModels.StandingRequest = {
          league: activeLeague.key,
        };

        dispatch(loadStandingsByLeague(request));
      }

      return () => {
        mounted = false;
      };
    }, [activeLeague.key]),
  );

  const recruitMe = async (team: fromModels.Team) => {
    try {
      await dispatch(
        submitRecruitMe({
          teamId: team.id,
          recruitReq: {
            op: "replace",
            path: "/recruitRequest",
            value: true,
          },
        }),
      );
      dispatch(loadStandingsByLeague({ league: activeLeague.key }));
      toaster.show({
        message: "Recruit request has been sent successfully.",
        type: "success",
      });
    } catch (error) {
      toaster.show({
        message:
          "An error occurred while processing your request. Please try again.",
        type: "error",
      });
    }
  };

  return (
    <React.Fragment>
      <SafeAreaView style={{ flex: 1 }}>
        <DataTable
          style={{
            marginBottom: 50,
          }}>
          <DataTable.Header style={{ paddingHorizontal: 0 }}>
            <DataTable.Title style={{ justifyContent: "center", flex: 1 }}>
              <Text subtitle primary>
                TEAM
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center", flex: 1 }}>
              <Text subtitle primary>
                REGION
              </Text>
            </DataTable.Title>
            <DataTable.Title style={{ justifyContent: "center", flex: 1 }}>
              <Text subtitle primary>
                RECRUIT
              </Text>
            </DataTable.Title>
          </DataTable.Header>

          {standings.length > 0 ? (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} ref={ref}>
              {standings.map(standing => (
                <DataTable.Row
                  key={`standings-${standing.id}`}
                  style={{ paddingHorizontal: 0 }}>
                  <DataTable.Cell style={{}}>
                    <Block row center>
                      <Image
                        source={{ uri: resolveImage(standing.logo) }}
                        style={{
                          width: 20,
                          height: 20,
                          marginRight: 10,
                          marginLeft: 5,
                        }}
                      />
                      <Text subtitle size={13} style={{ flexWrap: "wrap" }}>
                        {standing.name}
                      </Text>
                    </Block>
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      justifyContent: "center",
                    }}>
                    {standing.region}
                  </DataTable.Cell>
                  <DataTable.Cell
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                    }}>
                    <Block center middle>
                      <TouchableRipple
                        onPress={() => recruitMe(standing)}
                        style={{ paddingVertical: 10, paddingHorizontal: 5 }}>
                        <Text subtitle center primary>
                          Recruit Me
                        </Text>
                      </TouchableRipple>
                    </Block>
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
            </ScrollView>
          ) : (
            <Block noflex center marginVertical={20}>
              <Text white>No data is available.</Text>
            </Block>
          )}
        </DataTable>
      </SafeAreaView>
    </React.Fragment>
  );
};

export default RecruitingTeams;

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
