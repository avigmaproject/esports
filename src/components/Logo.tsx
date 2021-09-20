import React, { memo } from "react";
import { Image, StyleSheet } from "react-native";

const Logo = () => (
  <Image
    source={require("../assets/logo.png")}
    style={styles.image}
    resizeMode="contain"
  />
);

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 100,
    marginBottom: 10,
    // backgroundColor: "red",
  },
});

export default memo(Logo);
