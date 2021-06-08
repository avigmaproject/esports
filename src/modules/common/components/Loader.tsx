import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import { ActivityIndicator } from "react-native-paper";

import { Text, Block } from "../../../components";
import { useAppSelector } from "../../../store";
import { getLoading, getLoadingText } from "../store/loader.slice";

const Loader = () => {
  const loading = useAppSelector(getLoading);
  const loadingText = useAppSelector(getLoadingText);

  return (
    <Modal transparent={true} animationType={"none"} visible={loading}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={loading} size={20} />
          {loadingText ? (
            <Block middle center noflex marginTop={10}>
              <Text caption style={{ textAlign: "center" }} black>
                {loadingText}
              </Text>
            </Block>
          ) : null}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000040",
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF",
    height: 100,
    width: 100,
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Loader;
