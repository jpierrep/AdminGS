import {
  IonAvatar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonText,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import { personOutline, cashOutline } from "ionicons/icons";
import { useSelector } from "react-redux";
import { selectUser } from "../store/userAuthentication/selectors/selectUser";

interface AppPage {
  url: string;
  icon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Contabilidad",
    url: "/app/contabilidad",
    icon: cashOutline,
  },
  {
    title: "Mi Cuenta",
    url: "/app/mi-cuenta",
    icon: personOutline,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();
  const user = useSelector(selectUser);
  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
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
        <IonList class="ion-padding-horizontal" color="transparent">
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} auto-hide="false">
                <IonItem
                  color={
                    location.pathname.includes(appPage.url)
                      ? "primary"
                      : "transparent"
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                  style={{
                    borderRadius: "4px",
                    marginBottom: "4px",
                  }}
                >
                  <IonIcon slot="start" icon={appPage.icon} />
                  <IonLabel>
                    <h2>{appPage.title}</h2>
                  </IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
