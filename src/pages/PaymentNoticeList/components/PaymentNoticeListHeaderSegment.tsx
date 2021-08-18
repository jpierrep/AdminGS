import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
// Actions
import findPaymentNotices from "../../../store/paymentNotice/actions/findPaymentNotices";
// Selectors
import { selectListFilter } from "../../../store/paymentNotice/selectors/selectListFilter";

const PaymentNoticeListHeaderSegment: React.FC = () => {
  const dispatch = useDispatch();
  const { listSegmentSelected } = useSelector(selectListFilter);
  return (
    <section className="ion-padding-horizontal ion-padding-top">
      <IonSegment
        onIonChange={(e) => {
          dispatch({
            type: "paymentNotice/updatePaymentNoticesListFilter",
            payload: { listSegmentSelected: e.detail.value },
          });
          dispatch(findPaymentNotices());
        }}
        value={listSegmentSelected}
        color="primary"
      >
        <IonSegmentButton value="pending">
          <IonLabel>Pendientes</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="fulfilled">
          <IonLabel>Procesados</IonLabel>
        </IonSegmentButton>
      </IonSegment>
    </section>
  );
};

export default PaymentNoticeListHeaderSegment;
