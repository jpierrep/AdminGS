import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectCreateFormDataItemEditing = createSelector(
  [
    (store: RootState) =>
      store.paymentNotice.paymentNoticesCreateFormDataItemEditing,
  ],
  (data) => data
);
