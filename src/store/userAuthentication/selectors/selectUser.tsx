import { createSelector } from "reselect";
import { User } from "../../../@types/user";

export const selectUser = createSelector(
  [(store: any) => store.userAuthentication.user],
  (user: User) => user
);
