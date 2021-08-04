import React from "react";
import { IonIcon, IonText } from "@ionic/react";
import { warningOutline } from "ionicons/icons";

const InputErrorMessage: React.FC<{ errorMessage: string }> = ({
  errorMessage,
}) => {
  return (
    <IonText
      color="danger"
      style={{
        paddingLeft: 67,
      }}
    >
      {errorMessage && (
        <IonIcon icon={warningOutline} class="ion-margin-right"></IonIcon>
      )}
      <small>{errorMessage}</small>
    </IonText>
  );
};

export default InputErrorMessage;
