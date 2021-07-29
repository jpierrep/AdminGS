import { combineReducers } from "@reduxjs/toolkit";
import paymentNotice from "./paymentNotice/paymentNotice.reducer";
import userAuthentication from "./userAuthentication/userAuthentication.reducer";
import clients from "./clients/clients.reducer";
const rootReducer = combineReducers({
  paymentNotice,
  userAuthentication,
  clients,
});
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
