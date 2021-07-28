import { IonItemDivider, IonItemGroup, IonLabel, IonList } from "@ionic/react";
import React from "react";
// Types
import { PaymentNotice } from "../../../@types/paymentNotice";
// Components
import PaymentNoticeListItem from "./PaymentNoticeListItem";

const PaymentNoticeListByDate: React.FC<{
  paymentNoticesGroupedByDate: { dateLabel: string; items: PaymentNotice[] }[];
}> = ({ paymentNoticesGroupedByDate }) => {
  return (
    <>
      {paymentNoticesGroupedByDate.length === 0 && (
        <p className="ion-text-center">No se han encontrado resultados</p>
      )}
      <IonList>
        {paymentNoticesGroupedByDate.map(
          (dateItem: { dateLabel: string; items: PaymentNotice[] }) => {
            return (
              <IonItemGroup key={dateItem.dateLabel}>
                <IonItemDivider color="light">
                  <IonLabel>{dateItem.dateLabel}</IonLabel>
                </IonItemDivider>
                {dateItem.items.map((paymentNotice: PaymentNotice) => (
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
    </>
  );
};

export default PaymentNoticeListByDate;
