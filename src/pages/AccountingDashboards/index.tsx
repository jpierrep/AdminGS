import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import React from "react";
import PaymentNoticeListSummary from "./components/PaymentNoticeListSummary";

const AccountingDashboards: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Contabilidad</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
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
