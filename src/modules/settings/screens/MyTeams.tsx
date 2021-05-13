import React, { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { Block, Text } from "../../../components";
import {
  MyTeams as IMyTeams,
  SettingsStackNavigationProp,
  PendingRectruit,
  Team,
} from "../models";
import { Divider } from "react-native-paper";
import { Alert, Dimensions, Image, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { resolveImage } from "../../../utils";
import { loadMyTeams, getPendingRecruits, getTeams, leaveTeam } from "../store";
import { RootState } from "../../../store";
import { Teams } from "../components";
import { setSnackbarMessage } from "../../common/actions";

type Props = {
  navigation: SettingsStackNavigationProp;
};

const SLIDER_WIDTH = Dimensions.get("window").width;

const MyTeams = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const pendingRecruits = useSelector((state: RootState) =>
    getPendingRecruits(state.settingsReducer),
  );

  const teams = useSelector((state: RootState) =>
    getTeams(state.settingsReducer),
  );

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
    let ITEM_WIDTH = Math.round(SLIDER_WIDTH) - 60;
    if (pendingRecruits.length == 1) {
      ITEM_WIDTH = Math.round(SLIDER_WIDTH) - 20;
    }

    let team = teams.find(recruit => recruit.id === item.teamID);

    return (
      <Block
        noflex
        row
        padding={10}
        style={{
          height: 120,
          width: ITEM_WIDTH,
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
    <Block>
      <Block noflex marginVertical={10} marginHorizontal={10}>
        <Block noflex paddingBottom={10}>
          <Text h3 bold>
            Pending Recruits
          </Text>
        </Block>
        {pendingRecruits.length > 0 ? (
          <FlatList
            data={pendingRecruits}
            keyExtractor={item => `pending-recruit-${item.id}`}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 10 }}
          />
        ) : (
          <Block noflex>
            <Text>No pending recruit request are availble.</Text>
          </Block>
        )}
      </Block>
      <Divider style={{ borderColor: "#fff", borderWidth: 1 }} />
      <Block noflex marginVertical={10} marginHorizontal={10}>
        <Block noflex paddingBottom={10}>
          <Text h3 bold>
            Teams
          </Text>
        </Block>
        <Teams
          items={teams}
          onEdit={handleTeamEdit}
          onRemove={handleTeamRemove}
        />
      </Block>
    </Block>
  );
};

export default MyTeams;
