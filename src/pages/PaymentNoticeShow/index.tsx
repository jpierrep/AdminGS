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
import findPaymentReconciliations from "../../store/paymentNotice/actions/findPaymentReconciliations";
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
    dispatch(findPaymentReconciliations(parseInt(id)));
  }, [dispatch, id]);

  // Data
  const paymentNoticeShowed = useSelector(selectShowData);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={!isPlatform("ios") ? "primary" : ""}>
          <IonButtons slot="start">
            <IonBackButton
              text={isPlatform("ios") ? "Abonos" : ""}
              default-href="/contabilidad/abonos"
            />
          </IonButtons>
          <IonTitle>Abono #{paymentNoticeShowed.code}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar color={!isPlatform("ios") ? "primary" : ""}>
            <IonTitle size="large">Abono {paymentNoticeShowed.code}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonLabel>
              <p>Cliente</p>
              <strong>
                {paymentNoticeShowed.client?.name || "No identificado"}
              </strong>
              <p>{paymentNoticeShowed.client?.identifier}</p>
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
              <strong>
                {paymentNoticeShowed.reconciliations?.map(
                  (paymentReconciliationItem, index) => (
                    <span>
                      #{paymentReconciliationItem.invoice?.code || ""}{" "}
                      {index ===
                        paymentNoticeShowed.reconciliations?.length && (
                        <span>-</span>
                      )}{" "}
                    </span>
                  )
                )}
              </strong>
            </IonLabel>
          </IonItem>
          <IonListHeader>
            <IonLabel>Actividad</IonLabel>
          </IonListHeader>
          {paymentNoticeShowed?.log?.length === 0 && (
            <IonItem lines="none">
              <IonLabel>
                <h2>No se ha registrado actividad</h2>
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
      </IonContent>
    </IonPage>
  );
};

export default PaymentNoticeShow;
