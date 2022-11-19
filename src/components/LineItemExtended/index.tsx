import React from "react";
import { StyleSheet, View } from "react-native";
import LineItem, { LineItemProps } from "../LineItem";
import { Button, Icon } from "@rneui/themed";
import { useDispatch } from "react-redux";
import { deleteCategoryField } from "../../reducers/machineTypes";

interface LineItemExtendedProps extends LineItemProps {
  item: any;
  onDeletePress: () => void;
  onFieldTypePress?: () => void;
}

const LineItemExtendedComponent: React.FC<LineItemExtendedProps> = ({
  dataType,
  onDeletePress,
  onFieldTypePress,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <LineItem {...props} dataType={"string"} />
      <Button title={dataType.toUpperCase()} onPress={onFieldTypePress} />
      <Icon name={"delete"} onPress={onDeletePress} />
    </View>
  );
};

export default LineItemExtendedComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
});
