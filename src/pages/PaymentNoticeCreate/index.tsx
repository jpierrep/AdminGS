import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonPage,
  IonContent,
  IonBackButton,
  IonButtons,
  IonButton,
  IonFooter,
  IonLoading,
  IonAlert,
  isPlatform,
} from "@ionic/react";

// Components
import PaymentNoticeCreateFormSummary from "./components/PaymentNoticeCreateFormSummary";
import PaymentNoticeListByDate from "./components/PaymentNoticeListByDate";
// Actions
import createPaymentNotices from "../../store/paymentNotice/actions/createPaymentNotices";
// Selectors
import { selectCreateSummary } from "../../store/paymentNotice/selectors/selectCreateSummary";
import { selectCreateStatus } from "../../store/paymentNotice/selectors/selectCreateStatus";

const PaymentNoticeCreate: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const createStatus = useSelector(selectCreateStatus);
  const { totalQuantity } = useSelector(selectCreateSummary);

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
        <br />
        <PaymentNoticeListByDate />
      </IonContent>
      <IonFooter>
        <PaymentNoticeCreateFormSummary />
        <IonButton
          expand="block"
          onClick={() => setShowConfirmCreateAlert(true)}
        >
          <strong>REGISTRAR ABONOS</strong>
        </IonButton>
      </IonFooter>
      <IonAlert
        isOpen={showConfirmCreateAlert}
        message={`<h3>Se registrarán ${totalQuantity} abonos</h3>`}
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
