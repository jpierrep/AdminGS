import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";
export const selectClients = createSelector(
  [(store: RootState) => store.clients.clients],
  (clients) => clients
);
