import React from "react";
import { Button, Text } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { addItem } from "../../reducers/machines";

interface MachineTypeItemHeaderProps {
  type: string;
}

const component: React.FC<MachineTypeItemHeaderProps> = ({ type }) => {
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text h2>{type}</Text>
      <Button title={"Add item"} onPress={() => dispatch(addItem(type))} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
});

export default component;
