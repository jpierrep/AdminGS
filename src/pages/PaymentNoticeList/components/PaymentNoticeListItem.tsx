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
        <h3>
          {paymentNotice.client ? (
            <>
              <strong>
                <IonText color="primary">{paymentNotice.client.name}</IonText>
              </strong>
              <small> {paymentNotice.client?.identifierFormatted}</small>
            </>
          ) : (
            <span>No identificado</span>
          )}
        </h3>
        {/*         <p>
          {paymentNotice.client?.identifierFormatted ||
            paymentNotice.description}
        </p> */}
        <p>{paymentNotice.company?.name}</p>
      </IonLabel>
      <IonNote slot="end" style={{ minWidth: "70px", textAlign: "right" }}>
        <IonText color="primary">
          <h6 className="ion-no-margin">
            <strong>{currencyFormat(paymentNotice.amount || 0)}</strong>
          </h6>
        </IonText>
      </IonNote>
    </IonItem>
  );
};

export default PaymentNoticeListItem;
