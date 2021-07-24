import { IonLabel, IonItem, IonNote } from "@ionic/react";

import React from "react";
import currencyFormat from "../../../utils/currencyFormat";

interface PaymentNoticeListItemProps {
  paymentNotice: any;
}

const PaymentNoticeListItem: React.FC<PaymentNoticeListItemProps> = ({
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
          <small>{paymentNotice.code}</small>
        </p>
      </IonLabel>
      <IonNote slot="end">
        <h5>{currencyFormat(paymentNotice.amount)}</h5>
      </IonNote>
    </IonItem>
  );
};

export default PaymentNoticeListItem;
