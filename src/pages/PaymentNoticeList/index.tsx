import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonFooter,
  IonContent,
  IonPage,
  IonBackButton,
  IonButtons,
  IonToast,
  isPlatform,
} from "@ionic/react";

// Components
import PaymentNoticeListHeader from "./components/PaymentNoticeListHeader";
import PaymentNoticeListByDate from "./components/PaymentNoticeListByDate";
import PaymentNoticeCreateButton from "./components/PaymentNoticeCreateButton";
// Selectors
import { selectPaymentNoticesCreateFulfilled } from "../../store/paymentNotice/selectors/selectPaymentNoticesCreateFulfilled";

const PaymentNoticeList: React.FC = () => {
  const dispatch = useDispatch();

  const paymentNoticesCreateFulfilled = useSelector(
    selectPaymentNoticesCreateFulfilled
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text={isPlatform("ios") ? "Contabilidad" : ""}
              default-href="/app/contabilidad"
            />
          </IonButtons>
          <IonTitle>Abonos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <br />
        <PaymentNoticeListHeader />
        <PaymentNoticeListByDate />
      </IonContent>
      <IonFooter>
        <PaymentNoticeCreateButton />
      </IonFooter>
      <IonToast
        isOpen={paymentNoticesCreateFulfilled}
        message="Abonos registrados exitosamente"
        position="bottom"
        onWillDismiss={() =>
          dispatch({
            type: "paymentNotice/setPaymentNoticesCreateFulfilled",
            payload: false,
          })
        }
        duration={6000}
        color="success"
      />
    </IonPage>
  );
};

export default PaymentNoticeList;
