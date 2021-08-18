import {
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
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
        <p className="ion-text-center" style={{ fontWeight: 300 }}>
          No se han encontrado resultados
        </p>
      )}
      <IonList class="ion-no-padding">
        {paymentNoticesCreateFormData.items.map((dateItem) => {
          return (
            <IonItemGroup key={dateItem.dateLabel}>
              <IonItemDivider sticky={true}>
                <IonLabel>
                  <IonText color="tertiary">{dateItem.dateLabel}</IonText>
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
