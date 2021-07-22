import React from "react";
import { SafeAreaView } from "react-native";
import { Divider, HelperText, List } from "react-native-paper";

import { FAQContents } from "../../../core/constants";

const FAQs = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <List.AccordionGroup>
        {FAQContents.map(faq => (
          <React.Fragment>
            <List.Accordion
              key={`faq-item-${faq.id}`}
              title={faq.title}
              titleNumberOfLines={2}
              id={faq.id.toString()}>
              <HelperText type="info" visible={true}>
                {faq.content}
              </HelperText>
            </List.Accordion>
            <Divider />
          </React.Fragment>
        ))}
      </List.AccordionGroup>
    </SafeAreaView>
  );
};

export default FAQs;
