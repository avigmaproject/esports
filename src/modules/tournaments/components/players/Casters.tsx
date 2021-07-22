import React, { useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Card, Divider, Avatar } from "react-native-paper";

import { Block, Text } from "../../../../components";
import { resolveImage } from "../../../../utils";
import * as fromModels from "../../models";

type Props = {
  casters: fromModels.Caster[];
  refreshData?: () => void;
};

const Casters = ({ casters, refreshData }: Props) => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshData && refreshData();
    setRefreshing(false);
  }, []);
  const renderItem = (item: fromModels.Caster) => {
    return (
      <Block center>
        <Avatar.Image source={{ uri: resolveImage(item.logo) }} size={100} />
        <Text white marginVertical={10}>
          {item.name}
        </Text>
      </Block>
    );
  };

  return (
    <FlatList
      data={casters}
      numColumns={3}
      keyExtractor={item => `caster-${item.id}`}
      renderItem={({ item }) => renderItem(item)}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#fafafa"]}
          progressBackgroundColor={"#fafafa"}
        />
      }
    />
  );
};

export default Casters;
