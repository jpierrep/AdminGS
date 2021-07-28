import { createSelector } from "reselect";

export const selectSegmentSelected = createSelector(
  [(store: any) => store.accounting.paymentNoticesListFilter?.segmentSelected],
  (segmentSelected) => segmentSelected
);
