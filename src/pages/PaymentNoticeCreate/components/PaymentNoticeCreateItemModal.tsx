import {
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonList,
  IonListHeader,
  IonNote,
  IonButton,
  IonButtons,
  IonModal,
  IonSelect,
  IonSelectOption,
  IonContent,
  IonFooter,
  IonCheckbox,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Actions
import findClients from "../../../store/clients/actions/findClients";
// Selectors
import { selectPaymentNoticesCreateFormDataItemEditing } from "../../../store/paymentNotice/selectors/selectPaymentNoticesCreateFormDataItemEditing";
import { selectClients } from "../../../store/clients/selectors/selectClients";
import { selectPaymentNoticesCreateFormDataItem } from "../../../store/paymentNotice/selectors/selectPaymentNoticesCreateFormDataItem";
// Utils
import currencyFormat from "../../../utils/currencyFormat";
// Types
import { Invoice } from "../../../@types/invoice";

const PaymentNoticeCreateItemModal: React.FC = () => {
  const dispatch = useDispatch();

  const clients = useSelector(selectClients);
  const paymentNoticesCreateFormDataItemEditing = useSelector(
    selectPaymentNoticesCreateFormDataItemEditing
  );
  const paymentNoticesCreateFormDataItem = useSelector(
    selectPaymentNoticesCreateFormDataItem
  );

  const setClient = (clientSelected: number) => {
    dispatch({
      type: "paymentNotice/updatePaymentNoticesCreateFormDataItem",
      payload: {
        client: clients.find(({ id }: any) => id === clientSelected),
      },
    });
  };

  useEffect(() => {
    dispatch(findClients());
  }, [dispatch]);

  const Modal = () => (
    <IonModal isOpen={paymentNoticesCreateFormDataItemEditing}>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton
              onClick={() =>
                dispatch({
                  type: "paymentNotice/hidePaymentNoticeItemEditForm",
                })
              }
            >
              Volver
            </IonButton>
          </IonButtons>
          <IonTitle>Editar Abono</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() =>
                dispatch({
                  type: "paymentNotice/confirmUpdatePaymentNoticesCreateFormDataItem",
                })
              }
            >
              Listo
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem>
            <IonLabel>
              <strong>Fecha</strong>
            </IonLabel>
            <IonNote slot="end">
              {paymentNoticesCreateFormDataItem.payedAtLegible}
            </IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Descripción</strong>
            </IonLabel>
            <IonNote slot="end">
              {paymentNoticesCreateFormDataItem.description}
            </IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Pagado</strong>
            </IonLabel>
            <IonNote slot="end">
              {currencyFormat(paymentNoticesCreateFormDataItem.amount || 0)}
            </IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Cliente</strong>
            </IonLabel>
            <IonSelect
              value={paymentNoticesCreateFormDataItem.client?.id}
              placeholder="Seleccionar"
              onIonChange={(e) => setClient(e.detail.value)}
            >
              {clients.map((client, index: number) => (
                <IonSelectOption value={client.id} key={index}>
                  {client.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonListHeader>
            <IonLabel>
              <strong>Facturas pendientes</strong>
            </IonLabel>
          </IonListHeader>
          <section>
            {paymentNoticesCreateFormDataItem.client?.invoices?.map(
              (invoice: Invoice, index: number) => (
                <IonItem key={index}>
                  <IonCheckbox slot="start" />
                  <IonLabel>#{invoice.identifier}</IonLabel>
                  <IonNote slot="end">
                    <IonLabel>{currencyFormat(invoice.amount || 0)}</IonLabel>
                  </IonNote>
                </IonItem>
              )
            )}
          </section>
        </IonList>
        <IonFooter>
          <IonItem lines="none">
            <IonLabel>
              <strong>Total</strong>
            </IonLabel>
            <IonNote slot="end">
              <IonLabel>$12.000.000</IonLabel>
            </IonNote>
          </IonItem>
        </IonFooter>
      </IonContent>
    </IonModal>
  );

  return <Modal />;
};

export default PaymentNoticeCreateItemModal;
