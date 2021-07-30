import React from "react";
import {
  IonAvatar,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonNote,
  IonSkeletonText,
} from "@ionic/react";

const PaymentNoticeListSkeletonLoading: React.FC = () => {
  return (
    <IonList>
      <IonListHeader>
        <IonLabel>
          <IonSkeletonText animated style={{ width: "20%" }} />
        </IonLabel>
      </IonListHeader>
      {[...Array(9)].map((item, index) => (
        <IonItem key={index} lines="none">
          <IonLabel>
            <h3>
              <IonSkeletonText animated style={{ width: "50%" }} />
            </h3>
            <p>
              <IonSkeletonText animated style={{ width: "70%" }} />
            </p>
          </IonLabel>
          <IonNote slot="end">
            <IonSkeletonText animated style={{ width: "20%" }} />
          </IonNote>
        </IonItem>
      ))}
    </IonList>
  );
};

export default PaymentNoticeListSkeletonLoading;
