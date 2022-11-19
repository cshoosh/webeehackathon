import { combineReducers } from "@reduxjs/toolkit";
import machines from "./machines";

const root = combineReducers({
  machines,
});

export default root;
