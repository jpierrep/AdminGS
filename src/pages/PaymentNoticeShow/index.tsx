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
            <IonListHeader>
              <IonLabel>
                <IonText color="tertiary">General</IonText>
              </IonLabel>
            </IonListHeader>
            <IonItem>
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
            <IonItem>
              <IonLabel>
                <p>Fecha</p>
                <IonText color="primary">
                  <strong>{paymentNoticeShowed.payedAtLegible}</strong>
                </IonText>
              </IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>
                <p>Monto</p>
                <IonText color="primary">
                  <strong>
                    {currencyFormat(paymentNoticeShowed.amount || 0)}
                  </strong>
                </IonText>
              </IonLabel>
            </IonItem>
            {/*           <IonItem>
            <IonLabel>
              <p>Descripción</p>
              <strong>{paymentNoticeShowed.description || "--"}</strong>
            </IonLabel>
          </IonItem> */}
            <InvoicesItem></InvoicesItem>
            <IonListHeader>
              <IonLabel>
                <IonText color="tertiary">Actividad</IonText>
              </IonLabel>
            </IonListHeader>
            {paymentNoticeShowed?.log?.length === 0 && (
              <IonItem lines="none">
                <IonLabel>
                  <h2 style={{ fontWeight: 200 }}>
                    No se ha registrado actividad
                  </h2>
                </IonLabel>
              </IonItem>
            )}
            {paymentNoticeShowed?.log?.map((logItem, index) => (
              <IonItem key={index}>
                <IonLabel>
                  <h2>{logItem.description}</h2>
                  <h4 className="ion-text-right">{logItem.createdAtLegible}</h4>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default PaymentNoticeShow;
