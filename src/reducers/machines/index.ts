import { createReducer } from "@reduxjs/toolkit";

interface MachineState {}

const initialState: MachineState = {};

const machineReducer = createReducer(initialState, (builder) => {
  builder.addDefaultCase((state, action) => {});
});

export default machineReducer;
