import { createSelector } from "reselect";

export const selectPaymentNoticeShowed = createSelector(
  [(store: any) => store.accounting.paymentNoticeShowed],
  (paymentNoticeShowed) => paymentNoticeShowed
);
