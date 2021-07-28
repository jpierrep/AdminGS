import { createSelector } from "reselect";

export const selectClients = createSelector(
  [(store: any) => store.clients.clients],
  (clients) => clients
);
