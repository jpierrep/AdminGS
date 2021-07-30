import {
  IonLabel,
  IonItem,
  IonNote,
  IonItemGroup,
  IonText,
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
    totalQuantity,
    totalAmount,
  } = useSelector(selectCreateSummary);

  return (
    <IonItemGroup>
      <IonItem lines="none">
        <IonLabel>
          <h6>{identifiedQuantity} Identificados</h6>
          <h6>{unidentifiedQuantity} Pendientes</h6>
        </IonLabel>
        <IonNote slot="end" class="ion-text-right">
          <IonText color="primary">
            <h5 className="ion-no-margin">
              {currencyFormat(identifiedAmount || 0)}
            </h5>
          </IonText>
          <IonText color="primary">
            <h5 className="ion-no-margin">
              {currencyFormat(unidentifiedAmount || 0)}
            </h5>
          </IonText>
        </IonNote>
      </IonItem>
      <IonItem lines="none">
        <IonLabel>
          <strong>Total</strong>
          <p>{totalQuantity} abonos</p>
        </IonLabel>
        <IonNote slot="end" class="ion-text-right">
          <IonText color="primary">
            <h5 className="ion-no-margin">
              {currencyFormat(totalAmount || 0)}
            </h5>
          </IonText>
        </IonNote>
      </IonItem>
    </IonItemGroup>
  );
};

export default PaymentNoticeCreateFormSummary;
