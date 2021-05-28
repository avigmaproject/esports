import React, { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Image,
  SafeAreaView,
  Dimensions,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/core";
import { useDispatch, useSelector } from "react-redux";
import { Block, Button, EmptyBlockMessage, Text } from "../../../components";
import { RootState } from "../../../store";
import { HomeState, League } from "../models";
import { theme as coreTheme } from "../../../core/theme";
import { TouchableRipple } from "react-native-paper";
import { setActiveLeague } from "../store/actions";

const { width } = Dimensions.get("window");

const SelectLeague = () => {
  const dispatch = useDispatch();
  const { activeLeague, leagues }: HomeState = useSelector(
    (state: RootState) => state.homeReducer,
  );
  const [selectedLeague, setSelectedLeague] = useState<League | null>(
    activeLeague,
  );

  useFocusEffect(
    useCallback(() => {
      return () => {};
    }, []),
  );

  const handleSelectLeague = () => {
    if (selectedLeague) {
      dispatch(setActiveLeague(selectedLeague));
    } else {
      Alert.alert("Warning", "Please select a league");
    }
  };

  const renderItem = ({ item }: { item: League }) => {
    return (
      <Block flex>
        <TouchableRipple
          onPress={() => setSelectedLeague(item)}
          style={[
            styles.item,
            selectedLeague && selectedLeague.key === item.key
              ? styles.selected
              : null,
          ]}>
          <Block flex center>
            <Block flex>
              <Image
                source={require("../../../assets/logo.png")}
                style={styles.image}
              />
            </Block>
            <Block
              center
              noflex
              style={[
                styles.title,
                selectedLeague && selectedLeague.key === item.key
                  ? styles.selectedTitle
                  : null,
              ]}>
              {selectedLeague && selectedLeague.key === item.key ? (
                <Text primary>{item.title}</Text>
              ) : (
                <Text white>{item.title}</Text>
              )}
            </Block>
          </Block>
        </TouchableRipple>
      </Block>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={leagues}
        numColumns={2}
        keyExtractor={item => `league-item-${item.key}`}
        renderItem={renderItem}
        ListEmptyComponent={() => (
          <EmptyBlockMessage message={"No leagues are available."} />
        )}
        contentContainerStyle={{
          flexGrow: 1,
        }}
      />
      <Block marginHorizontal={10} noflex>
        <Button mode="contained" onPress={handleSelectLeague}>
          Select League
        </Button>
      </Block>
    </SafeAreaView>
  );
};

export default SelectLeague;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    height: 200,
    borderWidth: 1,
    borderColor: "#fafafa",
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: coreTheme.colors.secondary,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  image: {
    height: 90,
    width: (width - 80) / 2,
  },
  title: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#032754",
    width: (width - 80) / 2,
    borderRadius: 10,
  },
  selected: {
    backgroundColor: coreTheme.colors.primary,
  },
  selectedTitle: {
    backgroundColor: "#fafafa",
  },
});
