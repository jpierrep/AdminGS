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
  isPlatform,
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
      <IonHeader class="ion-no-border">
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton color="light"></IonMenuButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonTitle>Mi cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense" class="ion-no-border">
          <IonToolbar>
            <IonTitle size="large">Mi cuenta</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonCard color="secondary">
          <IonAvatar class="ion-margin">
            <img
              src={`https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y`}
              alt=""
              width="60"
              height="60"
            />
          </IonAvatar>
          <IonCardHeader>
            <IonCardTitle>{user?.name}</IonCardTitle>
            <IonCardSubtitle>{user?.email}</IonCardSubtitle>
          </IonCardHeader>
        </IonCard>
        <IonCard>
          <IonList>
{/*             <IonItem lines="none" button disabled>
              <IonIcon icon={helpCircleOutline} slot="start"></IonIcon>
              <IonLabel>Ayuda</IonLabel>
            </IonItem> */}
            <LogoutButton />
          </IonList>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};
