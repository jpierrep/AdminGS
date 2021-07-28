import { createSelector } from "reselect";

export const selectUser = createSelector(
  [(store: any) => store.userAuthentication.user],
  (user) => user
);
