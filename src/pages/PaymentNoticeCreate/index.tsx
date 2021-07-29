import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonList,
  IonPage,
  IonContent,
  IonBackButton,
  IonButtons,
  IonListHeader,
  IonButton,
  IonFooter,
  IonLoading,
  IonAlert,
  isPlatform,
} from "@ionic/react";

// Actions
import createPaymentNotices from "../../store/paymentNotice/actions/createPaymentNotices";
// Selectors
import { selectCreateFormData } from "../../store/paymentNotice/selectors/selectCreateFormData";
// Components
import PaymentNoticeCreateItemModal from "./components/PaymentNoticeCreateItemModal";
import PaymentNoticeCreateFormSummary from "./components/PaymentNoticeCreateFormSummary";
import PaymentNoticeListByDate from "./components/PaymentNoticeListByDate";
import { selectCreateStatus } from "../../store/paymentNotice/selectors/selectCreateStatus";

const PaymentNoticeCreate: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const paymentNoticesCreateFormData = useSelector(selectCreateFormData);
  const createStatus = useSelector(selectCreateStatus);

  const [showConfirmCreateAlert, setShowConfirmCreateAlert] = useState(false);

  const onCreatePaymentNoticesConfirmed = async () => {
    try {
      await dispatch(createPaymentNotices());
      history.replace("/app/contabilidad/abonos");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text={isPlatform("ios") ? "Cancelar" : ""}
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
          <PaymentNoticeListByDate />
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
        isOpen={createStatus === "pending"}
        message={"Registrando abonos..."}
      />
    </IonPage>
  );
};

export default PaymentNoticeCreate;
