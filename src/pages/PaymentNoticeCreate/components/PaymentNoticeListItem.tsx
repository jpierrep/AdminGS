import {
  IonLabel,
  IonItem,
  IonNote,
  IonIcon,
  IonText,
  IonItemSliding,
  IonItemOption,
  IonItemOptions,
} from "@ionic/react";
import { checkmarkCircleOutline, alertCircleOutline } from "ionicons/icons";

import React from "react";
import { useDispatch } from "react-redux";
// Types
import { PaymentNotice } from "../../../@types/paymentNotice";
// Utils
import currencyFormat from "../../../utils/currencyFormat";

const PaymentNoticeListItem: React.FC<{ paymentNotice: PaymentNotice }> = ({
  paymentNotice,
}) => {
  const dispatch = useDispatch();
  return (
    <IonItemSliding>
      <IonItem
        onClick={() => {
          dispatch({
            type: "paymentNotice/showPaymentNoticeItemEditForm",
            payload: paymentNotice,
          });
        }}
        lines="none"
        routerLink={`/app/contabilidad/abonos/agregar/abono`}
      >
        <IonLabel>
          <h3>
            <IonText color={paymentNotice.client ? "primary" : "danger"}>
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
            </IonText>
          </h3>
          <p>{paymentNotice.client?.identifierFormatted}</p>
          <p>
            <small>{paymentNotice.description}</small>
          </p>
        </IonLabel>
        <IonNote slot="end" style={{ minWidth: "110px", textAlign: "right" }}>
          <IonText color="primary">
            <h6 className="ion-no-margin">
              <strong>{currencyFormat(paymentNotice.amount || 0)}</strong>
            </h6>
          </IonText>
        </IonNote>
      </IonItem>
      <IonItemOptions side="end">
        <IonItemOption color="danger">Quitar</IonItemOption>
      </IonItemOptions>
    </IonItemSliding>
  );
};

export default PaymentNoticeListItem;
