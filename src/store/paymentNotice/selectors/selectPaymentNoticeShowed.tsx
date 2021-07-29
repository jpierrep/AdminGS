import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectPaymentNoticeShowed = createSelector(
  [(store: RootState) => store.paymentNotice.paymentNoticeShowed],
  (paymentNoticeShowed) => paymentNoticeShowed
);
