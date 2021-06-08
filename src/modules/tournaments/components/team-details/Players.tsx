import React from "react";
import { FlatList, Image } from "react-native";
import { Divider } from "react-native-paper";
import { Block, Text } from "../../../../components";
import { resolveImage } from "../../../../utils";
import * as fromModels from "../../models";

type Props = {
  players: fromModels.Player[];
};

const Players = ({ players }: Props) => {
  const renderItem = (item: fromModels.Player) => {
    return (
      <Block marginRight={10}>
        <Block noflex>
          <Block noflex marginBottom={5}>
            <Image
              source={{ uri: resolveImage(item.logo) }}
              style={{ width: 150, height: 150 }}
            />
          </Block>
          <Block noflex>
            <Block noflex row space="between">
              <Text white subtitle>
                {item.name}
              </Text>
              <Text white subtitle>
                {item.nationality}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
    );
  };

  return (
    <React.Fragment>
      <Block noflex margin={10}>
        <Block noflex center marginBottom={10}>
          <Text title>Players</Text>
        </Block>
        <FlatList
          horizontal
          data={players}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => renderItem(item)}
        />
      </Block>
      <Divider />
    </React.Fragment>
  );
};

export default Players;
