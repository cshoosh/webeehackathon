import React from "react";
import { Text } from "@rneui/themed";
import useMachineFilter from "../../libs/customHooks/machineFilter/machineFilter";
import { FlatList, StyleSheet, View } from "react-native";
import MachineItem from "../MachineItem";
import { isBigScreen } from "../../libs/helper";

interface MachineItemContainerListProps {
  type: string;
}

const component: React.FC<MachineItemContainerListProps> = ({ type }) => {
  // Implementing logic
  const filtered = useMachineFilter(type);
  const isBigSize = isBigScreen();
  return (
    <FlatList
      data={filtered}
      key={isBigSize + ""}
      numColumns={isBigSize ? 2 : 1}
      keyExtractor={(item) => item.key}
      renderItem={({ item }) => <MachineItem item={item} />}
      ListEmptyComponent={(props) => (
        <View style={styles.container}>
          <Text h4>No items to show here</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
  },
});

export default component;
