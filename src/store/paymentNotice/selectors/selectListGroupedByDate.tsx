import { createSelector } from "reselect";
import { PaymentNotice } from "../../../@types/paymentNotice";
import { RootState } from "../../rootReducer";

export const selectListGroupedByDate = createSelector(
  [
    (store: RootState) => store.paymentNotice.paymentNotices,
    (store: RootState) => store.clients.clients,
  ],
  (list, clients) =>
    list.reduce((list: any[], item) => {
      let dateExists = list.find(
        (listItem) => listItem.dateLabel === item.payedAtLegible
      );
      let client = clients.find(
        (clientItem) => clientItem.identifier === item.clientIdentifier
      );
      if (dateExists) {
        dateExists.items.push({
          ...item,
          client,
        });
      } else {
        const itemAdded = {
          dateLabel: item.payedAtLegible || "",
          items: [{ ...item, client }],
        };
        list.push(itemAdded);
      }
      return list;
    }, []) as { dateLabel: string; items: PaymentNotice[] }[]
);
