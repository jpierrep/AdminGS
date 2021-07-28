import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  IonLabel,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
// Actions
import findPaymentNotices from "../../../store/accounting/actions/findPaymentNotices";
// Selectors
import { selectSegmentSelected } from "../../../store/accounting/selectors/selectSegmentSelected";

const PaymentNoticeListHeader: React.FC = () => {
  const dispatch = useDispatch();
  const segmentSelected: string = useSelector(selectSegmentSelected);
  return (
    <>
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
    </>
  );
};

export default PaymentNoticeListHeader;
