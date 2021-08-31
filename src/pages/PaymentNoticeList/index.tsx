import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonPage,
  IonBackButton,
  IonButtons,
  IonToast,
  isPlatform,
} from "@ionic/react";

// Components
import PaymentNoticeListByDate from "./components/PaymentNoticeListByDate";
import PaymentNoticeCreateButton from "./components/PaymentNoticeCreateButton";
// Selectors
import { selectCreateStatus } from "../../store/paymentNotice/selectors/selectCreateStatus";
import PaymentNoticeListHeaderSegment from "./components/PaymentNoticeListHeaderSegment";
import PaymentNoticeListHeaderSearch from "./components/PaymentNoticeListHeaderSearch";

const PaymentNoticeList: React.FC = () => {
  const dispatch = useDispatch();
  const createStatus = useSelector(selectCreateStatus);

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text={isPlatform("ios") ? "Contabilidad" : ""}
              default-href="/app/contabilidad"
              color="light"
            />
          </IonButtons>
          <IonTitle>Abonos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" class="ion-no-border">
          <IonToolbar>
            <IonTitle size="large">Abonos</IonTitle>
          </IonToolbar>
        </IonHeader>
        <section
          style={{
            maxWidth: "800px",
          }}
          className={isPlatform("desktop") ? "ion-padding" : ""}
        >
          <PaymentNoticeListHeaderSegment />
          <br />
          {/* <PaymentNoticeListHeaderSearch /> */}
          <PaymentNoticeListByDate />
        </section>
        <PaymentNoticeCreateButton />
      </IonContent>
      <IonToast
        isOpen={createStatus === "fulfilled"}
        message="Abonos registrados exitosamente"
        position="bottom"
        onWillDismiss={() =>
          dispatch({
            type: "paymentNotice/setCreateStatus",
            payload: "initial",
          })
        }
        duration={6000}
        color="success"
      />
    </IonPage>
  );
};

export default PaymentNoticeList;
