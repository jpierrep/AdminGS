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
          <strong>
            <IonText color="primary">{paymentNotice.client.name}</IonText>
          </strong>
        ) : (
          <span>No identificado</span>
        )}
        <p>{paymentNotice.client?.identifierFormatted || paymentNotice.description}</p>
      </IonLabel>
      <IonNote slot="end" style={{ minWidth: "110px", textAlign: "right" }}>
        <IonText color="primary">
          <h5 className="ion-no-margin">
            {currencyFormat(paymentNotice.amount || 0)}
          </h5>
        </IonText>
      </IonNote>
    </IonItem>
  );
};

export default PaymentNoticeListItem;
