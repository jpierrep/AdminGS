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
import { selectPaymentNoticesGroupedByDateCreateForm } from "../../store/accounting/selectors/selectPaymentNoticesGroupedByDateCreateForm";
import PaymentNoticeListByDate from "./components/PaymentNoticeListByDate";
import { isPlatform } from "@ionic/react";
const PaymentNoticeCreate: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { paymentNoticesCreateFormData } = useSelector(
    (store: any) => store.accounting
  );

  const paymentNoticesGroupedByDate = useSelector(
    selectPaymentNoticesGroupedByDateCreateForm
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

          <PaymentNoticeListByDate
            paymentNoticesGroupedByDate={paymentNoticesGroupedByDate}
          />

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
