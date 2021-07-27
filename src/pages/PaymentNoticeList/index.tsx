import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonSearchbar,
  IonFooter,
  IonSegment,
  IonSegmentButton,
  IonContent,
  IonPage,
  IonBackButton,
  IonButtons,
  IonToast,
} from "@ionic/react";
import { checkboxOutline } from "ionicons/icons";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import PaymentNoticeCreateButton from "./components/PaymentNoticeCreateButton";
import PaymentNoticeListByDate from "./components/PaymentNoticeListByDate";
import findPaymentNotices from "../../store/accounting/actions/findPaymentNotices";
import { selectPaymentNoticesGroupedByDate } from "../../store/accounting/selectors/selectPaymentNoticesGroupedByDate";
import { isPlatform } from "@ionic/react";
const PaymentNoticeList: React.FC = () => {
  const paymentNoticesGroupedByDate = useSelector((store: any) =>
    selectPaymentNoticesGroupedByDate(store)
  );

  const dispatch = useDispatch();

  const { paymentNoticesCreateFulfilled } = useSelector(
    (store: any) => store.accounting
  );

  const { segmentSelected } = useSelector(
    (store: any) => store.accounting.paymentNoticesListFilter
  );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text={isPlatform("ios") ? "Contabilidad" : ""}
              default-href="/app/contabilidad"
            />
          </IonButtons>
          <IonTitle>Abonos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <br />
        <section className="ion-padding-horizontal">
          <IonSegment
            onIonChange={(e) => {
              dispatch({
                type: "accounting/updatePaymentNoticesListFilter",
                payload: { segmentSelected: e.detail.value },
              });
              dispatch(findPaymentNotices());
            }}
            value={segmentSelected}
          >
            <IonSegmentButton value="pending">
              <IonLabel>Pendientes</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="fullfiled">
              <IonLabel>Procesados</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </section>
        <br />
        <IonSearchbar
          placeholder="Buscar"
          onIonChange={(e) => {
            dispatch({
              type: "accounting/updatePaymentNoticesListFilter",
              payload: { searchText: e.detail.value },
            });
            dispatch(findPaymentNotices());
          }}
        />
        <PaymentNoticeListByDate
          paymentNoticesGroupedByDate={paymentNoticesGroupedByDate}
        />
      </IonContent>
      <IonFooter>
        <PaymentNoticeCreateButton />
      </IonFooter>
      <IonToast
        isOpen={paymentNoticesCreateFulfilled}
        message="Abonos registrados exitosamente"
        position="bottom"
        onWillDismiss={() =>
          dispatch({
            type: "accounting/setPaymentNoticesCreateFulfilled",
            payload: false,
          })
        }
        duration={6000}
        color="success"
      />
    </IonPage>
  );
};

export default PaymentNoticeList;
