import { IonItemDivider, IonItemGroup, IonLabel, IonList } from "@ionic/react";
import React from "react";
import { useSelector } from "react-redux";
// Selectors
import { selectCreateFormData } from "../../../store/paymentNotice/selectors/selectCreateFormData";
// Components
import PaymentNoticeListItem from "./PaymentNoticeListItem";

const PaymentNoticeListByDate: React.FC = () => {
  const paymentNoticesCreateFormData = useSelector(selectCreateFormData);
  return (
    <>
      {paymentNoticesCreateFormData.items.length === 0 && (
        <p className="ion-text-center">No se han encontrado resultados</p>
      )}
      <IonList>
        {paymentNoticesCreateFormData.items.map((dateItem) => {
          return (
            <IonItemGroup key={dateItem.dateLabel}>
              <IonItemDivider sticky={true}>
                <IonLabel>
                  <strong>{dateItem.dateLabel}</strong>
                </IonLabel>
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
    </>
  );
};

export default PaymentNoticeListByDate;
