import React from "react";
import { Image } from "react-native";

type Props = {
  name: string;
  focused?: boolean;
};

const TabBarIcon = ({ name, focused }: Props) => {
  let image = `../assets/tab-bar/inactive/${name}.png`;
  if (focused) {
    image = `../../assets/tab-bar/active/${name}.png`;
  }
  console.log({ image });

  // return <Image source={require(image)} style={{ width: 24, height: 24 }} />;
};

export default TabBarIcon;
