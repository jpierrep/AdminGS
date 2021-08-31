import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// Actions
// Selectors
import { arrowBack, chevronBack } from "ionicons/icons";
import { selectShowData } from "../../../store/paymentNotice/selectors/selectShowData";
import currencyFormat from "../../../utils/currencyFormat";

const InvoicesItem: React.FC = () => {
  const paymentNoticeShowed = useSelector(selectShowData);

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <IonItem onClick={() => setShowModal(true)} detail button lines="none">
        <IonLabel>
          <p>Facturas abonadas</p>
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
                <IonIcon icon={arrowBack}></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle>Facturas abonadas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonListHeader>
              <IonLabel>
                <IonText color="tertiary">
                  <strong>
                    {`Hay ${
                      paymentNoticeShowed.reconciliations?.length || 0
                    } facturas asociadas al abono`}
                  </strong>
                </IonText>
              </IonLabel>
            </IonListHeader>
            {paymentNoticeShowed.reconciliations?.map(
              (paymentReconciliationItem) => (
                <IonCard key={paymentReconciliationItem.id}>
                  <IonItem lines="full" color="secondary">
                    <IonLabel>
                      <strong>
                        Factura #{paymentReconciliationItem.invoice?.identifier}
                      </strong>
                    </IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>
                      <p>Vencimiento</p>
                      <strong>
                        {paymentReconciliationItem.invoice?.expiresAtLegible}
                      </strong>
                    </IonLabel>
                  </IonItem>
                  <IonRow>
                    <IonCol size="6" class="ion-no-padding">
                      <IonItem lines="none">
                        <IonLabel>
                          <p>Monto factura</p>
                          <strong>
                            {currencyFormat(
                              paymentReconciliationItem.invoice?.amount || 0
                            )}
                          </strong>
                        </IonLabel>
                      </IonItem>
                    </IonCol>
                    <IonCol size="6" class="ion-no-padding">
                      <IonItem lines="none" class="ion-margin-bottom">
                        <IonLabel>
                          <p>Monto abonado</p>
                          <strong>
                            {currencyFormat(
                              paymentReconciliationItem.amount || 0
                            )}
                          </strong>
                        </IonLabel>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                </IonCard>
              )
            )}

            {/*             <IonItem lines="none">
              <IonLabel>Total</IonLabel>
              <IonNote>
                {currencyFormat(paymentNoticeShowed.amount || 0)}
              </IonNote>
            </IonItem> */}
          </IonList>
        </IonContent>
      </IonModal>
    </div>
  );
};

export default InvoicesItem;
