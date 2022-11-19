import { createReducer } from "@reduxjs/toolkit";

export interface MachineTypeState {
  machineType:
    | []
    | [
        {
          title: string;
          name: string;
          attr?: {} | { [attr: string]: number | Date | string | boolean };
        }
      ];
}

const initialState: MachineTypeState = {
  machineType: [
    {
      name: "Bulldozer",
      title: "Bulldozer Title",
    },
  ],
};

const machineTypeReducer = createReducer(initialState, (builder) => {});

export default machineTypeReducer;
