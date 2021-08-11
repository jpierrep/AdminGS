import { IonLabel, IonItem, IonNote, IonIcon, IonText } from "@ionic/react";
import { checkmarkCircleOutline, alertCircleOutline } from "ionicons/icons";

import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
// Types
import { PaymentNotice } from "../../../@types/paymentNotice";
// Utils
import currencyFormat from "../../../utils/currencyFormat";

const PaymentNoticeListItem: React.FC<{ paymentNotice: PaymentNotice }> = ({
  paymentNotice,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <IonItem
      onClick={() => {
        dispatch({
          type: "paymentNotice/showPaymentNoticeItemEditForm",
          payload: paymentNotice,
        });
        history.push(`/app/contabilidad/abonos/agregar/abono`);
      }}
      lines="none"
      className={!paymentNotice.client ? "ion-activated" : ""}
    >
      <IonLabel>
        <IonText color="primary">
          <h5 style={{ color: paymentNotice.client ? "" : "red" }}>
            {!paymentNotice.client && (
              <IonIcon
                icon={
                  paymentNotice.client
                    ? checkmarkCircleOutline
                    : alertCircleOutline
                }
                style={{ paddingRight: "8px" }}
              />
            )}
            <strong>{paymentNotice.client?.name || "No identificado"}</strong>
          </h5>
        </IonText>
        <p>{paymentNotice.client?.identifierFormatted}</p>
        <p>
          <small>{paymentNotice.description}</small>
        </p>
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
