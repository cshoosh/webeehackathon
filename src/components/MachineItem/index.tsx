import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Button, Card, CheckBox, Icon, Input } from "@rneui/themed";
import DatePicker from "react-native-date-picker";

interface MachineItemProps {
  item: any;
}

interface LineItemProps {
  dataType: string;
  value: any;
  label: string;
}

const LineItem: React.FC<LineItemProps> = ({ dataType, value, label }) => {
  const [internalValue, setInternalValue] = useState(value);
  const labelInternal = label.charAt(0).toUpperCase() + label.slice(1);
  const [open, setOpen] = useState(false);

  switch (dataType) {
    case "string":
      return (
        <Input
          onChangeText={setInternalValue}
          textAlign={"left"}
          value={internalValue}
          label={labelInternal}
        />
      );
    case "boolean":
      return (
        <CheckBox
          title={labelInternal}
          checked={internalValue}
          onPress={() => setInternalValue(!internalValue)}
        />
      );
    case "date":
      return (
        <>
          <Button
            title={`${labelInternal}: ${internalValue || new Date()}`}
            onPress={() => setOpen(true)}
          />
          <DatePicker
            modal
            mode={"date"}
            open={open}
            date={internalValue || new Date()}
            onConfirm={(date) => {
              setOpen(false);
              setInternalValue(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </>
      );

    case "number":
      return (
        <Input
          keyboardType={"number-pad"}
          onChangeText={setInternalValue}
          textAlign={"left"}
          value={internalValue}
          label={labelInternal}
        />
      );
    default:
      return null;
  }
};

const component: React.FC<MachineItemProps> = ({ item }) => {
  return (
    <Card>
      <Card.Title>{item.name}</Card.Title>
      <Card.Divider />
      {Object.keys(item.attr).map((v: any) => (
        <LineItem
          key={v}
          label={v}
          dataType={item.attr[v].type}
          value={item.attr[v].value}
        />
      ))}
      <Button size={"sm"} style={styles.buttonContainer}>
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
