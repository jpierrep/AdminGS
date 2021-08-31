import React from "react";
import { useSelector } from "react-redux";
import {
  IonItemDivider,
  IonItemGroup,
  IonLabel,
  IonList,
  IonText,
} from "@ionic/react";
// Components
import PaymentNoticeListItem from "./PaymentNoticeListItem";
import PaymentNoticeListSkeletonLoading from "./PaymentNoticeListSkeletonLoading";
// Selectors
import { selectListGroupedByDate } from "../../../store/paymentNotice/selectors/selectListGroupedByDate";
import { selectFindStatus } from "../../../store/paymentNotice/selectors/selectFindStatus";

const PaymentNoticeListByDate: React.FC = () => {
  const paymentNoticesGroupedByDate = useSelector(selectListGroupedByDate);
  const findStatus = useSelector(selectFindStatus);
  return (
    <>
      {findStatus === "pending" && <PaymentNoticeListSkeletonLoading />}
      {findStatus !== "pending" && paymentNoticesGroupedByDate.length === 0 && (
        <p className="ion-text-center" style={{ fontWeight: 300 }}>
          No se han encontrado resultados
        </p>
      )}
      {findStatus !== "pending" && paymentNoticesGroupedByDate.length > 0 && (
        <IonList class="ion-no-padding">
          {paymentNoticesGroupedByDate.map((dateItem) => {
            return (
              <IonItemGroup key={dateItem.dateLabel}>
                <IonItemDivider sticky={true}>
                  <IonLabel>
                    <IonText color="tertiary">
                      <strong>{dateItem.dateLabel}</strong>
                    </IonText>
                  </IonLabel>
                </IonItemDivider>
                {dateItem.items.map((paymentNotice) => (
                  <PaymentNoticeListItem
                    paymentNotice={paymentNotice}
                    key={paymentNotice.id}
                  />
                ))}
              </IonItemGroup>
            );
          })}
        </IonList>
      )}
    </>
  );
};

export default PaymentNoticeListByDate;
