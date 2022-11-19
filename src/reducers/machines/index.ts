import { createReducer } from "@reduxjs/toolkit";

interface MachineState {
  dummy: string;
}

const initialState: MachineState = {
  dummy: "Default",
};

const machineReducer = createReducer(initialState, (builder) => {
  builder.addDefaultCase((state, action) => {});
});

export default machineReducer;
