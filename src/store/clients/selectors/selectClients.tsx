import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";
export const selectClients = createSelector(
  [
    (store: RootState) => store.clients.clients,
    (store: RootState) => store.paymentNotice.clientSelectorSearchText,
  ],
  (clients, searchText) =>
    clients
      .reduce((list: any[], item: any) => {
        let hasItem = list.some(
          (itemIt: any) => itemIt.identifier === item.identifier
        );
        if (hasItem) {
          return list;
        }
        return [...list, item];
      }, [])
      .filter(
        (item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.identifier.toLowerCase().includes(searchText.toLowerCase())
      )
);
