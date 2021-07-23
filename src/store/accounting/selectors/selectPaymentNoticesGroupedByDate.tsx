import { createSelector } from "reselect";

export const selectPaymentNoticesGroupedByDate = createSelector(
  [(store: any) => store.accounting.paymentNotices],
  (list) =>
    list.reduce((list: any, item: any) => {
      let dateExists = list.find(
        (listItem: any) => listItem.dateLabel === item.payedAtLegible
      );
      if (dateExists) {
        dateExists.items.push(item);
      } else {
        list.push({
          dateLabel: item.payedAtLegible,
          items: [item],
        });
      }
      return list;
    }, [])
);
