import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";
import { Client } from "../../../@types/client";
export const selectClients = createSelector(
  [(store: RootState) => store.clients.clients],
  (clients) =>
    clients.reduce((list: any[], item: any) => {
      let hasItem = list.some(
        (itemIt: any) => itemIt.identifier === item.identifier
      );
      if (hasItem) {
        return list;
      }
      return [...list, item];
    }, []) as Client[]
);
