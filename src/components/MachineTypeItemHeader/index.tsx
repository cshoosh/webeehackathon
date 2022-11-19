import React from "react";
import { Button, Text } from "@rneui/themed";
import { View, StyleSheet } from "react-native";

interface MachineTypeItemHeaderProps {
  type: string;
}

const component: React.FC<MachineTypeItemHeaderProps> = ({ type }) => {
  return (
    <View style={styles.container}>
      <Text h2>{type}</Text>
      <Button title={"Add item"} onPress={() => console.log("Pressed")} />
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
