import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IonAlert, IonIcon, IonItem, IonLabel, IonLoading } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
// Actions
import logout from "../../../store/userAuthentication/actions/logout";
// Selectors
import { selectLogoutStatus } from "../../../store/userAuthentication/selectors/selectLogoutStatus";
import { useHistory } from "react-router";

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [logoutAlert, setLogoutAlert] = useState(false);
  const logoutStatus = useSelector(selectLogoutStatus);
  const onLogoutConfirmed = async () => {
    try {
      await dispatch(logout);
      history.push("/ingresar");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <IonItem onClick={() => setLogoutAlert(true)} lines="none" button>
        <IonIcon icon={logOutOutline} slot="start"></IonIcon>
        <IonLabel>Salir</IonLabel>
      </IonItem>

      <IonAlert
        isOpen={logoutAlert}
        message={"¿Seguro deseas salir?"}
        onDidDismiss={() => setLogoutAlert(false)}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            cssClass: "secondary",
          },
          {
            text: "Salir",
            handler: () => onLogoutConfirmed(),
          },
        ]}
      />
      <IonLoading isOpen={logoutStatus === "pending"} message={"Saliendo..."} />
    </>
  );
};

export default LogoutButton;
