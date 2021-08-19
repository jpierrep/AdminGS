import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// Actions
// Selectors
import { chevronBack } from "ionicons/icons";
import { selectShowData } from "../../../store/paymentNotice/selectors/selectShowData";
import currencyFormat from "../../../utils/currencyFormat";

const InvoicesItem: React.FC = () => {
  const paymentNoticeShowed = useSelector(selectShowData);

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <IonItem onClick={() => setShowModal(true)} detail button>
        <IonLabel>
          <p>Facturas pagadas</p>
          <IonText color="primary">
            <strong>
              {paymentNoticeShowed.reconciliations?.map(
                (paymentReconciliationItem, index) => (
                  <span key={index}>
                    #{paymentReconciliationItem.invoice?.identifier || ""}{" "}
                    {index === paymentNoticeShowed.reconciliations?.length && (
                      <span>-</span>
                    )}{" "}
                  </span>
                )
              )}
            </strong>
          </IonText>
        </IonLabel>
      </IonItem>
      <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)}>
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setShowModal(false)}>
                <IonIcon icon={chevronBack}></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle>Facturas pagadas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonListHeader>
              <IonLabel>
                <IonText color="tertiary">
                  <strong>{`${
                    paymentNoticeShowed.reconciliations?.length || 0
                  } facturas`}</strong>
                </IonText>
              </IonLabel>
            </IonListHeader>
            {paymentNoticeShowed.reconciliations?.map(
              (paymentReconciliationItem) => (
                <IonItem key={paymentReconciliationItem.id} lines="none">
                  <IonLabel>
                    <IonText color="primary">
                      <strong>
                        #{paymentReconciliationItem.invoice?.identifier}
                      </strong>
                      <p>
                        Vence{" "}
                        {paymentReconciliationItem.invoice?.expiresAtLegible}
                      </p>
                    </IonText>
                  </IonLabel>
                  <IonNote color="primary">
                    <h4>
                      {currencyFormat(paymentReconciliationItem.amount || 0)}/
                      <IonText color="medium">
                        <small>
                          {currencyFormat(
                            paymentReconciliationItem.invoice?.amount || 0
                          )}
                        </small>
                      </IonText>
                    </h4>
                  </IonNote>
                </IonItem>
              )
            )}

            <IonItem lines="none">
              <IonLabel>Total</IonLabel>
              <IonNote>
                {currencyFormat(paymentNoticeShowed.amount || 0)}
              </IonNote>
            </IonItem>
          </IonList>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default InvoicesItem;
