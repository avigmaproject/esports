import React, { memo, useState } from "react";
import { StyleSheet } from "react-native";
import DropDownPicker, {
  ValueType,
  DropDownPickerProps,
} from "react-native-dropdown-picker";

type Props = {
  value: ValueType;
  items: any[];
  setItems: () => void;
  setValue: (item: ValueType | ValueType[]) => void;
  zIndex?: number;
  zIndexReverse?: number;
  searchable?: boolean;
};

const Dropdown = ({
  items,
  setItems,
  value,
  setValue,
  zIndex,
  zIndexReverse,
  searchable,
}: Props) => {
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
