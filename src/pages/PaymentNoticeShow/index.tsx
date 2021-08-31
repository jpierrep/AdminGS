import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
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
  isPlatform,
  IonText,
} from "@ionic/react";
// Actions
import findOnePaymentNotice from "../../store/paymentNotice/actions/findOnePaymentNotice";
import findPaymentReconciliations from "../../store/paymentNotice/actions/findPaymentReconciliations";
// Selectors
import { selectShowData } from "../../store/paymentNotice/selectors/selectShowData";
// Utils
import currencyFormat from "../../utils/currencyFormat";
import InvoicesItem from "./components/InvoicesItem";
import PaymentNoticeLog from "./components/PaymentNoticeLog";

const PaymentNoticeShow: React.FC = () => {
  const dispatch = useDispatch();

  // Buscar detalles al cambiar parámetro id de la url
  let { id }: { id: string } = useParams();
  useEffect(() => {
    dispatch(findOnePaymentNotice(parseInt(id)));
    dispatch(findPaymentReconciliations(parseInt(id)));
  }, [dispatch, id]);

  // Data
  const paymentNoticeShowed = useSelector(selectShowData);

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text={isPlatform("ios") ? "Abonos" : ""}
              default-href="/contabilidad/abonos"
              color="light"
            />
          </IonButtons>
          <IonTitle>Abono</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" class="ion-no-border">
          <IonToolbar>
            <IonTitle size="large">Abono</IonTitle>
          </IonToolbar>
        </IonHeader>
        <section
          style={{
            maxWidth: "800px",
          }}
          className={isPlatform("desktop") ? "ion-padding" : ""}
        >
          <IonList>
            {/*             <IonListHeader>
              <IonLabel>
                <IonText color="tertiary">General</IonText>
              </IonLabel>
            </IonListHeader> */}
            <IonItem lines="none">
              <IonLabel class="ion-text-wrap">
                <p>Cliente</p>
                <IonText color="primary">
                  <strong>
                    {paymentNoticeShowed.client?.name || "No identificado"}
                  </strong>
                </IonText>
                <p>{paymentNoticeShowed.client?.identifierFormatted}</p>
              </IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel class="ion-text-wrap">
                <p>Empresa</p>
                <IonText color="primary">
                  <strong>{paymentNoticeShowed.company?.name}</strong>
                </IonText>
              </IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                <p>Fecha</p>
                <IonText color="primary">
                  <strong>{paymentNoticeShowed.payedAtLegible}</strong>
                </IonText>
              </IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                <p>Monto</p>
                <IonText color="primary">
                  <strong>
                    {currencyFormat(paymentNoticeShowed.amount || 0)}
                  </strong>
                </IonText>
              </IonLabel>
            </IonItem>
            <InvoicesItem></InvoicesItem>
            {/* <PaymentNoticeLog></PaymentNoticeLog> */}
          </IonList>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default PaymentNoticeShow;
