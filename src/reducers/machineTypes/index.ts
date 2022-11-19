import { createAction, createReducer } from "@reduxjs/toolkit";
import R from "ramda";

export interface Attribute {
  [attr: string]: number | Date | string | boolean;
}

export interface MachineTypeState {
  machineType:
    | []
    | {
        key: number;
        name?: string;
        title?: string;
        attr?: Array<string[]>;
      }[];
}

export const addCategoryField = createAction<{
  key: number;
  field: string;
  type: string;
}>("types/addCategoryField");

export const updateCategoryFieldName = createAction<{
  key: number;
  fieldName: string;
  fieldType: string;
  value: string;
}>("types/categoryFieldNameUpdate");

export const updateCategoryTitle = createAction<{ key: number; title: string }>(
  "types/updateCategoryTitle"
);

export const addCategory = createAction("types/add");

export const updateCategoryName = createAction<{ key: number; name: string }>(
  "types/updateName"
);

export const addTitleField = createAction<number>("types/addTitle");

export const deleteCategory = createAction<number>("types/deleteCategory");

export const deleteCategoryField = createAction<{ key: number; field: string }>(
  "types/deleteCategoryField"
);

const initialState: MachineTypeState = {
  machineType: [],
};

const machineTypeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(deleteCategoryField, (state, action) => {
      const keyIndex = R.findIndex(
        (v) => v.key === action.payload.key,
        state.machineType
      );
      // @ts-ignore
      state.machineType = R.update(
        keyIndex,
        {
          ...state.machineType[keyIndex],
          attr: (state.machineType[keyIndex].attr || []).filter(
            (f) => f[0] !== action.payload.field
          ),
        },
        state.machineType
      );
    })
    .addCase(deleteCategory, (state, action) => {
      state.machineType = state.machineType.filter(
        (v) => v.key !== action.payload
      );
    })
    .addCase(updateCategoryFieldName, (state, action) => {
      const keyIndex = R.findIndex(
        (v) => v.key === action.payload.key,
        state.machineType
      );

      const prevTypeIndex = R.findIndex(
        (v) => v[0] === action.payload.fieldName,
        state.machineType[keyIndex].attr || []
      );

      state.machineType = R.update(
        keyIndex,
        {
          ...state.machineType[keyIndex],
          attr: R.update(
            prevTypeIndex,
            [action.payload.value, action.payload.fieldType],
            state.machineType[keyIndex].attr || []
          ),
        },
        state.machineType
      );
    })
    .addCase(addCategoryField, (state, action) => {
      const keyIndex = R.findIndex(
        (v) => v.key === action.payload.key,
        state.machineType
      );
      state.machineType = R.update(
        keyIndex,
        {
          ...state.machineType[keyIndex],
          attr: R.append(
            [
              action.payload.field +
                " " +
                ((state.machineType[keyIndex].attr || []).length + 1),
              action.payload.type,
            ],
            state.machineType[keyIndex].attr || []
          ),
        },
        state.machineType
      );
    })
    .addCase(updateCategoryTitle, (state, action) => {
      const keyIndex = R.findIndex(
        (v) => v.key === action.payload.key,
        state.machineType
      );
      state.machineType = R.update(
        keyIndex,
        {
          ...state.machineType[keyIndex],
          title: action.payload.title,
        },
        state.machineType
      );
    })
    .addCase(addTitleField, (state, action) => {
      const keyIndex = R.findIndex(
        (v) => v.key === action.payload,
        state.machineType
      );
      state.machineType = R.update(
        keyIndex,
        {
          ...state.machineType[keyIndex],
          title: "",
        },
        state.machineType
      );
    })
    .addCase(updateCategoryName, (state, action) => {
      const keyIndex = R.findIndex(
        (v) => v.key === action.payload.key,
        state.machineType
      );
      state.machineType = R.update(
        keyIndex,
        {
          ...state.machineType[keyIndex],
          name: action.payload.name,
        },
        state.machineType
      );
    })
    .addCase(addCategory, (state, action) => {
      const key = R.compose(
        R.add(1),
        R.propOr(0, "key"),
        R.last
      )(state.machineType);
      state.machineType = R.append(
        {
          key,
        },
        state.machineType
      );
    });
});

export default machineTypeReducer;
