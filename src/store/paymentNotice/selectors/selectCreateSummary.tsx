import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectCreateSummary = createSelector(
  [(store: RootState) => store.paymentNotice.paymentNoticesCreateFormData],
  (formData) => ({
    identifiedAmount: formData.items
      .filter(({ client }: any) => client)
      .reduce((total: any, { amount }: any) => total + amount, 0),
    identifiedQuantity: formData.items.filter(({ client }: any) => client)
      .length,
    unidentifiedAmount: formData.items
      .filter(({ client }: any) => !client)
      .reduce((total: any, { amount }: any) => total + amount, 0),
    unidentifiedQuantity: formData.items.filter(({ client }: any) => !client)
      .length,
    totalAmount: formData.items.reduce(
      (total: any, { amount }: any) => total + amount,
      0
    ),
    totalQuantity: formData.items.length,
  })
);
