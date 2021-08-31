import {
  IonButton,
  IonCard,
  IonItem,
  IonLabel,
  IonListHeader,
  IonNote,
  IonText,
} from "@ionic/react";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Actions
import findPaymentNotices from "../../../store/paymentNotice/actions/findPaymentNotices";
// Selectors
import { selectListLatest } from "../../../store/paymentNotice/selectors/selectListLatest";
// Utils
import currencyFormat from "../../../utils/currencyFormat";

const PaymentNoticeListSummary: React.FC = () => {
  const dispatch = useDispatch();
  const listLatest = useSelector(selectListLatest);
  useEffect(() => {
    dispatch(findPaymentNotices());
  }, [dispatch]);
  return (
    <section className="ion-margin-vertical">
      <IonListHeader>
        <IonLabel>
          <IonText color="tertiary">
            <strong>Abonos</strong>
          </IonText>
        </IonLabel>
        <IonButton
          routerLink="/app/contabilidad/abonos"
          color="secondary"
          class="ion-margin-right"
        >
          <strong>Ver todos</strong>
        </IonButton>
      </IonListHeader>

      {listLatest.length === 0 && (
        <IonCard style={{ height: "130px" }}>
          <IonItem lines="none">
            <IonLabel>
              <p> No hay abonos registrados</p>
            </IonLabel>
          </IonItem>
        </IonCard>
      )}
      {listLatest.length > 0 && (
        <section
          style={{
            display: "flex",
            scrollSnapType: "x mandatory",
            overflow: "auto",
          }}
        >
          {listLatest.map((paymentNotice, index) => (
            <article
              key={index}
              style={{
                scrollSnapAlign: "center",
                width: "400px",
                maxWidth: "90%",
              }}
            >
              <IonCard
                routerLink={`/app/contabilidad/abonos/detalle/${paymentNotice.id}`}
                color="primary"
              >
                <IonItem
                  lines="none"
                  color="primary"
                  class="ion-margin-vertical"
                >
                  <IonLabel>
                    <p>{paymentNotice.payedAtLegible}</p>
                    <h3>
                      <strong>
                        {paymentNotice.client?.name || "No identificado"}
                      </strong>
                    </h3>
                    <h3>
                      <strong>
                        {paymentNotice.company?.name}
                      </strong>
                    </h3>
                  </IonLabel>
                  <IonNote slot="end" color="light">
                    <h6>{currencyFormat(paymentNotice.amount || 0)}</h6>
                  </IonNote>
                </IonItem>
              </IonCard>
            </article>
          ))}
        </section>
      )}
    </section>
  );
};

export default PaymentNoticeListSummary;
