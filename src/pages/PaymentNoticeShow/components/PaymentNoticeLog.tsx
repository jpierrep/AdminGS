import React from "react";
import { useSelector } from "react-redux";
import { IonItem, IonLabel, IonListHeader, IonText } from "@ionic/react";
// Selectors
import { selectShowData } from "../../../store/paymentNotice/selectors/selectShowData";

const PaymentNoticeLog: React.FC = () => {
  const paymentNoticeShowed = useSelector(selectShowData);

  return (
    <section>
      <IonListHeader>
        <IonLabel>
          <IonText color="tertiary">Actividad</IonText>
        </IonLabel>
      </IonListHeader>
      {paymentNoticeShowed?.log?.length === 0 && (
        <IonItem lines="none">
          <IonLabel>
            <h2 style={{ fontWeight: 200 }}>No se ha registrado actividad</h2>
          </IonLabel>
        </IonItem>
      )}
      {paymentNoticeShowed?.log?.map((logItem, index) => (
        <IonItem key={index}>
          <IonLabel>
            <h2>{logItem.description}</h2>
            <h4 className="ion-text-right">{logItem.createdAtLegible}</h4>
          </IonLabel>
        </IonItem>
      ))}
    </section>
  );
};

export default PaymentNoticeLog;
