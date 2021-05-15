import { useFocusEffect } from "@react-navigation/core";
import React, { useCallback } from "react";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { setSnackbarMessage } from "../../common/actions";
import { Pending, Scheduled } from "../components";
import { SettingsStackNavigationProp } from "../models";
import {
  getPendingMatches,
  getScheduledMatches,
  loadMyMatches,
} from "../store";

type Props = {
  navigation: SettingsStackNavigationProp;
};

const MyMatches = ({ navigation }: Props) => {
  const dispatch = useDispatch();
  const pendingMatches = useSelector((state: RootState) =>
    getPendingMatches(state.settingsReducer),
  );
  const scheduledMatches = useSelector((state: RootState) =>
    getScheduledMatches(state.settingsReducer),
  );
  const schTitle = "Scheduled";
  const pendTitle =
    pendingMatches.length > 0
      ? `Invitations (${pendingMatches.length})`
      : "Invitations";

  useFocusEffect(
    useCallback(() => {
      fetchMatchesData();
      return () => {};
    }, []),
  );

  const fetchMatchesData = async () => {
    try {
      dispatch(loadMyMatches());
    } catch (error) {
      dispatch(
        setSnackbarMessage("An error occurered while processing your request."),
      );
      console.log({ error });
    }
  };

  return (
    <Tabs>
      <TabScreen label={schTitle}>
        <Scheduled items={scheduledMatches} navigation={navigation} />
      </TabScreen>
      <TabScreen label={pendTitle}>
        <Pending items={pendingMatches} />
      </TabScreen>
    </Tabs>
  );
};

export default MyMatches;
