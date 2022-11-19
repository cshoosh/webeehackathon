import React, { createRef, useCallback, useRef, useState } from "react";
import { Button, Card, Dialog, Text, Icon } from "@rneui/themed";
import LineItem from "../LineItem";
import { useDispatch } from "react-redux";
import {
  addCategoryField,
  addTitleField,
  deleteCategory,
  deleteCategoryField,
  updateCategoryFieldName,
  updateCategoryName,
  updateCategoryTitle,
} from "../../reducers/machineTypes";
import LineItemExtended from "../LineItemExtended";
import { Alert, StyleSheet, View } from "react-native";
import { isBigScreen } from "../../libs/helper";

interface CategoryItemProps {
  item: any;
}

const component: React.FC<CategoryItemProps> = ({ item }) => {
  const dispatch = useDispatch();
  const [dialog, setDialog] = useState(false);
  const toggleDialog = useCallback(() => {
    setDialog(!dialog);
  }, [dialog]);
  const addField = useCallback((fieldType: string) => {
    dispatch(
      addCategoryField({ type: fieldType, key: item.key, field: "New field" })
    );
  }, []);
  const isBigSize = isBigScreen();
  return (
    <Card containerStyle={{ width: isBigSize ? "45%" : undefined }}>
      <Card.Title h4>{item.name}</Card.Title>
      <Card.Divider />
      <LineItem
        dataType={"title"}
        value={item.name}
        label={"Category Name"}
        onChangeAttribute={(v) => {
          dispatch(updateCategoryName({ key: item.key, name: v }));
        }}
      />
      {item.title !== undefined && (
        <LineItem
          dataType={"title"}
          value={item.title}
          label={"Title Field Name"}
          onChangeAttribute={(v) => {
            dispatch(updateCategoryTitle({ title: v, key: item.key }));
          }}
        />
      )}
      {item.attr &&
        item.attr.map((v, index) => (
          <LineItemExtended
            item={item}
            key={index + v}
            dataType={v[1]}
            value={v[0]}
            label={"Field"}
            onDeletePress={() => {
              dispatch(deleteCategoryField({ key: item.key, field: v[0] }));
            }}
            onSubmitEditing={(e) => {
              dispatch(
                updateCategoryFieldName({
                  key: item.key,
                  fieldName: v[0],
                  fieldType: v[1],
                  value: e.nativeEvent.text,
                })
              );
            }}
          />
        ))}

      <View style={styles.actionItemContainer}>
        <Button
          containerStyle={styles.actionItem}
          title={"Add New Field"}
          onPress={() => {
            if (!item.name) {
              Alert.alert(
                "Info",
                "Please enter category name before adding any fields"
              );
              return;
            }
            if (item.title !== undefined) {
              toggleDialog();
            } else {
              dispatch(addTitleField(item.key));
            }
          }}
        />
        <Button
          type="solid"
          containerStyle={[styles.actionItem, styles.actionItemRight]}
          onPress={() => dispatch(deleteCategory(item.key))}
        >
          Remove
          <Icon name="delete" color="white" />
        </Button>
      </View>
      <Dialog isVisible={dialog} onBackdropPress={toggleDialog}>
        <Dialog.Title title="Field type" />
        <Text>Please select field type to add</Text>
        <Dialog.Actions>
          <Dialog.Button
            title="TEXT"
            onPress={() => {
              toggleDialog();
              addField("string");
            }}
          />
          <Dialog.Button
            title="NUMBER"
            onPress={() => {
              toggleDialog();
              addField("number");
            }}
          />
          <Dialog.Button
            title="DATE"
            onPress={() => {
              toggleDialog();
              addField("date");
            }}
          />
          <Dialog.Button
            title="CHECK"
            onPress={() => {
              toggleDialog();
              addField("boolean");
            }}
          />
        </Dialog.Actions>
      </Dialog>
    </Card>
  );
};

export default component;

const styles = StyleSheet.create({
  actionItem: {
    flex: 1,
  },
  actionItemRight: {
    marginLeft: 10,
  },
  actionItemContainer: {
    flexDirection: "row",
  },
});
