import React, { useState } from "react";
import LineItem from "../LineItem";
import { StyleSheet } from "react-native";
import { Button, Card, CheckBox, Icon, Input } from "@rneui/themed";
import DatePicker from "react-native-date-picker";
import { useDispatch } from "react-redux";
import { deleteItem, updateField, updateTitle } from "../../reducers/machines";
import { isBigScreen } from "../../libs/helper";

interface MachineItemProps {
  item: any;
}

const component: React.FC<MachineItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const isBigSize = isBigScreen();
  return (
    <Card containerStyle={{ width: isBigSize ? "45%" : undefined }}>
      <Card.Title>{item.name}</Card.Title>
      <Card.Divider />
      <LineItem
        label={item.titleField}
        dataType={"title"}
        value={item.name}
        onChangeAttribute={(v: string) => {
          dispatch(updateTitle({ key: item.key, title: v }));
        }}
      />
      {Object.keys(item.attr || {}).map((v: any) => (
        <LineItem
          key={v}
          label={v}
          dataType={item.attr[v]?.type}
          value={item.attr[v]?.value}
          onChangeAttribute={(changed) => {
            dispatch(updateField({ key: item.key, field: v, value: changed }));
          }}
        />
      ))}
      <Button
        size={"sm"}
        style={styles.buttonContainer}
        onPress={() => {
          dispatch(deleteItem(item.key));
        }}
      >
        <Icon name="delete" color="white" />
        Remove
      </Button>
    </Card>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignSelf: "flex-start",
  },
});

export default component;
