import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectParseFileStatus = createSelector(
  [(store: RootState) => store.paymentNotice.parseFileStatus],
  (parseFileStatus) => parseFileStatus
);
