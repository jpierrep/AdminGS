import { IonLabel, IonItem, IonNote } from "@ionic/react";
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
          <strong>{paymentNotice.client.name}</strong>
        ) : (
          <span>No identificado</span>
        )}
        <p>
          <small>{paymentNotice.identifier || paymentNotice.description}</small>
        </p>
      </IonLabel>
      <IonNote slot="end">
        <h5>{currencyFormat(paymentNotice.amount || 0)}</h5>
      </IonNote>
    </IonItem>
  );
};

export default PaymentNoticeListItem;
