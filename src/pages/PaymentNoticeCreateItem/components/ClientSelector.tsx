import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  IonButton,
  IonButtons,
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
} from "@ionic/react";
// Selectors
import { selectCreateFormDataItem } from "../../../store/paymentNotice/selectors/selectCreateFormDataItem";
import { checkmarkOutline, chevronBack, chevronDown } from "ionicons/icons";
import { selectClientSelectorSearchText } from "../../../store/paymentNotice/selectors/selectClientSelectorSearchText";
import findPendingInvoicesByClientIdentifier from "../../../store/paymentNotice/actions/findPendingInvoicesByClientIdentifier";
import { Client } from "../../../@types/client";
import { selectClients } from "../../../store/paymentNotice/selectors/selectClients";

const ClientSelector: React.FC = () => {
  const clients = useSelector(selectClients);
  const createFormDataItem = useSelector(selectCreateFormDataItem);
  const searchText = useSelector(selectClientSelectorSearchText);
  const dispatch = useDispatch();

  const selectClient = (clientSelected: Client) => {
    setShowModal(false);
    dispatch({
      type: "paymentNotice/updatePaymentNoticesCreateFormDataItem",
      payload: {
        client: clientSelected,
      },
    });

    dispatch(
      findPendingInvoicesByClientIdentifier(clientSelected?.identifier || "")
    );
  };
  /*   const [clientSelected, setClientSelected] = useState(
    createFormDataItem.client
  ); */

  /*   useEffect(() => {
    setClientSelected(createFormDataItem.client);
  }, [createFormDataItem]); */

  /*   const preselectClient = (client: any) => {
    setClientSelected(client);
  }; */

  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <IonItem
        onClick={() => setShowModal(true)}
        detail={true}
        button
        lines="none"
      >
        <IonLabel class="ion-text-wrap">
          <p>Cliente</p>
          <h2>
            <strong>
              <IonText color="primary">
                {createFormDataItem.client?.name || "No has seleccionado a??n"}
              </IonText>
            </strong>
          </h2>
          <p>{createFormDataItem.client?.identifierFormatted}</p>
        </IonLabel>
      </IonItem>
      <IonModal
        isOpen={showModal}
        onDidDismiss={() => {
          setShowModal(false);
          dispatch({
            type: "paymentNotice/updateClientSelectorSearchText",
            payload: "",
          });
        }}
      >
        <IonHeader translucent>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => setShowModal(false)}>
                <IonIcon icon={chevronBack}></IonIcon>
              </IonButton>
            </IonButtons>
            <IonTitle>Seleccionar Cliente</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSearchbar
            placeholder="Buscar"
            value={searchText}
            onIonChange={(e: any) => {
              dispatch({
                type: "paymentNotice/updateClientSelectorSearchText",
                payload: e.detail.value,
              });
            }}
          />
          <IonList>
            <IonListHeader>
              <IonLabel>
                <IonText color="tertiary">
                  <strong>{`${clients.length} clientes encontrados`}</strong>
                </IonText>
              </IonLabel>
            </IonListHeader>
            {clients.slice(0, 30).map((client) => (
              <IonItem
                onClick={() => {
                  selectClient(client);
                }}
                key={client.identifier}
                lines="none"
                style={{
                  borderRadius: "4px",
                }}
                button
                detail={false}
              >
                <IonLabel>
                  <IonText color="primary">
                    <strong>{client.name}</strong>
                  </IonText>
                  <h6>{client.identifierFormatted}</h6>
                </IonLabel>
                {client.identifier ===
                  createFormDataItem.client?.identifier && (
                  <IonNote slot="end">
                    <IonIcon
                      icon={checkmarkOutline}
                      color="primary"
                      size="large"
                    ></IonIcon>
                  </IonNote>
                )}
              </IonItem>
            ))}
          </IonList>
        </IonContent>
        {/*         {clientSelected?.id && (
          <IonFooter>
            <IonToolbar color="secondary">
              <span
                className="ion-padding-start ion-padding-top"
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontWeight: 500,
                }}
              >
                <span className="ion-padding-end">Cliente seleccionado</span>
                <IonIcon icon={chevronDown}></IonIcon>
              </span>
              <IonItem lines="none" color="secondary">
                <IonLabel class="ion-text-wrap">
                  <h1>
                    <strong>{clientSelected.name}</strong>
                  </h1>
                  <h6>{clientSelected.identifierFormatted}</h6>
                </IonLabel>
              </IonItem>

              <IonButton
                class="ion-margin-horizontal ion-margin-bottom"
                expand="block"
                onClick={() => selectClient()}
                color="primary"
              >
                Listo
              </IonButton>
            </IonToolbar>
          </IonFooter>
        )} */}
      </IonModal>
    </div>
  );
};

export default ClientSelector;
