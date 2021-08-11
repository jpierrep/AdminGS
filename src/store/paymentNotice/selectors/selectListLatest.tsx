import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectListLatest = createSelector(
  [
    (store: RootState) => store.paymentNotice.paymentNotices,
    (store: RootState) => store.clients.clients,
  ],
  (list, clients) =>
    list.slice(0, 5).map((item) => {
      let client = clients.find(
        (clientItem) => clientItem.identifier === item.clientIdentifier
      );
      return { ...item, client };
    })
);
