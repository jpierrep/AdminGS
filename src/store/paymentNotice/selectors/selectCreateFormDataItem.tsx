import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectCreateFormDataItem = createSelector(
  [(store: RootState) => store.paymentNotice.paymentNoticesCreateFormDataItem],
  (data) => data
);
