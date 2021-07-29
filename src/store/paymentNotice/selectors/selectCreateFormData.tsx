import { createSelector } from "reselect";
import { PaymentNotice } from "../../../@types/paymentNotice";
import { RootState } from "../../rootReducer";

export const selectCreateFormData = createSelector(
  [(store: RootState) => store.paymentNotice.paymentNoticesCreateFormData],
  (formData) =>
    ({
      ...formData,
      items: formData.items.reduce((list: any, item) => {
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
      }, []),
    } as { items: { dateLabel: string; items: PaymentNotice[] }[] })
);
