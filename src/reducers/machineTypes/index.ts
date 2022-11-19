import { createReducer } from "@reduxjs/toolkit";

export interface Attribute {
  [attr: string]: number | Date | string | boolean;
}

export interface MachineTypeState {
  machineType:
    | []
    | [
        {
          name: string;
          attr?: {};
        }
      ];
}

const initialState: MachineTypeState = {
  machineType: [
    {
      name: "Bulldozer2",
      attr: {
        weight: "number",
        model: "string",
        available: "boolean",
        date: "date",
      },
    },
  ],
};

const machineTypeReducer = createReducer(initialState, (builder) => {});

export default machineTypeReducer;
