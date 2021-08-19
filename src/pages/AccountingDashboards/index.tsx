import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import findClients from "../../store/clients/actions/findClients";
import { selectClients } from "../../store/clients/selectors/selectClients";
// Components
import PaymentNoticeListSummary from "./components/PaymentNoticeListSummary";

const AccountingDashboards: React.FC = () => {
  const dispatch = useDispatch();

  const clients: any[] = useSelector(selectClients);

  useEffect(() => {
    if (!clients.length) {
      dispatch(findClients());
    }
  }, [dispatch, clients]);

  return (
    <IonPage>
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="light"></IonMenuButton>
          </IonButtons>
          <IonTitle>Contabilidad</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" class="ion-no-border">
          <IonToolbar>
            <IonTitle size="large">Contabilidad</IonTitle>
          </IonToolbar>
        </IonHeader>
        <PaymentNoticeListSummary />
      </IonContent>
    </IonPage>
  );
};

export default AccountingDashboards;
