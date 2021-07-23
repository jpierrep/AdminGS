import { combineReducers } from "@reduxjs/toolkit";
import accounting from "./accounting/accounting.reducer";
import userAuthentication from "./userAuthentication/userAuthentication.reducer";
import clients from "./clients/clients.reducer";
const rootReducer = combineReducers({
  accounting,
  userAuthentication,
  clients,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
