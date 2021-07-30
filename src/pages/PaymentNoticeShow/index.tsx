import React, { useEffect } from "react";
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
} from "@ionic/react";
// Actions
import findOnePaymentNotice from "../../store/paymentNotice/actions/findOnePaymentNotice";
// Selectors
import { selectShowData } from "../../store/paymentNotice/selectors/selectShowData";
// Utils
import currencyFormat from "../../utils/currencyFormat";

const PaymentNoticeShow: React.FC = () => {
  const dispatch = useDispatch();

  // Buscar detalles al cambiar parámetro id de la url
  let { id }: { id: string } = useParams();
  useEffect(() => {
    dispatch(findOnePaymentNotice(parseInt(id)));
  }, [dispatch, id]);

  // Data
  const paymentNoticeShowed = useSelector(selectShowData);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={isPlatform('android') ? 'primary' : ''}>
          <IonButtons slot="start">
            <IonBackButton
              text={isPlatform("ios") ? "Abonos" : ""}
              default-href="/contabilidad/abonos"
            />
          </IonButtons>
          <IonTitle>Abono</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color={isPlatform('android') ? 'primary' : ''}>
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
              <p>Descripción</p>
              <strong>{paymentNoticeShowed.description || "--"}</strong>
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

          {paymentNoticeShowed?.log?.map((logItem, index) => (
            <IonItem key={index}>
              <IonLabel>
                <h2>{logItem.description}</h2>
                <h4 className="ion-text-right">{logItem.createdAtLegible}</h4>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default PaymentNoticeShow;
