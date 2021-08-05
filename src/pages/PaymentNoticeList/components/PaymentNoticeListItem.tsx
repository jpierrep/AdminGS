import { IonLabel, IonItem, IonNote, IonText } from "@ionic/react";
import React from "react";
// Types
import { PaymentNotice } from "../../../@types/paymentNotice";
// Utils
import currencyFormat from "../../../utils/currencyFormat";

const PaymentNoticeListItem: React.FC<{ paymentNotice: PaymentNotice }> = ({
  paymentNotice,
}) => {
  return (
    <IonItem
      routerLink={`/app/contabilidad/abonos/detalle/${paymentNotice.id}`}
      lines="none"
    >
      <IonLabel>
        {paymentNotice.client ? (
          <IonText color="primary">
            <strong>{paymentNotice.client.name}</strong>
          </IonText>
        ) : (
          <span>No identificado</span>
        )}
        <p>{paymentNotice.client?.identifier || paymentNotice.description}</p>
      </IonLabel>
      <IonNote slot="end">
        <h5>{currencyFormat(paymentNotice.amount || 0)}</h5>
      </IonNote>
    </IonItem>
  );
};

export default PaymentNoticeListItem;
