import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  IonButton,
  IonFab,
  IonFabButton,
  IonIcon,
  IonLoading,
} from "@ionic/react";
// Actions
import parsePaymentNoticesFile from "../../../store/paymentNotice/actions/parsePaymentNoticesFile";
// Selectors
import { selectParseFileStatus } from "../../../store/paymentNotice/selectors/selectParseFileStatus";
import { add } from "ionicons/icons";

const PaymentNoticeCreateButton: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const fileInput = useRef(null);
  const parseFilePending = useSelector(selectParseFileStatus);

  const onSelectFile = async (event: any) => {
    console.log(event.target.files[0]);
    try {
      await dispatch(parsePaymentNoticesFile(event.target.files[0]));
      event.target.value = null;
      history.push("/app/contabilidad/abonos/agregar");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <input ref={fileInput} hidden type="file" onChange={onSelectFile} />
      {/*       <IonButton
        expand="block"
        onClick={() => {
          // @ts-ignore
          fileInput?.current?.click();
        }}
      >
        REGISTRAR ABONOS
      </IonButton> */}
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton
          onClick={() => {
            // @ts-ignore
            fileInput?.current?.click();
          }}
        >
          <IonIcon icon={add} />
        </IonFabButton>
      </IonFab>

      <IonLoading
        isOpen={parseFilePending === "pending"}
        message={"Analizando archivo..."}
      />
    </>
  );
};

export default PaymentNoticeCreateButton;
