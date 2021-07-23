import { IonPage, IonRouterOutlet, IonSplitPane } from "@ionic/react";

import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import Menu from "./components/Menu";
import AccountingDashboards from "./pages/AccountingDashboards";
import PaymentNoticeCreate from "./pages/PaymentNoticeCreate";
import PaymentNoticeList from "./pages/PaymentNoticeList";
import PaymentNoticeShow from "./pages/PaymentNoticeShow";
import { UserAuthenticatedAccount } from "./pages/UserAuthenticatedAccount";

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

export default UserAuthenticatedRouter;
