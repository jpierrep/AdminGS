import { createSelector } from "reselect";
import { Client } from "../../../@types/client";
export const selectClients = createSelector(
  [(store: any) => store.clients.clients],
  (clients: Client[]) => clients
);
