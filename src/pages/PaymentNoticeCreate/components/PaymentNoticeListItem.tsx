import { IonLabel, IonItem, IonNote, IonIcon } from "@ionic/react";
import { checkmarkCircleOutline, alertCircleOutline } from "ionicons/icons";

import React from "react";
import { useDispatch } from "react-redux";
// Types
import { PaymentInvoice } from "../../../@types/paymentInvoice";
// Utils
import currencyFormat from "../../../utils/currencyFormat";

interface PaymentNoticeListItemProps {
  paymentNotice: PaymentInvoice;
}

const PaymentNoticeListItem: React.FC<PaymentNoticeListItemProps> = ({
  paymentNotice,
}) => {
  const dispatch = useDispatch();
  return (
    <IonItem
      onClick={() =>
        dispatch({
          type: "accounting/showPaymentNoticeItemEditForm",
          payload: paymentNotice,
        })
      }
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
