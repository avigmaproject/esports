import React, { memo } from "react";
import { TouchableOpacity, Image, StyleSheet, ViewStyle } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Icon from "react-native-vector-icons/Feather";

type Props = {
  goBack: () => void;
  style?: ViewStyle;
};

const BackButton = ({ goBack, style }: Props) => (
  <TouchableOpacity onPress={goBack} style={[styles.container, style]}>
    <Icon name="arrow-left" size={30} color="#ffffff" />
  </TouchableOpacity>
);
// console.log(10 + getStatusBarHeight());

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    // top: 10,
    left: 20,
  },
  image: {
    width: 24,
    height: 24,
  },
});

export default memo(BackButton);
