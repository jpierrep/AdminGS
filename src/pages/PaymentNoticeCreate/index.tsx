import React, { useState } from "react";
import { Prompt, useHistory } from "react-router";
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
import findPaymentNotices from "../../store/paymentNotice/actions/findPaymentNotices";

const PaymentNoticeCreate: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const createStatus = useSelector(selectCreateStatus);
  const { totalQuantity, unidentifiedQuantity } =
    useSelector(selectCreateSummary);

  const [showConfirmCreateAlert, setShowConfirmCreateAlert] = useState(false);

  const onCreatePaymentNoticesConfirmed = async () => {
    try {
      await dispatch(createPaymentNotices());
      dispatch(findPaymentNotices());
      setIsBlocking(false);
      history.replace("/app/contabilidad/abonos");
    } catch (error) {
      console.log(error);
    }
  };

  let [isBlocking, setIsBlocking] = useState(true);

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
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
        <section
          style={{
            maxWidth: "800px",
          }}
          className={isPlatform("desktop") ? "ion-padding" : ""}
        >
          <IonHeader collapse="condense" class="ion-no-border">
            <IonToolbar>
              <IonTitle size="large">Registrar abonos</IonTitle>
            </IonToolbar>
          </IonHeader>
          <PaymentNoticeListByDate />
        </section>
      </IonContent>
      <IonFooter class="ion-no-border">
        <section
          style={{
            maxWidth: "800px",
          }}
          className={isPlatform("desktop") ? "ion-padding" : ""}
        >
          <IonToolbar color="secondary">
            <PaymentNoticeCreateFormSummary />
            <IonButton
              expand="block"
              class="ion-margin-horizontal ion-margin-bottom"
              onClick={() => setShowConfirmCreateAlert(true)}
              color="primary"
            >
              <strong>REGISTRAR ABONOS</strong>
            </IonButton>
          </IonToolbar>
        </section>
      </IonFooter>
      <IonAlert
        isOpen={showConfirmCreateAlert}
        message={`
          <h1>Último paso</h1>
          <h3>Se registrarán ${totalQuantity} abonos, incluidos ${unidentifiedQuantity} sin identificar</h3>
          `}
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
      {/*       <Prompt
        message={(location, action) => {
          if (
            action === "POP" &&
            location.pathname === "/app/contabilidad/abonos"
          ) {
            return "¿Estás seguro de volver sin registrar los abonos?";
          }
          return true;
        }}
      /> */}
    </IonPage>
  );
};

export default PaymentNoticeCreate;
