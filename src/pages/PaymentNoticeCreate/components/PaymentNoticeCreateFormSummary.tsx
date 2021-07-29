import { IonLabel, IonItem, IonListHeader, IonNote } from "@ionic/react";
import { useSelector } from "react-redux";
import React from "react";
import currencyFormat from "../../../utils/currencyFormat";

const PaymentNoticeCreateFormSummary: React.FC = () => {
  const identifiedAmount = useSelector((store: any) => {
    return store.paymentNotice.paymentNoticesCreateFormData.items
      .filter(({ client }: any) => client)
      .reduce((total: any, { amount }: any) => total + amount, 0);
  });

  const identifiedQuantity = useSelector((store: any) => {
    return store.paymentNotice.paymentNoticesCreateFormData.items.filter(
      ({ client }: any) => client
    ).length;
  });

  const unidentifiedAmount = useSelector((store: any) => {
    return store.paymentNotice.paymentNoticesCreateFormData.items
      .filter(({ client }: any) => !client)
      .reduce((total: any, { amount }: any) => total + amount, 0);
  });

  const unidentifiedQuantity = useSelector((store: any) => {
    return store.paymentNotice.paymentNoticesCreateFormData.items.filter(
      ({ client }: any) => !client
    ).length;
  });

  const totalAmount = useSelector((store: any) => {
    return store.paymentNotice.paymentNoticesCreateFormData.items.reduce(
      (total: any, { amount }: any) => total + amount,
      0
    );
  });

  const totalQuantity = useSelector((store: any) => {
    return store.paymentNotice.paymentNoticesCreateFormData.items.length;
  });

  return (
    <section>
      <IonListHeader>
        <IonLabel>Resumen</IonLabel>
      </IonListHeader>
      <IonItem>
        <IonLabel>
          <strong>Identificado</strong>
          <p>{identifiedQuantity} abonos</p>
        </IonLabel>
        <IonNote slot="end">
          <strong>{currencyFormat(identifiedAmount)}</strong>
        </IonNote>
      </IonItem>
      <IonItem>
        <IonLabel>
          <strong>Pendiente</strong>
          <p>{unidentifiedQuantity} abonos</p>
        </IonLabel>
        <IonNote slot="end">
          <strong>{currencyFormat(unidentifiedAmount)}</strong>
        </IonNote>
      </IonItem>
      <IonItem>
        <IonLabel>
          <strong>Total</strong>
          <p>{totalQuantity} abonos</p>
        </IonLabel>
        <IonNote slot="end">
          <strong>{currencyFormat(totalAmount)}</strong>
        </IonNote>
      </IonItem>
    </section>
  );
};

export default PaymentNoticeCreateFormSummary;
