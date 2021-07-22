import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { FlatList, Image, Animated } from "react-native";
import { Chip } from "react-native-paper";
import { Block, Text } from "../../../components";
import { resolveImage } from "../../../utils";
import { Team } from "../models";
import { IconButton, useTheme } from "react-native-paper";

type Props = {
  items: Team[];
  onEdit: (item: Team) => void;
  onRemove: (item: Team) => void;
};

const Teams = ({ items, onEdit, onRemove }: Props) => {
  const theme = useTheme();
  const renderRightActions = (
    progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation,
    item: Team,
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <Block noflex space="around">
        <Block center middle>
          <IconButton
            icon="pencil"
            color={theme.colors.primary}
            onPress={() => onEdit(item)}
          />
        </Block>
        <Block center middle>
          <IconButton
            icon="logout"
            color={theme.colors.error}
            onPress={() => onRemove(item)}
          />
        </Block>
      </Block>
    );
  };

  const renderItem = (item: Team) => {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) =>
          renderRightActions(progress, dragX, item)
        }>
        <Block
          color={theme.colors.background}
          row
          style={{ borderWidth: 1, borderColor: "#fff" }}
          paddingVertical={10}
          paddingHorizontal={10}
          marginBottom={10}>
          <Block noflex middle center marginRight={10}>
            <Image
              source={{ uri: resolveImage(item.logo) }}
              style={{ width: 100, height: 100 }}
            />
          </Block>
          <Block>
            <Block noflex marginBottom={10}>
              <Text title bold primary>
                {item.name}
              </Text>
            </Block>
            <Block noflex marginBottom={10}>
              <Text subtitle>{item.game}</Text>
            </Block>
            {item.active ? (
              <Block noflex>
                <Chip
                  style={{
                    flex: 1,
                    backgroundColor: theme.colors.primary,
                    width: "30%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  Active
                </Chip>
              </Block>
            ) : null}
          </Block>
        </Block>
      </Swipeable>
    );
  };

  const renderEmpty = () => {
    return (
      <Block center middle paddingVertical={20}>
        <Text>Not registered in any team.</Text>
      </Block>
    );
  };

  return (
    <FlatList
      data={items}
      renderItem={({ item }) => renderItem(item)}
      keyExtractor={item => `team-${item.id}`}
      ListEmptyComponent={renderEmpty}
    />
  );
};

export default Teams;
