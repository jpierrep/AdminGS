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
  IonSelect,
  IonSelectOption,
  IonContent,
  IonFooter,
  IonCheckbox,
  IonPage,
  IonBackButton,
  isPlatform,
} from "@ionic/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Actions
import findClients from "../../store/clients/actions/findClients";
// Selectors
import { selectClients } from "../../store/clients/selectors/selectClients";
import { selectCreateFormDataItem } from "../../store/paymentNotice/selectors/selectCreateFormDataItem";
// Utils
import currencyFormat from "../../utils/currencyFormat";
// Types
import { Invoice } from "../../@types/invoice";

const PaymentNoticeCreateItem: React.FC = () => {
  const dispatch = useDispatch();

  const clients = useSelector(selectClients);
  const createFormDataItem = useSelector(selectCreateFormDataItem);

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton
              text={isPlatform("ios") ? "Cancelar" : ""}
              default-href="/app/contabilidad/abonos/agregar"
            />
          </IonButtons>
          <IonTitle>Editar Abono</IonTitle>
          <IonButtons slot="end">
            <IonButton
              onClick={() =>
                dispatch({
                  type: "paymentNotice/confirmUpdatePaymentNoticesCreateFormDataItem",
                })
              }
              routerLink={`/app/contabilidad/abonos/agregar`}
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
            <IonNote slot="end">{createFormDataItem.payedAtLegible}</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Descripción</strong>
            </IonLabel>
            <IonNote slot="end">{createFormDataItem.description}</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Pagado</strong>
            </IonLabel>
            <IonNote slot="end">
              {currencyFormat(createFormDataItem.amount || 0)}
            </IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>
              <strong>Cliente</strong>
            </IonLabel>
            <IonSelect
              value={createFormDataItem.client?.id}
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
            {createFormDataItem.client?.invoices?.map(
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
    </IonPage>
  );
};

export default PaymentNoticeCreateItem;
