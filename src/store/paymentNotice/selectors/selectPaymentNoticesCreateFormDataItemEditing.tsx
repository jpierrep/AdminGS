import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectPaymentNoticesCreateFormDataItemEditing = createSelector(
  [
    (store: RootState) =>
      store.paymentNotice.paymentNoticesCreateFormDataItemEditing,
  ],
  (data) => data
);
