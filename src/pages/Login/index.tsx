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
// Actions
import login from "../../store/userAuthentication/actions/login";
// Selectors
import { selectLoginStatus } from "../../store/userAuthentication/selectors/selectLoginStatus";

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

  const loginStatus = useSelector(selectLoginStatus);

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
              <IonInput
                value={authFormData.username}
                onIonChange={(e) =>
                  setAuthFormData({
                    ...authFormData,
                    username: e.detail.value || "",
                  })
                }
              ></IonInput>
            </IonItem>

            <IonItem lines="inset">
              <IonIcon
                class="ion-align-self-end"
                slot="start"
                icon={shieldOutline}
              />
              <IonLabel position="stacked">Contraseña</IonLabel>
              <IonInput
                value={authFormData.password}
                onIonChange={(e) =>
                  setAuthFormData({
                    ...authFormData,
                    password: e.detail.value || "",
                  })
                }
              ></IonInput>
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

      <IonLoading
        isOpen={loginStatus === "pending"}
        message={"Ingresando..."}
      />
    </IonPage>
  );
};
