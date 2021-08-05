import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectShowData = createSelector(
  [
    (store: RootState) => store.paymentNotice.paymentNoticeShowed,
    (store: RootState) => store.clients.clients,
  ],
  (paymentNoticeShowed, clients) => {
    let client = clients.find(
      (clientItem) =>
        clientItem.identifier === paymentNoticeShowed.clientIdentifier
    );
    return { ...paymentNoticeShowed, client };
  }
);
