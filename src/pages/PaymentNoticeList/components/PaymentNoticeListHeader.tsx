import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IonLabel,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
// Actions
import findPaymentNotices from "../../../store/paymentNotice/actions/findPaymentNotices";
// Selectors
import { selectListSegmentSelected } from "../../../store/paymentNotice/selectors/selectListSegmentSelected";

const PaymentNoticeListHeader: React.FC = () => {
  const dispatch = useDispatch();
  const listSegmentSelected = useSelector(selectListSegmentSelected);
  return (
    <>
      <section className="ion-padding-horizontal">
        <IonSegment
          onIonChange={(e) => {
            dispatch({
              type: "paymentNotice/updatePaymentNoticesListFilter",
              payload: { listSegmentSelected: e.detail.value },
            });
            dispatch(findPaymentNotices());
          }}
          value={listSegmentSelected}
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
            type: "paymentNotice/updatePaymentNoticesListFilter",
            payload: { searchText: e.detail.value },
          });
          dispatch(findPaymentNotices());
        }}
      />
    </>
  );
};

export default PaymentNoticeListHeader;
