import { createSelector } from "reselect";

export const selectPaymentNoticesGroupedByDateLatest = createSelector(
  [(store: any) => store.accounting.paymentNotices],
  (list) => list.slice(0, 5)
);
