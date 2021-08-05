import React, { useEffect } from "react";
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
import { selectCreateStatus } from "../../store/paymentNotice/selectors/selectCreateStatus";
import findClients from "../../store/clients/actions/findClients";

const PaymentNoticeList: React.FC = () => {
  const dispatch = useDispatch();
  const createStatus = useSelector(selectCreateStatus);

  useEffect(() => {
    dispatch(findClients());
  }, [dispatch]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={!isPlatform("ios") ? "primary" : ""}>
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
        <PaymentNoticeCreateButton />
      </IonContent>
      <IonFooter></IonFooter>
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
