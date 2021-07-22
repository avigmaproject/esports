import React from "react";
import { Image } from "react-native";
import { Divider } from "react-native-paper";
import { Block, Text } from "../../../../components";
import { resolveImage } from "../../../../utils";
import * as fromModels from "../../models";

type Props = {
  details: fromModels.Player;
};

const BasicDetails = ({ details }: Props) => {
  return (
    <React.Fragment>
      <Block noflex margin={10}>
        <Block noflex row>
          <Block noflex marginRight={20}>
            <Image
              source={{ uri: resolveImage(details.logo) }}
              style={{ width: 100, height: 100 }}
            />
          </Block>
          <Block>
            <Block noflex row middle space="between" marginBottom={5}>
              <Text title primary>
                {details.name}
              </Text>
            </Block>
            <Block noflex row marginBottom={5}>
              <Text subtitle primary marginRight={10}>
                Country:
              </Text>
              <Text subtitle gray>
                {details.country}
              </Text>
            </Block>
            <Block noflex row marginBottom={5}>
              <Text subtitle primary marginRight={10}>
                Nationality:
              </Text>
              <Text subtitle gray>
                {details.nationality}
              </Text>
            </Block>
            <Block noflex row marginBottom={5}>
              <Text subtitle primary marginRight={10}>
                Role:
              </Text>
              <Text subtitle gray>
                {details.role}
              </Text>
            </Block>
          </Block>
        </Block>
      </Block>
      <Divider />
    </React.Fragment>
  );
};

export default BasicDetails;
