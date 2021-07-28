import React from "react";
import { useSelector } from "react-redux";
import { IonItemDivider, IonItemGroup, IonLabel, IonList } from "@ionic/react";
// Components
import PaymentNoticeListItem from "./PaymentNoticeListItem";
// Selectors
import { selectPaymentNoticesGroupedByDate } from "../../../store/accounting/selectors/selectPaymentNoticesGroupedByDate";
// Types
import { PaymentInvoice } from "../../../@types/paymentInvoice";

const PaymentNoticeListByDate: React.FC = () => {
  const paymentNoticesGroupedByDate = useSelector(
    selectPaymentNoticesGroupedByDate
  );

  return (
    <IonList>
      {paymentNoticesGroupedByDate.length === 0 && (
        <p className="ion-text-center">No se han encontrado resultados</p>
      )}
      {paymentNoticesGroupedByDate.map(
        (dateItem: { dateLabel: string; items: PaymentInvoice[] }) => {
          return (
            <IonItemGroup key={dateItem.dateLabel}>
              <IonItemDivider color="light">
                <IonLabel>{dateItem.dateLabel}</IonLabel>
              </IonItemDivider>
              {dateItem.items.map((paymentNotice: PaymentInvoice) => (
                <PaymentNoticeListItem
                  paymentNotice={paymentNotice}
                  key={paymentNotice.id}
                />
              ))}
            </IonItemGroup>
          );
        }
      )}
    </IonList>
  );
};

export default PaymentNoticeListByDate;
