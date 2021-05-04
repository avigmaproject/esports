import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import Block from "./Block";
import Text from "./Text";
import { TouchableRipple, useTheme } from "react-native-paper";
import FeatherIcon from "react-native-vector-icons/Feather";

type Props = BottomTabBarProps;

function TabBar({ state, descriptors, navigation }: Props) {
  const theme = useTheme();
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <Block
      row
      noflex
      color={theme.colors.background}
      style={{ borderTopWidth: 1, borderTopColor: "#ffffff" }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const tabBarIcon = options.tabBarIcon;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableRipple
            key={`tab-bar-route-${index}`}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              paddingHorizontal: 20,
              paddingVertical: 10,
              marginBottom: 10,
            }}>
            <Block noflex center>
              <FeatherIcon
                name="home"
                color={isFocused ? "orange" : "#fff"}
                size={20}
              />

              <Text
                marginTop={5}
                center
                size={12}
                color={isFocused ? "orange" : "#fff"}>
                {label}
              </Text>
            </Block>
          </TouchableRipple>
        );
      })}
    </Block>
  );
}

export default TabBar;
