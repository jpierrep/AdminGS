import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectPaymentNoticesGroupedByDateLatest = createSelector(
  [(store: RootState) => store.accounting.paymentNotices],
  (list) => list.slice(0, 5)
);
