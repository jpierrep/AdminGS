import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectLogoutStatus = createSelector(
  [(store: RootState) => store.userAuthentication.logoutStatus],
  (logoutStatus) => logoutStatus
);
