import {
  IonLabel,
  IonItem,
  IonNote,
  IonItemDivider,
  IonItemGroup,
} from "@ionic/react";
import { useSelector } from "react-redux";
import React from "react";
import currencyFormat from "../../../utils/currencyFormat";
import { selectCreateSummary } from "../../../store/paymentNotice/selectors/selectCreateSummary";

const PaymentNoticeCreateFormSummary: React.FC = () => {
  const {
    identifiedQuantity,
    identifiedAmount,
    unidentifiedQuantity,
    unidentifiedAmount,
  } = useSelector(selectCreateSummary);

  return (
    <IonItemGroup>
      <IonItemDivider color="light">
        <IonLabel>Resumen</IonLabel>
      </IonItemDivider>
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
    </IonItemGroup>
  );
};

export default PaymentNoticeCreateFormSummary;
