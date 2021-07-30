import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectFindStatus = createSelector(
  [(store: RootState) => store.paymentNotice.findStatus],
  (findStatus) => findStatus
);
