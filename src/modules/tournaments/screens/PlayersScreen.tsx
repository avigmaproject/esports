import React, { useCallback } from "react";
import Icon from "react-native-vector-icons/Feather";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import { useFocusEffect } from "@react-navigation/core";

import { Block, Text } from "../../../components";
import {
  Players,
  Connoissueurs,
  Substitutes,
  Casters,
} from "./../components/players";
import * as fromActions from "../store";
import { RootState, useAppDispatch, useAppSelector } from "../../../store";
import { League } from "../../home/models";
import { getActiveLeague } from "../../home/store";

const PlayersScreen = () => {
  const dispatch = useAppDispatch();
  const activeLeague: League = useAppSelector(getActiveLeague)!;
  useFocusEffect(
    useCallback(() => {
      // dispatch(fromActions.getPlayers(activeLeague.key));
      return () => {};
    }, [activeLeague]),
  );

  return (
    <Tabs mode="scrollable">
      <TabScreen label={"Players"}>
        <Players />
      </TabScreen>
      <TabScreen label={"Substitutes"}>
        <Substitutes />
      </TabScreen>
      <TabScreen label={"Connoissueurs"}>
        <Connoissueurs />
      </TabScreen>
      <TabScreen label={"Casters"}>
        <Casters />
      </TabScreen>
      {/* <TabScreen label={"Cooldown"}>
        <Connoissueurs />
      </TabScreen> */}
    </Tabs>
  );
};

export default PlayersScreen;
