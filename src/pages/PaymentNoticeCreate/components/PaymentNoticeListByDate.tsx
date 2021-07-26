import {
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonListHeader,
} from "@ionic/react";

import React from "react";
import PaymentNoticeListItem from "./PaymentNoticeListItem";

interface PaymentNoticeListByDateProps {
  paymentNoticesGroupedByDate: any;
}

const PaymentNoticeListByDate: React.FC<PaymentNoticeListByDateProps> = ({
  paymentNoticesGroupedByDate,
}) => {
  return (
    <>
      {paymentNoticesGroupedByDate.length === 0 && (
        <p className="ion-text-center">No se han encontrado resultados</p>
      )}
      <IonList>
        {paymentNoticesGroupedByDate.map((dateItem: any) => {
          return (
            <IonItemGroup key={dateItem.dateLabel}>
              <IonItemDivider color="light">
                <IonLabel>{dateItem.dateLabel}</IonLabel>
              </IonItemDivider>
              {dateItem.items.map((paymentNotice: any) => (
                <PaymentNoticeListItem
                  paymentNotice={paymentNotice}
                  key={paymentNotice.id}
                />
              ))}
            </IonItemGroup>
          );
        })}
      </IonList>
    </>
  );
};

export default PaymentNoticeListByDate;
