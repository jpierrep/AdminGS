import { IonReactRouter } from "@ionic/react-router";
import { IonSplitPane } from "@ionic/react";

import React from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router";
import Menu from "./layout/Menu";
// Pages
import AccountingDashboards from "./pages/AccountingDashboards";
import PaymentNoticeCreate from "./pages/PaymentNoticeCreate";
import PaymentNoticeList from "./pages/PaymentNoticeList";
import PaymentNoticeShow from "./pages/PaymentNoticeShow";
import { UserAuthenticatedAccount } from "./pages/UserAuthenticatedAccount";
import PaymentNoticeCreateItem from "./pages/PaymentNoticeCreateItem";
import Login from "./pages/Login";

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
import { selectLoginStatus } from "./store/userAuthentication/selectors/selectLoginStatus";

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
            path={`${match.url}/contabilidad/abonos/agregar/abono`}
            exact={true}
          >
            <PaymentNoticeCreateItem />
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
  const loginStatus = useSelector(selectLoginStatus);

  return (
    <IonApp>
      <IonReactRouter>
        <Switch>
          <Route
            path="/app"
            render={(props) => {
              return loginStatus !== "fulfilled" ? (
                <Redirect to="/ingresar" />
              ) : (
                <UserAuthenticatedRouter {...props} />
              );
            }}
          ></Route>
          <Route path="/ingresar" component={Login}></Route>
          <Redirect to="/app/contabilidad" />
        </Switch>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
