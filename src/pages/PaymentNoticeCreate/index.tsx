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
  IonNote,
  IonButton,
  IonFooter,
  IonIcon,
  IonLoading,
  IonAlert,
} from "@ionic/react";
import { alertCircleOutline, checkmarkCircleOutline } from "ionicons/icons";
import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";
import createPaymentNotices from "../../store/accounting/actions/createPaymentNotices";
import PaymentNoticeCreateFormSummary from "./components/PaymentNoticeCreateFormSummary";
import { useHistory } from "react-router";
import currencyFormat from "../../utils/currencyFormat";
import PaymentNoticeCreateItemModal from "./components/PaymentNoticeCreateItemModal";

const PaymentNoticeCreate: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { paymentNoticesCreateFormData } = useSelector(
    (store: any) => store.accounting
  );

  const { paymentNoticesCreatePending } = useSelector(
    (store: any) => store.accounting
  );

  const [showConfirmCreateAlert, setShowConfirmCreateAlert] = useState(false);

  const onCreatePaymentNoticesConfirmed = async () => {
    try {
      await dispatch(createPaymentNotices());
      history.replace("/app/contabilidad/abonos");
    } catch (error) {
      console.log(error);
    }
  };

  const PaymentNoticeItem = ({ paymentNotice }: any) => (
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
        <strong>{currencyFormat(paymentNotice.amount)}</strong>
      </IonNote>
    </IonItem>
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text="Cancelar"
              default-href="/app/contabilidad/abonos"
            />
          </IonButtons>
          <IonTitle>Registrar Abonos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Registrar abonos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonListHeader>
            <IonLabel>Abonos</IonLabel>
          </IonListHeader>
          {paymentNoticesCreateFormData.items.map(
            (paymentNotice: any, index: any) => (
              <PaymentNoticeItem
                paymentNotice={paymentNotice}
                key={index}
              ></PaymentNoticeItem>
            )
          )}
          <PaymentNoticeCreateFormSummary />
        </IonList>
      </IonContent>
      <PaymentNoticeCreateItemModal />
      <IonFooter>
        <IonButton
          expand="block"
          onClick={() => setShowConfirmCreateAlert(true)}
        >
          <strong>REGISTRAR ABONOS</strong>
        </IonButton>
      </IonFooter>
      <IonAlert
        isOpen={showConfirmCreateAlert}
        message={`<h3>Se registrarán ${paymentNoticesCreateFormData.items.length} abonos</h3>`}
        onDidDismiss={() => setShowConfirmCreateAlert(false)}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Registrar",
            handler: () => onCreatePaymentNoticesConfirmed(),
          },
        ]}
      />
      <IonLoading
        isOpen={paymentNoticesCreatePending}
        message={"Registrando abonos..."}
      />
    </IonPage>
  );
};

export default PaymentNoticeCreate;
