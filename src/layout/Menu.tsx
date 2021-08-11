import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
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
        <IonList>
          <IonItem className="ion-margin-vertical" lines="none">
            <IonLabel>
              <IonText color="primary">
                <h1>
                  <strong>{user?.username}</strong>
                </h1>
              </IonText>
              <h3>{user?.email}</h3>
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
                <IonLabel>
                  <h2>{appPage.title}</h2>
                </IonLabel>
              </IonItem>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
