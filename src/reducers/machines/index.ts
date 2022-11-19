import { createReducer } from "@reduxjs/toolkit";
import { Attribute } from "../machineTypes";

export interface MachineState {
  machines:
    | []
    | [
        {
          type: string;
          title?: string;
          attr?: {};
        }
      ];
}

const initialState: MachineState = {
  machines: [
    {
      type: "Bulldozer2",
      title: "B Machine",
      attr: { weight: "100" },
    },
  ],
};

const machineReducer = createReducer(initialState, (builder) => {
  builder.addDefaultCase((state, action) => {});
});

export default machineReducer;
