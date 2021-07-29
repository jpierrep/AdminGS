import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectPaymentNoticesCreateFulfilled = createSelector(
  [(store: RootState) => store.paymentNotice.paymentNoticesCreateFulfilled],
  (paymentNoticesCreateFulfilled) => paymentNoticesCreateFulfilled
);
