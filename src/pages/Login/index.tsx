import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonIcon,
  IonButton,
  IonImg,
  IonFooter,
  IonLoading,
} from "@ionic/react";

import { personOutline, shieldOutline } from "ionicons/icons";
import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router";
import login from "../../store/userAuthentication/actions/login";

export const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [authFormData, setAuthFormData] = useState({
    username: "",
    password: "",
  });

  const imgStyle = {
    width: "100px",
    height: "100px",
    margin: "32px auto",
  };

  const { loginPending } = useSelector(
    (store: any) => store.userAuthentication
  );

  const onLogin = async () => {
    try {
      await dispatch(login(authFormData));
      history.replace("/app/contabilidad");
    } catch (error) {
      console.log(error);
    }
  };

  const maxWidthLimited = {
    width: "500px",
    maxWidth: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GuardService Admins</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <section style={maxWidthLimited}>
          <IonImg src="assets/gs-logo.png" style={imgStyle} />
          <IonList>
            <IonItem lines="inset">
              <IonIcon
                class="ion-align-self-end"
                slot="start"
                icon={personOutline}
              />
              <IonLabel position="stacked">Usuario</IonLabel>
              <IonInput value={authFormData.username}></IonInput>
            </IonItem>

            <IonItem lines="inset">
              <IonIcon
                class="ion-align-self-end"
                slot="start"
                icon={shieldOutline}
              />
              <IonLabel position="stacked">Contraseña</IonLabel>
              <IonInput value={authFormData.password}></IonInput>
            </IonItem>
          </IonList>
        </section>
      </IonContent>
      <IonFooter>
        <IonButton
          expand="block"
          color="primary"
          onClick={() => onLogin()}
          style={maxWidthLimited}
        >
          Ingresar
        </IonButton>
      </IonFooter>

      <IonLoading isOpen={loginPending} message={"Ingresando..."} />
    </IonPage>
  );
};
