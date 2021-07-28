import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectSegmentSelected = createSelector(
  [
    (store: RootState) =>
      store.accounting.paymentNoticesListFilter?.segmentSelected,
  ],
  (segmentSelected) => segmentSelected
);
