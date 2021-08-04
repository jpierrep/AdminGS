import React from "react";
import { useSelector } from "react-redux";
import {
  IonAvatar,
  IonButtons,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// Selectors
import { selectUser } from "../../store/userAuthentication/selectors/selectUser";
// Components
import LogoutButton from "./components/LogoutButton";
import { helpCircleOutline } from "ionicons/icons";

export const UserAuthenticatedAccount: React.FC = () => {
  const user = useSelector(selectUser);
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
        <IonCard>
          <IonAvatar class="ion-margin">
            <img
              src={`https://jaimecisternas.dev/img/welcome.d7bad8d2.png`}
              alt=""
              width="60"
              height="60"
            />
          </IonAvatar>
          <IonCardHeader>
            <IonCardTitle>{user?.username}</IonCardTitle>
            <IonCardSubtitle>{user?.email}</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonList>
            <IonItem lines="none">
              <IonIcon icon={helpCircleOutline} slot="start"></IonIcon>
              <IonLabel>Ayuda</IonLabel>
            </IonItem>
            <LogoutButton />
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
