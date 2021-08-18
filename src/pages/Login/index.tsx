import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  IonContent,
  IonPage,
  IonItem,
  IonLabel,
  IonButton,
  IonInput,
  IonImg,
  IonLoading,
  IonIcon,
  IonRow,
  IonCol,
  IonText,
  IonToast,
} from "@ionic/react";

// Actions
import login from "../../store/userAuthentication/actions/login";
// Selectors
import { selectLoginStatus } from "../../store/userAuthentication/selectors/selectLoginStatus";
import { personOutline, shieldOutline } from "ionicons/icons";
import InputErrorMessage from "../../components/InputErrorMessage";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const imgStyle = {
    width: "100px",
    height: "100px",
    margin: "32px auto",
  };

  const loginStatus = useSelector(selectLoginStatus);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "jfcisternasm@gmail.com",
      password: "1735",
    },
  });

  /**
   *
   * @param data
   */
  const onSubmit = async (data: any) => {
    try {
      await dispatch(login(data));
      history.replace("/app/contabilidad");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonPage>
      <IonContent>
        <IonRow style={{ height: "100%" }}>
          <IonCol size="0" size-sm="7" style={{ padding: 0 }}>
            <img
              src="https://bitacora.guardservice.cl/images/login_bg.png"
              alt=""
              style={{ height: "100%", objectFit: "cover" }}
            />
          </IonCol>
          <IonCol size="12" size-sm="5" style={{ padding: 0 }}>
            <IonImg src="assets/gs-logo.png" style={imgStyle} />
            <IonText class="ion-text-center" color="primary">
              <h1>
                <strong>GuardService Admin</strong>
              </h1>
            </IonText>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ padding: 18 }}
              noValidate
            >
              <IonItem lines="inset">
                <IonIcon
                  slot="start"
                  icon={personOutline}
                  class="ion-align-self-end"
                ></IonIcon>
                <IonLabel position="stacked">Usuario</IonLabel>
                <Controller
                  control={control}
                  name="username"
                  render={({ field: { onChange, value } }) => (
                    <IonInput
                      onIonChange={(e) => onChange(e.detail.value)}
                      value={value}
                      {...register("username", {
                        required: "Campo obligatorio.",
                      })}
                    ></IonInput>
                  )}
                />
              </IonItem>
              <InputErrorMessage
                errorMessage={errors.username?.message || ""}
              />

              <IonItem lines="inset">
                <IonIcon
                  slot="start"
                  icon={shieldOutline}
                  class="ion-align-self-end"
                ></IonIcon>
                <IonLabel position="stacked">Contraseña</IonLabel>
                <Controller
                  control={control}
                  name="password"
                  render={({ field: { onChange, value } }) => (
                    <IonInput
                      onIonChange={(e) => onChange(e.detail.value)}
                      value={value}
                      {...register("password", {
                        required: "Campo obligatorio.",
                      })}
                      type="password"
                    ></IonInput>
                  )}
                />
              </IonItem>
              <InputErrorMessage
                errorMessage={errors.password?.message || ""}
              />

              <IonButton type="submit" expand="block" style={{ marginTop: 40 }}>
                Ingresar
              </IonButton>
            </form>
          </IonCol>
        </IonRow>
        <IonLoading
          isOpen={loginStatus === "pending"}
          message={"Ingresando..."}
        />
        <IonToast
          isOpen={loginStatus === "rejected"}
          message="Ingreso fallido"
          position="top"
          onWillDismiss={() =>
            dispatch({
              type: "userAuthentication/setLoginStatus",
              payload: "initial",
            })
          }
          duration={6000}
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
