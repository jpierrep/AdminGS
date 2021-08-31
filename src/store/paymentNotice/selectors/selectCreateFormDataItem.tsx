import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectCreateFormDataItem = createSelector(
  [(store: RootState) => store.paymentNotice.paymentNoticesCreateFormDataItem],
  (data) => ({
    ...data,
    invoiceTotalAmount: (data.client?.invoices || []).reduce(
      (total: number, item: any) =>
        total + (item.payedAmountAtCurrentPaymentNotice || 0),
      0
    ),
  })
);
