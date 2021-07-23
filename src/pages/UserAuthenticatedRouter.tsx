import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";

import React from "react";
import { Redirect, Route, RouteComponentProps } from "react-router";
import Menu from "../components/Menu";
import AccountingDashboards from "./AccountingDashboards";
import PaymentNoticeCreate from "./PaymentNoticeCreate";
import PaymentNoticeList from "./PaymentNoticeList";
import PaymentNoticeShow from "./PaymentNoticeShow";
import { UserAuthenticatedAccount } from "./UserAuthenticatedAccount";

const UserAuthenticatedRouter: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <IonApp>
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
          <Route render={() => <Redirect to={`${match.url}/contabilidad`} />} />
        </IonRouterOutlet>
      </IonSplitPane>
    </IonApp>
  );
};

export default UserAuthenticatedRouter;
