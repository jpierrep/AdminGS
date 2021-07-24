import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonList,
  IonPage,
  IonContent,
  IonBackButton,
  IonButtons,
  IonListHeader,
} from "@ionic/react";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import findOnePaymentNotice from "../../store/accounting/actions/findOnePaymentNotice";
import currencyFormat from "../../utils/currencyFormat";

const PaymentNoticeShow: React.FC = () => {
  const { paymentNoticeShowed } = useSelector((store: any) => store.accounting);

  const dispatch = useDispatch();
  let { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(findOnePaymentNotice(parseInt(id)));
  }, [dispatch, id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Abonos" default-href="/contabilidad/abonos" />
          </IonButtons>
          <IonTitle>Abono</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Abono</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonListHeader>
            <IonLabel>Datos abono</IonLabel>
          </IonListHeader>
          <IonItem>
            <IonLabel>
              <p>Cliente</p>
              <strong>
                {paymentNoticeShowed.client?.name || "No identificado"}
              </strong>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <p>Fecha</p>
              <strong>{paymentNoticeShowed.payedAtLegible}</strong>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <p>Monto</p>
              <strong>{currencyFormat(paymentNoticeShowed.amount || 0)}</strong>
            </IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>
              <p>Facturas pagadas</p>
              <strong>--</strong>
            </IonLabel>
          </IonItem>
          <IonListHeader>
            <IonLabel>Actividad</IonLabel>
          </IonListHeader>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PaymentNoticeShow;
