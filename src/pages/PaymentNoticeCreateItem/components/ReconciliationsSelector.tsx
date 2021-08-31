import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IonButton,
  IonButtons,
  IonCard,
  IonCheckbox,
  IonCol,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonListHeader,
  IonModal,
  IonNote,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
// Selectors
import { selectCreateFormDataItem } from "../../../store/paymentNotice/selectors/selectCreateFormDataItem";
// Types
import { Invoice } from "../../../@types/invoice";
// Utils
import currencyFormat from "../../../utils/currencyFormat";
// Icons
import { cashOutline, chevronBack } from "ionicons/icons";

const ReconciliationsSelector: React.FC = () => {
  const dispatch = useDispatch();
  const createFormDataItem: any = useSelector(selectCreateFormDataItem);
  const [showModal, setShowModal] = useState(false);

  const setInvoiceChecked = (invoice: Invoice, checked: boolean) => {
    if (checked === undefined) {
      return console.log("checked no enviado");
    }
    dispatch({
      type: "paymentNotice/updatePaymentNoticesCreateFormDataItem",
      payload: {
        client: {
          ...createFormDataItem.client,
          invoices: createFormDataItem.client?.invoices?.map((item: any) =>
            item.id === invoice.id ? { ...invoice, checked } : item
          ),
        },
      },
    });
  };

  const setInvoicePayedAmount = (
    invoice: Invoice,
    payedAmountAtCurrentPaymentNotice: number
  ) => {
    dispatch({
      type: "paymentNotice/updatePaymentNoticesCreateFormDataItem",
      payload: {
        client: {
          ...createFormDataItem.client,
          invoices: createFormDataItem.client?.invoices?.map((item: any) =>
            item.id === invoice.id
              ? { ...invoice, payedAmountAtCurrentPaymentNotice }
              : item
          ),
        },
      },
    });
  };
  return (
    <div>
      <IonItem
        onClick={() => setShowModal(true)}
        detail={true}
        disabled={!createFormDataItem.client}
        button
        lines="none"
      >
        <IonLabel>
          <p>Facturas</p>
          <IonText color="primary">
            <strong>
              {!createFormDataItem.client &&
                "Seleccione un cliente para ver facturas"}

              {(createFormDataItem.client?.invoices || [])
                .filter(
                  ({ payedAmountAtCurrentPaymentNotice }: any) =>
                    payedAmountAtCurrentPaymentNotice
                )
                .map((invoice: any) => (
                  <span key={invoice.identifier}>#{invoice.identifier} </span>
                ))}
              {createFormDataItem.client &&
                (createFormDataItem.client?.invoices || []).filter(
                  ({ payedAmountAtCurrentPaymentNotice }: any) =>
                    payedAmountAtCurrentPaymentNotice > 0
                ).length === 0 &&
                "Seleccionar facturas"}
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
            <IonTitle>Seleccionar Facturas</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <br />
          <IonListHeader>
            <IonLabel class="ion-padding-end ion-padding-vertical">
              <strong>
                {`${createFormDataItem.client?.name} tiene ${
                  createFormDataItem.client?.invoices?.length || 0
                } facturas pendientes`}
              </strong>
            </IonLabel>
          </IonListHeader>
          {createFormDataItem.client?.invoices &&
            createFormDataItem.client?.invoices?.map(
              (invoice: Invoice, index: number) => (
                <IonCard key={index} class="ion-margin-bottom">
                  <IonItem lines="full" color="secondary">
                    <IonLabel>
                      <strong>Factura #{invoice.identifier}</strong>
                    </IonLabel>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>
                      <p>Vencimiento</p>
                      <h2>
                        <strong>{invoice.expiresAtLegible}</strong>
                      </h2>
                    </IonLabel>
                  </IonItem>
                  <IonRow>
                    <IonCol size="6" class="ion-no-padding">
                      <IonItem lines="none">
                        <IonLabel>
                          <p>Monto factura</p>
                          <h2>
                            <strong>
                              {currencyFormat(invoice.amount || 0)}
                            </strong>
                          </h2>
                        </IonLabel>
                      </IonItem>
                    </IonCol>
                    <IonCol size="6" class="ion-no-padding">
                      <IonItem lines="none">
                        <IonLabel>
                          <p>Monto pendiente</p>
                          <h2>
                            <strong>
                              {currencyFormat(invoice.pendingAmount || 0)}
                            </strong>
                          </h2>
                        </IonLabel>
                      </IonItem>
                    </IonCol>
                  </IonRow>

                  <IonItem
                    color="medium"
                    style={{
                      marginTop: "11px",
                    }}
                    lines="none"
                  >
                    <IonLabel position="fixed">
                      <p>
                        <strong>Abonar</strong>
                      </p>
                    </IonLabel>
                    <IonInput
                      value={invoice.payedAmountAtCurrentPaymentNotice}
                      min="0"
                      max={invoice.pendingAmount?.toString()}
                      onIonChange={(e) => {
                        setInvoicePayedAmount(
                          invoice,
                          parseInt(e.detail.value || "0")
                        );
                      }}
                      class="ion-text-right"
                      style={{ fontWeight: "600" }}
                    ></IonInput>
                  </IonItem>
                </IonCard>
              )
            )}

          {!createFormDataItem.client?.invoices && (
            <p className="ion-margin-start" style={{ fontWeight: 200 }}>
              No hay facturas pendientes
            </p>
          )}
        </IonContent>
        <IonFooter>
          <IonItem lines="none">
            <IonLabel>
              <strong>Total abono</strong>
            </IonLabel>
            <IonNote slot="end" color="primary" style={{ fontSize: "17px" }}>
              <strong>{currencyFormat(createFormDataItem.amount)}</strong>
            </IonNote>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>
              <strong>Facturas ingresadas</strong>
            </IonLabel>
            <IonNote slot="end" color="primary" style={{ fontSize: "17px" }}>
              <strong>
                {currencyFormat(createFormDataItem.invoiceTotalAmount)}
              </strong>
            </IonNote>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>
              <strong>Saldo abono</strong>
            </IonLabel>
            <IonNote
              slot="end"
              color={
                createFormDataItem.amount -
                  createFormDataItem.invoiceTotalAmount >
                0
                  ? "danger"
                  : "success"
              }
              style={{ fontSize: "17px" }}
            >
              <strong>
                {currencyFormat(
                  createFormDataItem.amount -
                    createFormDataItem.invoiceTotalAmount
                )}
              </strong>
            </IonNote>
          </IonItem>
        </IonFooter>
      </IonModal>
    </div>
  );
};

export default ReconciliationsSelector;
