import { createSelector } from "reselect";
import { PaymentNotice } from "../../../@types/paymentNotice";

type Item = {
  dateLabel: string;
  items: PaymentNotice[];
};
export const selectPaymentNoticesGroupedByDate = createSelector(
  [(store: any) => store.accounting.paymentNotices],
  (list: PaymentNotice[]) =>
    list.reduce((list: any[], item) => {
      let dateExists = list.find(
        (listItem: Item) => listItem.dateLabel === item.payedAtLegible
      );
      if (dateExists) {
        dateExists.items.push(item);
      } else {
        const itemAdded: Item = {
          dateLabel: item.payedAtLegible || "",
          items: [item],
        };
        list.push(itemAdded);
      }
      return list;
    }, [])
);
