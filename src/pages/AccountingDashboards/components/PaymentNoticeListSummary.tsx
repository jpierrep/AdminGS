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
import findPaymentNotices from "../../../store/accounting/actions/findPaymentNotices";
import { selectPaymentNoticesGroupedByDateLatest } from "../../../store/accounting/selectors/selectPaymentNoticesGroupedByDateLatest";
import currencyFormat from "../../../utils/currencyFormat";

const PaymentNoticeListSummary: React.FC = () => {
  const paymentNoticesGroupedByDate = useSelector(
    selectPaymentNoticesGroupedByDateLatest
  );
  const dispatch = useDispatch();

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

      {paymentNoticesGroupedByDate.length === 0 && (
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
      <IonSlides pager={true}>
        {paymentNoticesGroupedByDate.map(
          (paymentNotice: any, index: number) => (
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
                    {currencyFormat(paymentNotice.amount)}
                  </IonNote>
                </IonItem>
              </IonCard>
            </IonSlide>
          )
        )}
      </IonSlides>
    </section>
  );
};

export default PaymentNoticeListSummary;