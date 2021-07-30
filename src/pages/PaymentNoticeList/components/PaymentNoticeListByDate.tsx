import React from "react";
import { useSelector } from "react-redux";
import { IonItemDivider, IonItemGroup, IonLabel, IonList } from "@ionic/react";
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
        <p className="ion-text-center">No se han encontrado resultados</p>
      )}
      {findStatus !== "pending" && paymentNoticesGroupedByDate.length > 0 && (
        <IonList>
          {paymentNoticesGroupedByDate.map((dateItem) => {
            return (
              <IonItemGroup key={dateItem.dateLabel}>
                <IonItemDivider color="transparent">
                  <IonLabel>
                    <strong>{dateItem.dateLabel}</strong>
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
