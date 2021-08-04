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
  IonHeader,
  IonImg,
  IonLoading,
  IonTitle,
  IonToolbar,
  IonIcon,
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
      username: "",
      password: "",
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
      <IonHeader>
        <IonToolbar>
          <IonTitle>GuardService Admins</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonImg src="assets/gs-logo.png" style={imgStyle} />
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ padding: 18 }}
          noValidate
        >
          <IonItem>
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
          <InputErrorMessage errorMessage={errors.username?.message || ""} />

          <IonItem>
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
          <InputErrorMessage errorMessage={errors.password?.message || ""} />

          <IonButton type="submit" expand="block" style={{ marginTop: 40 }}>
            Ingresar
          </IonButton>
        </form>
        <IonLoading
          isOpen={loginStatus === "pending"}
          message={"Ingresando..."}
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
