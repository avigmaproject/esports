import React from "react";
import { FlatList, Image, StyleSheet, Dimensions } from "react-native";
import { Block, Text, EmptyBlockMessage } from "../../../../components";
import { PendingMatch } from "../../models";
import { resolveImage, formatDate } from "../../../../utils";

type Props = {
  items: PendingMatch[];
};

const windowWidth = Dimensions.get("window").width;

const Pending = ({ items }: Props) => {
  const renderItem = ({ item }: { item: PendingMatch; index: number }) => {
    return (
      <Block
        noflex
        row
        padding={10}
        style={{
          borderWidth: 1,
          borderColor: "#cacaca",
        }}>
        <Block center>
          <Image
            source={{ uri: resolveImage(item.invitingTeamLogo) }}
            style={styles.image}
          />
          <Text primary subtitle center>
            {item.invitingTeamName}
          </Text>
        </Block>
        <Block noflex marginHorizontal={25} center middle>
          <Block noflex center>
            <Text subtitle bold>
              {formatDate(item.dateScheduled, "DD MMM, YYYY")}
            </Text>
            <Text subtitle>at</Text>
            <Text subtitle bold>
              {formatDate(item.dateScheduled, "hh:mm A")}
            </Text>
          </Block>
        </Block>
        <Block center>
          <Image
            source={{ uri: resolveImage(item.invitedTeamLogo) }}
            style={styles.image}
          />
          <Text primary center subtitle>
            {item.invitedTeamName}
          </Text>
        </Block>
      </Block>
    );
  };

  return (
    <Block margin={10}>
      <FlatList
        data={items}
        keyExtractor={item => `pending-invite-${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        ListEmptyComponent={() => (
          <EmptyBlockMessage
            message={"You do not have any invitations pending."}
          />
        )}
      />
    </Block>
  );
};

export default Pending;

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#cacaca",
    borderRadius: 5,
  },
});
