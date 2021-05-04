import React, { ReactNode } from "react";
import { Dimensions } from "react-native";
import { IconButton } from "react-native-paper";
import { Block } from "../../../components";

type Props = {
  goBack: () => void;
  title?: ReactNode;
};

const { width } = Dimensions.get("window");
const titleMarginLeft = (width - 150) / 6;

const Header = ({ goBack, title }: Props) => {
  return (
    <Block noflex row center>
      <IconButton
        icon="arrow-left"
        size={30}
        color="#ffffff"
        onPress={goBack}
        style={{ flex: 0 }}
      />
      <Block marginLeft={titleMarginLeft}>{title}</Block>
    </Block>
  );
};

export default Header;
