import { createSelector } from "reselect";

export const selectIsAuthenticated = createSelector(
  [(store: any) => store.userAuthentication.user],
  (user) => {
    console.log(user);
    return !!user
  }
);
