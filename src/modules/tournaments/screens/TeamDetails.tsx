import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import { useTheme } from "react-native-paper";
import { Block, Text } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../store";
import * as fromModels from "../models";
import {
  getTeamDetails,
  getTeamMatchesHistory,
  getTeamPlayers,
  getTeamUpcomingMatches,
  loadTeamDetails,
  loadTeamMatchesHistory,
  loadTeamPlayers,
  loadTeamUpcomingMatches,
} from "../store";
import {
  BasicDetails,
  Players,
  TeamUpcomingMatches,
  TeamMatchHistory,
} from "../components/team-details";

type Props = {
  navigation: fromModels.StandingsStackNavigationProp;
  route: fromModels.TeamDetailsRouteProp;
};

const TeamDetails = ({ navigation, route }: Props) => {
  const {
    params: { teamName, teamId },
  } = route;
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const teamDetails = useAppSelector(getTeamDetails);
  const players = useAppSelector(getTeamPlayers);
  const upcomingMatches = useAppSelector(getTeamUpcomingMatches);
  const matchesHistories = useAppSelector(getTeamMatchesHistory);

  useFocusEffect(
    useCallback(() => {
      let mounted = true;

      if (mounted) {
        navigation.setOptions({
          headerTitle: teamName,
        });
        dispatch(loadTeamDetails(teamId));
        dispatch(loadTeamPlayers(teamId));
        dispatch(loadTeamUpcomingMatches(teamId));
        dispatch(loadTeamMatchesHistory(teamId));
      }

      return () => {
        mounted = false;
      };
    }, [teamId, teamName]),
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Block>
          {teamDetails && <BasicDetails details={teamDetails} />}
          <Players players={players} />
          <TeamUpcomingMatches matches={upcomingMatches} />
          <Block noflex margin={10}>
            <Block noflex center marginBottom={10}>
              <Text title>Past Matches</Text>
            </Block>
            <TeamMatchHistory matches={matchesHistories} />
          </Block>
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TeamDetails;
