import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectClientSelectorSearchText = createSelector(
  [(store: RootState) => store.paymentNotice.clientSelectorSearchText],
  (clientSelectorSearchText) => clientSelectorSearchText
);
