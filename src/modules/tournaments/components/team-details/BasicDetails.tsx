import React from "react";
import { Image } from "react-native";
import { Divider, Title, TouchableRipple } from "react-native-paper";
import { Block, Button, Text } from "../../../../components";
import { resolveImage } from "../../../../utils";
import * as fromModels from "../../models";

type Props = {
  details: fromModels.Team;
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
              <Image
                source={{ uri: resolveImage(details.divisionLogo) }}
                style={{ width: 24, height: 24 }}
              />
            </Block>
            <Block noflex row marginBottom={5}>
              <Text subtitle primary marginRight={10}>
                MMR:
              </Text>
              <Text subtitle gray>
                {details.mmr}
              </Text>
            </Block>
            <Block noflex row marginBottom={5}>
              <Text subtitle primary marginRight={10}>
                Playing In:
              </Text>
              <Text subtitle gray>
                {details.region}
              </Text>
            </Block>
            <Block noflex row marginBottom={5}>
              <Text subtitle primary marginRight={10}>
                Season:
              </Text>
              <Text subtitle gray>
                Season 2 - 2017
              </Text>
            </Block>
            {details.isRecruiting && (
              <TouchableRipple
                style={{
                  flex: 0,
                  width: 150,
                  borderWidth: 1,
                  borderColor: "#fafafa",
                  paddingVertical: 5,
                  borderRadius: 5,
                }}
                onPress={() => {}}>
                <Text style={{ flex: 0 }} primary center>
                  Recruit Me
                </Text>
              </TouchableRipple>
            )}
          </Block>
        </Block>
      </Block>
      <Divider />
    </React.Fragment>
  );
};

export default BasicDetails;
