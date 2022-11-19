import React, { useState } from "react";
import { Button, CheckBox, Input } from "@rneui/themed";
import DatePicker from "react-native-date-picker";
import { Attribute } from "../../reducers/machineTypes";

interface LineItemProps {
  dataType: string;
  value: any;
  label: string;
  onChangeAttribute: (value: Attribute) => void;
}

const LineItemComponent: React.FC<LineItemProps> = ({
  dataType,
  value,
  label,
  onChangeAttribute,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const labelInternal = label.charAt(0).toUpperCase() + label.slice(1);
  const [open, setOpen] = useState(false);

  switch (dataType) {
    case "title":
      return (
        <Input
          onChangeText={(text) => {
            setInternalValue(text);
            onChangeAttribute?.(text);
          }}
          textAlign={"left"}
          value={internalValue}
          label={labelInternal}
        />
      );
    case "string":
      return (
        <Input
          onChangeText={(text) => {
            setInternalValue(text);
            onChangeAttribute?.(text);
          }}
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
          onPress={() => {
            setInternalValue(!internalValue);
            onChangeAttribute?.(!internalValue);
          }}
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
              onChangeAttribute?.(date);
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
          onChangeText={(text) => {
            setInternalValue(text);
            onChangeAttribute?.(text);
          }}
          textAlign={"left"}
          value={internalValue}
          label={labelInternal}
        />
      );
    default:
      return null;
  }
};

export default LineItemComponent;
