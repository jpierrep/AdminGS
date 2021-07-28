import { createSelector } from "reselect";

export const selectPaymentNoticesCreateFulfilled = createSelector(
  [(store: any) => store.accounting.paymentNoticesCreateFulfilled],
  (paymentNoticesCreateFulfilled) => paymentNoticesCreateFulfilled
);
