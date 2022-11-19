import React, { useState } from "react";
import { Button, CheckBox, Icon, Input, InputProps } from "@rneui/themed";
import DatePicker from "react-native-date-picker";
import { Attribute } from "../../reducers/machineTypes";
import { StyleSheet } from "react-native";
import moment from "moment";

export interface LineItemProps {
  dataType: string;
  value: any;
  label: string;
  onChangeAttribute: (value: any) => void;
  style?: any;
}

const LineItemComponent: React.FC<LineItemProps> = ({
  dataType,
  value,
  label = "",
  onChangeAttribute,
  style,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(
    dataType === "date" ? (value ? new Date(value) : new Date()) : value
  );
  const labelInternal = label.charAt(0).toUpperCase() + label.slice(1);
  const [open, setOpen] = useState(false);

  switch (dataType) {
    case "title":
    case "string":
      return (
        <Input
          containerStyle={styles.inputContainer}
          style={style}
          onChangeText={(text) => {
            setInternalValue(text);
            onChangeAttribute?.(text);
          }}
          textAlign={"left"}
          value={internalValue}
          label={labelInternal}
          onBlur={() => {
            setInternalValue(value);
          }}
          {...props}
        />
      );
    case "boolean":
      return (
        <CheckBox
          style={style}
          title={labelInternal}
          checked={internalValue}
          onPress={() => {
            setInternalValue(!internalValue);
            onChangeAttribute?.(!internalValue);
          }}
          {...props}
        />
      );
    case "date":
      return (
        <>
          <Button
            containerStyle={[styles.inputContainer, styles.dateContainer]}
            style={style}
            onPress={() => setOpen(true)}
            {...props}
          >
            <Icon name={"event"} color={"white"} />
            {` ${labelInternal}: ${moment(internalValue).format("MM/DD/YYYY")}`}
          </Button>
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
          containerStyle={styles.inputContainer}
          style={style}
          keyboardType={"number-pad"}
          onChangeText={(text) => {
            setInternalValue(text);
            onChangeAttribute?.(text);
          }}
          textAlign={"left"}
          value={internalValue}
          label={labelInternal}
          {...props}
        />
      );
    default:
      return null;
  }
};

export default LineItemComponent;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
  },
  dateContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
});
