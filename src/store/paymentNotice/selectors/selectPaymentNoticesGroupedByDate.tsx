import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectPaymentNoticesGroupedByDate = createSelector(
  [(store: RootState) => store.paymentNotice.paymentNotices],
  (list) =>
    list.reduce((list: any[], item) => {
      let dateExists = list.find(
        (listItem) => listItem.dateLabel === item.payedAtLegible
      );
      if (dateExists) {
        dateExists.items.push(item);
      } else {
        const itemAdded = {
          dateLabel: item.payedAtLegible || "",
          items: [item],
        };
        list.push(itemAdded);
      }
      return list;
    }, [])
);
