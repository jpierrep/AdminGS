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

import PaymentNoticeCreateButton from "../components/PaymentNoticeCreateButton";
import PaymentNoticeListByDate from "../components/PaymentNoticeListByDate";
import findPaymentNotices from "../store/accounting/actions/findPaymentNotices";
import { selectPaymentNoticesGroupedByDate } from "../store/accounting/selectors/selectPaymentNoticesGroupedByDate";

const PaymentNoticeList: React.FC = () => {
  const paymentNoticesGroupedByDate = useSelector((store: any) =>
    selectPaymentNoticesGroupedByDate(store)
  );

  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState();
  const { paymentNoticesCreateFulfilled } = useSelector(
    (store: any) => store.accounting
  );
  useEffect(() => {
    dispatch(findPaymentNotices());
  }, [dispatch, searchText]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text="Contabilidad"
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
            onIonChange={(e) => console.log("Segment selected", e.detail.value)}
          >
            <IonSegmentButton value="Pendientes">
              <IonLabel>Pendientes</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="Procesados">
              <IonLabel>Procesados</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </section>
        <br />
        <IonSearchbar placeholder="Buscar" />
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
        duration={6000}
        color="success"
      />
    </IonPage>
  );
};

export default PaymentNoticeList;
