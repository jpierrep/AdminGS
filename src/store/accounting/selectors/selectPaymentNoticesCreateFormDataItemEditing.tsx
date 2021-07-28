import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectPaymentNoticesCreateFormDataItemEditing = createSelector(
  [
    (store: RootState) =>
      store.accounting.paymentNoticesCreateFormDataItemEditing,
  ],
  (data) => data
);
