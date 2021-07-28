import { createSelector } from "reselect";

export const selectPaymentNoticesCreateFormDataItemEditing = createSelector(
  [(store: any) => store.accounting.paymentNoticesCreateFormDataItemEditing],
  (data: boolean) => data
);
