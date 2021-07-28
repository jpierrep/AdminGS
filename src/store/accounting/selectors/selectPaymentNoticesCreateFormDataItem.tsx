import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectPaymentNoticesCreateFormDataItem = createSelector(
  [(store: RootState) => store.accounting.paymentNoticesCreateFormDataItem],
  (data) => data
);
