import { createSelector } from "reselect";

export const isAuthenticated = createSelector(
  [(store: any) => store.userAuthentication.user],
  ({ user }) => !!user
);
