import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import UserAuthenticatedRouter from "./UserAuthenticatedRouter";
import { Login } from "./pages/Login";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import { useSelector } from "react-redux";
import { IonApp, IonPage, IonRouterOutlet } from "@ionic/react";

const App: React.FC = () => {
  const { user } = useSelector((store: any) => store.userAuthentication);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/app"
            render={(props) => {
              return user ? (
                <UserAuthenticatedRouter {...props} />
              ) : (
                <Redirect to="/ingresar" />
              );
            }}
          ></Route>
          <Route path="/ingresar" component={Login}></Route>
          <Redirect to="/app/contabilidad" />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
