import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import { personOutline, cashOutline, peopleOutline } from "ionicons/icons";
import { useSelector } from "react-redux";

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

  const { user } = useSelector((store: any) => store.userAuthentication);

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList>
          <IonItem className="ion-margin-vertical" lines="none">
            <IonLabel>
              <h1>
                <strong>{user.username}</strong>
              </h1>
              <h3>{user.email}</h3>
            </IonLabel>
          </IonItem>

          {appPages.map((appPage, index) => {
            return (
              <IonItem
                key={index}
                className={
                  location.pathname === appPage.url ? "ion-activated" : ""
                }
                routerLink={appPage.url}
                routerDirection="none"
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" icon={appPage.icon} />
                <IonLabel>{appPage.title}</IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
