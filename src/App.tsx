import { IonReactRouter } from "@ionic/react-router";
import { Login } from "./pages/Login";
import { IonSplitPane } from "@ionic/react";

import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import Menu from "./layout/Menu";
import AccountingDashboards from "./pages/AccountingDashboards";
import PaymentNoticeCreate from "./pages/PaymentNoticeCreate";
import PaymentNoticeList from "./pages/PaymentNoticeList";
import PaymentNoticeShow from "./pages/PaymentNoticeShow";
import { UserAuthenticatedAccount } from "./pages/UserAuthenticatedAccount";

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
import { isAuthenticated } from "./store/userAuthentication/selectors/isAuthenticated";

const UserAuthenticatedRouter: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonPage>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Route path={`${match.url}/mi-cuenta`} exact={true}>
            <UserAuthenticatedAccount />
          </Route>
          <Route path={`${match.url}/contabilidad`} exact={true}>
            <AccountingDashboards />
          </Route>
          <Route path={`${match.url}/contabilidad/abonos`} exact={true}>
            <PaymentNoticeList />
          </Route>
          <Route path={`${match.url}/contabilidad/abonos/agregar`} exact={true}>
            <PaymentNoticeCreate />
          </Route>
          <Route
            path={`${match.url}/contabilidad/abonos/detalle/:id`}
            exact={true}
          >
            <PaymentNoticeShow />
          </Route>
          {/* <Redirect exact from={match.url} to={`${match.url}/contabilidad`} /> */}
        </IonRouterOutlet>
      </IonSplitPane>
    </IonPage>
  );
};

const App: React.FC = () => {
  const redirectToLogin = useSelector(isAuthenticated);

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route
            path="/app"
            render={(props) => {
              return redirectToLogin ? (
                <Redirect to="/ingresar" />
              ) : (
                <UserAuthenticatedRouter {...props} />
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
