import { IonButton, IonLoading } from "@ionic/react";

import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import parsePaymentNoticesFile from "../../../store/accounting/actions/parsePaymentNoticesFile";

const PaymentNoticeCreateButton: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const { parseFilePending } = useSelector((store: any) => store.accounting);
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
      <IonButton
        expand="block"
        onClick={() => {
          // @ts-ignore
          fileInput?.current?.click();
        }}
      >
        REGISTRAR ABONOS
      </IonButton>
      <IonLoading isOpen={parseFilePending} message={"Analizando archivo..."} />
    </>
  );
};

export default PaymentNoticeCreateButton;
