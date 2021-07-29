import {
  IonButton,
  IonCard,
  IonItem,
  IonLabel,
  IonListHeader,
  IonNote,
  IonSlide,
  IonSlides,
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
    <section>
      <IonListHeader>
        <IonLabel>
          <strong>Últimos abonos</strong>
        </IonLabel>
        <IonButton routerLink="/app/contabilidad/abonos">Ver todos</IonButton>
      </IonListHeader>

      {listLatest.length === 0 && (
        <IonCard
          style={{ height: "130px" }}
          routerLink={`/app/contabilidad/abonos`}
        >
          <IonItem lines="none">
            <IonLabel>
              <p> No hay abonos registrados</p>
            </IonLabel>
          </IonItem>
        </IonCard>
      )}
      {listLatest.length > 0 && (
        <IonSlides pager={true}>
          {listLatest.map((paymentNotice, index) => (
            <IonSlide key={index} style={{ height: "130px" }}>
              <IonCard
                style={{ width: "100%" }}
                routerLink={`/app/contabilidad/abonos/detalle/${paymentNotice.id}`}
              >
                <IonItem lines="none">
                  <IonLabel>
                    <p>{paymentNotice.payedAtLegible}</p>
                    <h1>
                      <strong>
                        {paymentNotice.client?.name || "No identificado"}
                      </strong>
                    </h1>
                  </IonLabel>
                  <IonNote slot="end">
                    {currencyFormat(paymentNotice.amount || 0)}
                  </IonNote>
                </IonItem>
              </IonCard>
            </IonSlide>
          ))}
        </IonSlides>
      )}
    </section>
  );
};

export default PaymentNoticeListSummary;
