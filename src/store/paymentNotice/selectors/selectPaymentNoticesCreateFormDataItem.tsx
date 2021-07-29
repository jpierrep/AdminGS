import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectPaymentNoticesCreateFormDataItem = createSelector(
  [(store: RootState) => store.paymentNotice.paymentNoticesCreateFormDataItem],
  (data) => data
);
