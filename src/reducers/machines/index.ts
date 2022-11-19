import { createAction, createReducer } from "@reduxjs/toolkit";
import { Attribute } from "../machineTypes";
import R from "ramda";

export interface MachineState {
  machines:
    | []
    | {
        key: number;
        type: string;
        title?: string;
        attr?: any;
      }[];
}

export const updateField = createAction<{
  key: number;
  value: any;
  field: string;
}>("machines/update");

export const updateTitle = createAction<{ key: number; title: string }>(
  "machines/title/update"
);

export const deleteItem = createAction<number>("machines/delete");

export const addItem = createAction<string>("machines/add");

const initialState: MachineState = {
  machines: [],
};

const machineReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteItem, (state, action) => {
      const keyIndex = R.findIndex(
        (v) => v.key === action.payload,
        state.machines
      );
      state.machines = R.remove(keyIndex, 1, state.machines);
    })
    .addCase(updateField, (state, action) => {
      const keyIndex = R.findIndex(
        (v) => v.key === action.payload.key,
        state.machines
      );
      state.machines = R.assoc(
        keyIndex,
        {
          ...state.machines[keyIndex],
          attr: R.assoc(
            action.payload.field,
            action.payload.value,
            state.machines[keyIndex].attr
          ),
        },
        state.machines
      );
    })
    .addCase(updateTitle, (state, action) => {
      const keyIndex = R.findIndex(
        (v) => v.key === action.payload.key,
        state.machines
      );
      state.machines = R.assoc(
        keyIndex,
        { ...state.machines[keyIndex], title: action.payload.title },
        state.machines
      );
    })
    .addCase(addItem, (state, action) => {
      state.machines = R.append(
        {
          type: action.payload,
          key: R.compose(R.add(1), R.propOr(0, "key"), R.last)(state.machines),
        },
        state.machines
      );
    });
});

export default machineReducer;
