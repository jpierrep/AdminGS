import { createSelector } from "reselect";
import { PaymentNotice } from "../../../@types/paymentNotice";

export const selectPaymentNoticesCreateFormDataItem = createSelector(
  [(store: any) => store.accounting.paymentNoticesCreateFormDataItem],
  (data: PaymentNotice) => data
);
