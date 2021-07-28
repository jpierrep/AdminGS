import { createSelector } from "reselect";

export const selectPaymentNoticesCreateFormDataItem = createSelector(
  [(store: any) => store.accounting.paymentNoticesCreateFormDataItem],
  (data) => data
);
