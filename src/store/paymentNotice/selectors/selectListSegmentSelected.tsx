import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectListSegmentSelected = createSelector(
  [
    (store: RootState) =>
      store.paymentNotice.paymentNoticesListFilter?.listSegmentSelected,
  ],
  (listSegmentSelected) => listSegmentSelected
);
