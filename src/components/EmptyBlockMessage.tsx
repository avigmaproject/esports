import React from "react";
import Block from "./Block";
import Text from "./Text";

type Props = {
  message: string;
};

const EmptyBlockMessage = ({ message }: Props) => {
  return (
    <Block noflex center>
      <Text white>{message}</Text>
    </Block>
  );
};

export default EmptyBlockMessage;
