import { FlatList, View, StyleSheet, Dimensions } from "react-native";
import { Button, Icon } from "@rneui/themed";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reducers";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect } from "react";
import { addCategory } from "../../reducers/machineTypes";
import CategoryItem from "../../components/CategoryItem";

import { KeyboardAwareFlatList } from "react-native-keyboard-aware-scroll-view";
import { isBigScreen } from "../../libs/helper";

export default () => {
  const dispatch = useDispatch();
  const { machineTypes } = useSelector((state: RootState) => ({
    machineTypes: state.machineTypes.machineType,
  }));
  const isBigScreenValue = isBigScreen();
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareFlatList
        numColumns={isBigScreenValue ? 2 : 1}
        style={styles.containerList}
        data={machineTypes}
        key={isBigScreenValue + ""}
        keyExtractor={(item, index) => isBigScreenValue + index}
        renderItem={({ item }) => <CategoryItem item={item} />}
      />
      <Button onPress={() => dispatch(addCategory())}>
        <Icon name="add" color="white" />
        Add New Category
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  containerList: {
    flex: 1,
  },
});
