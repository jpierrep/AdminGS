import React from "react";
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useSelector } from "react-redux";

export const UserAuthenticatedAccount: React.FC = () => {
  const { user } = useSelector((store: any) => store.userAuthentication);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Mi cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Mi cuenta</IonTitle>
          </IonToolbar>
        </IonHeader>
        <section className="ion-padding">
          <h1>
            Hola <strong>{user.username}</strong>
          </h1>
        </section>
      </IonContent>
    </IonPage>
  );
};
