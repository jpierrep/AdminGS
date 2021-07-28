import { createSelector } from "reselect";
import { RootState } from "../../rootReducer";

export const selectPaymentNoticesGroupedByDateCreateForm = createSelector(
  [(store: RootState) => store.accounting.paymentNoticesCreateFormData.items],
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
