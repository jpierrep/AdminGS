import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectIsAuthenticated = createSelector(
  [(store: RootState) => store.userAuthentication.user],
  (user) => {
    return !!user;
  }
);
