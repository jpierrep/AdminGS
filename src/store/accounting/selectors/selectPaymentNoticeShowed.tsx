import { createSelector } from "reselect";
import { PaymentNotice } from "../../../@types/paymentNotice";

export const selectPaymentNoticeShowed = createSelector(
  [(store: any) => store.accounting.paymentNoticeShowed],
  (paymentNoticeShowed: PaymentNotice) => paymentNoticeShowed
);
