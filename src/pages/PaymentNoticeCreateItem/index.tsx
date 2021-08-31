import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonButtons,
  IonContent,
  IonPage,
  IonBackButton,
  isPlatform,
  IonText,
} from "@ionic/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
// Selectors
import { selectCreateFormDataItem } from "../../store/paymentNotice/selectors/selectCreateFormDataItem";
// Utils
import currencyFormat from "../../utils/currencyFormat";
// Components
import ClientSelector from "./components/ClientSelector";
import ReconciliationsSelector from "./components/ReconciliationsSelector";

const PaymentNoticeCreateItem: React.FC = () => {
  const dispatch = useDispatch();

  const createFormDataItem = useSelector(selectCreateFormDataItem);

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text={isPlatform("ios") ? "Cancelar" : ""}
              default-href="/app/contabilidad/abonos/agregar"
              color="light"
            />
          </IonButtons>
          <IonTitle>Editar Abono</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() =>
                dispatch({
                  type: "paymentNotice/confirmUpdatePaymentNoticesCreateFormDataItem",
                })
              }
              routerLink={`/app/contabilidad/abonos/agregar`}
              routerDirection="back"
            >
              Listo
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <section
          style={{
            maxWidth: "800px",
          }}
          className={isPlatform("desktop") ? "ion-padding" : ""}
        >
          <IonList>
            <IonItem lines="none">
              <IonLabel>
                <p>Fecha</p>
                <IonText color="primary">
                  <strong>{createFormDataItem.payedAtLegible}</strong>
                </IonText>
              </IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                <p>Descripción</p>
                <IonText color="primary">
                  <strong>{createFormDataItem.description}</strong>
                </IonText>
              </IonLabel>
            </IonItem>
            <IonItem lines="none">
              <IonLabel>
                <p>Monto</p>
                <IonText color="primary">
                  <strong>
                    {currencyFormat(createFormDataItem.amount || 0)}
                  </strong>
                </IonText>
              </IonLabel>
            </IonItem>
            <ClientSelector />
            <ReconciliationsSelector />
          </IonList>
        </section>
      </IonContent>
    </IonPage>
  );
};

export default PaymentNoticeCreateItem;
