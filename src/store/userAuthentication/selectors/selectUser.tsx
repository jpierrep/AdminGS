import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectUser = createSelector(
  [(store: RootState) => store.userAuthentication.user],
  (user) => user
);
