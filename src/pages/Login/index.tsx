import React, { useState } from "react";
import { useForm } from "react-hook-form";
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
} from "@ionic/react";

// Actions
import login from "../../store/userAuthentication/actions/login";
// Selectors
import { selectLoginStatus } from "../../store/userAuthentication/selectors/selectLoginStatus";

let initialValues = {
  username: "",
  password: "",
};

let renderCount = 0;

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const imgStyle = {
    width: "100px",
    height: "100px",
    margin: "32px auto",
  };

  const loginStatus = useSelector(selectLoginStatus);

  const onLogin = async (data: {}) => {
    try {
      await dispatch(login(data));
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

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { ...initialValues },
    delayError: 500,
    mode: "onChange",
  });

  const [data, setData] = useState();

  renderCount++;

  /**
   *
   * @param _fieldName
   */
  const showError = (errorMessage?: string) => {
    return (
      errorMessage && (
        <div
          style={{
            color: "red",
            padding: 5,
            paddingLeft: 12,
            fontSize: "smaller",
          }}
        >
          {errorMessage}
        </div>
      )
    );
  };

  /**
   *
   * @param data
   */
  const onSubmit = (data: any) => {
    onLogin(data);
  };

  console.log(errors);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GuardService Admins</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <form onSubmit={handleSubmit(onSubmit)} style={{ padding: 18 }}>
          <span className="counter">Render Count: {renderCount}</span>
          <IonImg src="assets/gs-logo.png" style={imgStyle} />

          <IonItem>
            <IonLabel position="stacked">Usuario</IonLabel>
            <IonInput
              {...register("username", {
                required: "Campo obligatorio.",
              })}
              name="username"
            ></IonInput>
          </IonItem>
          {showError(errors.username?.message)}

          <IonItem>
            <IonLabel position="stacked">Contraseña</IonLabel>
            <IonInput
              {...register("password", {
                required: "Campo obligatorio.",
              })}
              type="password"
              name="password"
            ></IonInput>
          </IonItem>
          {showError(errors.password?.message)}

          <br />

          <IonButton type="submit" expand="block">
            Ingresar
          </IonButton>
          <IonLoading
            isOpen={loginStatus === "pending"}
            message={"Ingresando..."}
          />
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
