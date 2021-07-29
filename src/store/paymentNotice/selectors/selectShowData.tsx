import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectShowData = createSelector(
  [(store: RootState) => store.paymentNotice.paymentNoticeShowed],
  (paymentNoticeShowed) => paymentNoticeShowed
);
