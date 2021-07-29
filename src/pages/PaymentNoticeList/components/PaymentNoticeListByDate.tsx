import React from "react";
import { useSelector } from "react-redux";
import { IonItemDivider, IonItemGroup, IonLabel, IonList } from "@ionic/react";
// Components
import PaymentNoticeListItem from "./PaymentNoticeListItem";
// Selectors
import { selectListGroupedByDate } from "../../../store/paymentNotice/selectors/selectListGroupedByDate";

const PaymentNoticeListByDate: React.FC = () => {
  const paymentNoticesGroupedByDate = useSelector(selectListGroupedByDate);
  return (
    <IonList>
      {paymentNoticesGroupedByDate.length === 0 && (
        <p className="ion-text-center">No se han encontrado resultados</p>
      )}
      {paymentNoticesGroupedByDate.map((dateItem) => {
        return (
          <IonItemGroup key={dateItem.dateLabel}>
            <IonItemDivider color="light">
              <IonLabel>{dateItem.dateLabel}</IonLabel>
            </IonItemDivider>
            {dateItem.items.map((paymentNotice) => (
              <PaymentNoticeListItem
                paymentNotice={paymentNotice}
                key={paymentNotice.id}
              />
            ))}
          </IonItemGroup>
        );
      })}
    </IonList>
  );
};

export default PaymentNoticeListByDate;
