import { combineReducers } from "@reduxjs/toolkit";
import accounting from "./accounting";
import userAuthentication from "./userAuthentication";
import clients from "./clients";
const rootReducer = combineReducers({
  accounting,
  userAuthentication,
  clients,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
