import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback } from "react";
import { Alert, Dimensions, FlatList, Image } from "react-native";
import { Tabs, TabScreen } from "react-native-paper-tabs";

import { Block, EmptyBlockMessage, Text } from "../../../components";
import { useAppDispatch, useAppSelector } from "../../../store";
import { resolveImage } from "../../../utils";
import { setSnackbarMessage } from "../../common/store";
import { Teams } from "../components";
import { PendingRectruit, SettingsStackNavigationProp, Team } from "../models";
import { getPendingRecruits, getTeams, loadMyTeams, leaveTeam } from "../store";

type Props = {
  navigation: SettingsStackNavigationProp;
};

const SLIDER_WIDTH = Dimensions.get("window").width;

const MyTeams = ({ navigation }: Props) => {
  const dispatch = useAppDispatch();
  const pendingRecruits = useAppSelector(getPendingRecruits);

  const teams = useAppSelector(getTeams);

  const pendTitle =
    pendingRecruits.length > 0
      ? `Pending Recruit(${pendingRecruits.length})`
      : "Pending Recruit";

  useFocusEffect(
    useCallback(() => {
      fetchTeamsData();
      return () => {};
    }, []),
  );

  const fetchTeamsData = async () => {
    try {
      dispatch(loadMyTeams());
    } catch (error) {
      dispatch(
        setSnackbarMessage("An error occurered while processing your request."),
      );
      console.log({ error });
    }
  };

  const handleTeamEdit = (item: Team) => {
    navigation.navigate("MyTeamsDetails", {
      teamId: item.id,
      teamName: item.name,
    });
  };
  const handleTeamRemove = (item: Team) => {
    Alert.alert(
      "Logout",
      "Are you sure you want to leave the team?",
      [
        {
          text: "Leave",
          onPress: () => processLeaveTeam(item),
        },
        { text: "Cancel" },
      ],
      { cancelable: false },
    );
  };

  const processLeaveTeam = async (team: Team) => {
    try {
      await dispatch(leaveTeam(team));
      dispatch(setSnackbarMessage("Left team successfully."));
      dispatch(loadMyTeams());
    } catch (error) {
      dispatch(
        setSnackbarMessage("An error occurered while processing your request."),
      );
      console.log({ error });
    }
  };

  const renderItem = ({ item }: { item: PendingRectruit; index: number }) => {
    let team = teams.find(recruit => recruit.id === item.teamID);

    return (
      <Block
        noflex
        row
        padding={10}
        style={{
          borderWidth: 1,
          borderColor: "#fff",
        }}>
        {item.logo ? (
          <Block noflex center middle marginRight={10}>
            <Image
              source={{ uri: resolveImage(item.logo) }}
              style={{ width: 100, height: 100 }}
            />
          </Block>
        ) : null}
        <Block>
          <Block noflex marginBottom={10}>
            <Text h3 bold>
              {item.user}
            </Text>
          </Block>
          {team ? (
            <Block noflex>
              <Text subtitle>{team.game}</Text>
            </Block>
          ) : null}
        </Block>
      </Block>
    );
  };

  return (
    <Tabs>
      <TabScreen label={"Teams"}>
        <Block margin={10}>
          <Teams
            items={teams}
            onEdit={handleTeamEdit}
            onRemove={handleTeamRemove}
          />
        </Block>
      </TabScreen>
      <TabScreen label={pendTitle}>
        <Block margin={10}>
          <FlatList
            data={pendingRecruits}
            keyExtractor={item => `pending-recruit-${item.id}`}
            renderItem={renderItem}
            style={{ marginBottom: 10 }}
            ListEmptyComponent={() => (
              <EmptyBlockMessage
                message={"No pending recruits are available."}
              />
            )}
          />
        </Block>
      </TabScreen>
    </Tabs>
  );
};

export default MyTeams;
