import { combineReducers } from "@reduxjs/toolkit";
import machines, { MachineState } from "./machines";
import machineTypes, { MachineTypeState } from "./machineTypes";

export interface RootState {
  machines: MachineState;
  machineTypes: MachineTypeState;
}

const root = combineReducers({
  machines,
  machineTypes,
});

export default root;
