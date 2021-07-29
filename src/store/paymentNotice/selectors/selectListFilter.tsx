import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectListFilter = createSelector(
  [(store: RootState) => store.paymentNotice.paymentNoticesListFilter],
  (filter) => filter
);
