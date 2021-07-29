import { IonLabel, IonItem, IonNote, IonIcon } from "@ionic/react";
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
    >
      <IonIcon
        icon={
          paymentNotice.client ? checkmarkCircleOutline : alertCircleOutline
        }
        style={{ color: paymentNotice.client ? "green" : "red" }}
        slot="start"
      />
      <IonLabel>
        <strong>{paymentNotice.client?.name || "No identificado"}</strong>
        <p>
          <small>{paymentNotice.identifier}</small>
        </p>
      </IonLabel>
      <IonNote slot="end">
        <strong>{currencyFormat(paymentNotice.amount || 0)}</strong>
      </IonNote>
    </IonItem>
  );
};

export default PaymentNoticeListItem;
