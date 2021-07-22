import React from "react";
import { SafeAreaView, ScrollView, Image } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import { Block } from "../../../components";

import { SponsorContents } from "../../../core/constants";
import { openUrl } from "../../../utils";

const OurSponsors = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <Block margin={10}>
          {SponsorContents.map(sponsor => (
            <Card
              key={sponsor.id}
              onPress={() => openUrl(sponsor.url)}
              style={{
                marginBottom: 10,
              }}>
              <Card.Content>
                <Block marginBottom={5} center middle white>
                  <Image
                    source={{ uri: sponsor.image }}
                    style={{
                      width: 300,
                      height: 100,
                      resizeMode: "contain",
                    }}
                  />
                </Block>
                <Paragraph>{sponsor.content}</Paragraph>
              </Card.Content>
            </Card>
          ))}
        </Block>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OurSponsors;
