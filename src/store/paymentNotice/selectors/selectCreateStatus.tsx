import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectCreateStatus = createSelector(
  [(store: RootState) => store.paymentNotice.createStatus],
  (createStatus) => createStatus
);
