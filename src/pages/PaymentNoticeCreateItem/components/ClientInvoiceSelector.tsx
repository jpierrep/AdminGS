import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonModal,
  IonNote,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  isPlatform,
} from "@ionic/react";
// Selectors
import { selectCreateFormDataItem } from "../../../store/paymentNotice/selectors/selectCreateFormDataItem";
import { Invoice } from "../../../@types/invoice";
import currencyFormat from "../../../utils/currencyFormat";
import { chevronBack } from "ionicons/icons";

const ClientInvoiceSelector: React.FC = () => {
  const createFormDataItem: any = useSelector(selectCreateFormDataItem);
  const dispatch = useDispatch();

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

  const updateInvoices = () => {};

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <IonItem
        onClick={() => setShowModal(true)}
        detail={true}
        disabled={!createFormDataItem.client}
        button
      >
        <IonLabel>
          <p>Facturas</p>
          <IonText color="primary">
            <strong>
              {createFormDataItem.client?.invoices
                ?.filter(({ checked }: any) => checked)
                .map((invoice: any) => (
                  <span key={invoice.identifier}>#{invoice.identifier} </span>
                ))}

              {!createFormDataItem.client &&
                "Seleccione un cliente para ver facturas"}

              {createFormDataItem.client &&
                (createFormDataItem.client?.invoices || []).filter(
                  ({ checked }: any) => checked
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
            <IonButtons slot="end">
              <IonButton
                onClick={() => {
                  updateInvoices();
                  setShowModal(false);
                }}
              >
                Listo
              </IonButton>
            </IonButtons>
          </IonToolbar>
          <IonSearchbar placeholder="Buscar" />
        </IonHeader>
        <IonContent>
          <IonList>
            <IonListHeader>
              <IonLabel>
                {`${createFormDataItem.client?.invoices?.length || 0} facturas`}
              </IonLabel>
            </IonListHeader>
            {createFormDataItem.client?.invoices &&
              createFormDataItem.client?.invoices?.map(
                (invoice: Invoice, index: number) => (
                  <IonItem key={index} lines="none">
                    <IonCheckbox
                      slot="start"
                      checked={invoice.checked}
                      onIonChange={(e) =>
                        setInvoiceChecked(invoice, e.detail.checked)
                      }
                    />
                    <IonLabel>
                      <h3>
                        <strong>#{invoice.identifier}</strong>
                      </h3>
                      <h4>{invoice.expiresAtLegible}</h4>
                    </IonLabel>
                    <IonNote slot="end">
                      <IonLabel>
                        <h3>{currencyFormat(invoice.pendingAmount || 0)}</h3>
                      </IonLabel>
                    </IonNote>
                  </IonItem>
                )
              )}

            {!createFormDataItem.client?.invoices && (
              <p className="ion-margin-start" style={{ fontWeight: 200 }}>
                No hay facturas pendientes
              </p>
            )}
          </IonList>
        </IonContent>
        <IonFooter>
          <h3 className="ion-text-right ion-padding-end">
            {currencyFormat(createFormDataItem.invoiceTotalAmount)}
          </h3>
        </IonFooter>
      </IonModal>
    </div>
  );
};

export default ClientInvoiceSelector;
