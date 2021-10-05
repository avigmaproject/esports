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
import { useAppDispatch, useAppSelector } from "../../../store";
import { getActiveLeague } from "../../tournaments/store";
import {
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
  const dispatch = useAppDispatch();
  const activeLeague: fromModels.League = useAppSelector(getActiveLeague)!;
  const teams = useAppSelector(getPlayers);
  // const casters = useAppSelector(getCasters);
  const loading = useAppSelector(getPlayerScreenLoading);

  useFocusEffect(
    useCallback(() => {
      if (teams.length === 0) {
        dispatch(loadPlayersByLeague(activeLeague.key));
      }
      // if (casters.length === 0) {
      //   dispatch(loadCastersByLeague(activeLeague.key));
      // }

      return () => {};
    }, [activeLeague]),
  );

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
    </Tabs>
  );
};

export default PlayersScreen;
