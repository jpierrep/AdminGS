import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";

import React from "react";
// Components
import PaymentNoticeListSummary from "./components/PaymentNoticeListSummary";

const AccountingDashboards: React.FC = () => {
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
