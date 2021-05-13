import React, { memo, useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker, { ValueType } from "react-native-dropdown-picker";
import { useTheme } from "react-native-paper";

type Props = {
  value: ValueType;
  items: any[];
  setItems: () => void;
  setValue: (item: ValueType | ValueType[]) => void;
  zIndex?: number;
  zIndexReverse?: number;
  searchable?: boolean;
  placeholder?: string;
};

const Dropdown = ({
  items,
  setItems,
  value,
  setValue,
  zIndex,
  zIndexReverse,
  searchable,
  placeholder,
}: Props) => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setValue={setValue}
      setItems={setItems}
      setOpen={toggleOpen}
      searchable={searchable}
      zIndex={zIndex}
      zIndexInverse={zIndexReverse}
      style={styles.dropdown}
      scrollViewProps={{ nestedScrollEnabled: true, persistentScrollbar: true }}
      placeholder={placeholder}
      searchTextInputStyle={{
        borderRadius: 0,
        height: 40,
        color: theme.colors.text,
      }}
      placeholderStyle={{
        color: theme.colors.text,
      }}
    />
  );
};

export default memo(Dropdown);

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 0,
    backgroundColor: "transparent",
    borderBottomWidth: 2,
    borderBottomColor: "#ffffff",
    paddingHorizontal: 0,
  },
});
