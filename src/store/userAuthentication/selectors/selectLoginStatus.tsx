import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectLoginStatus = createSelector(
  [(store: RootState) => store.userAuthentication.loginStatus],
  (loginStatus) => loginStatus
);
