import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { IonSearchbar } from "@ionic/react";
// Actions
import findPaymentNotices from "../../../store/paymentNotice/actions/findPaymentNotices";
// Selectors
import { selectListFilter } from "../../../store/paymentNotice/selectors/selectListFilter";

const PaymentNoticeListHeaderSearch: React.FC = () => {
  const dispatch = useDispatch();
  const { searchText } = useSelector(selectListFilter);
  return (
    <>
      <IonSearchbar
        placeholder="Buscar"
        value={searchText}
        onIonChange={(e) => {
          dispatch({
            type: "paymentNotice/updatePaymentNoticesListFilter",
            payload: { searchText: e.detail.value },
          });
          dispatch(findPaymentNotices());
        }}
      />
    </>
  );
};

export default PaymentNoticeListHeaderSearch;
