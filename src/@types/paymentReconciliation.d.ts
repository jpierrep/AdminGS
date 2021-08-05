import { Invoice } from "./invoice";
import { PaymentNotice } from "./paymentNotice";

export type PaymentReconciliation = {
  id?: string;
  payment?: PaymentNotice;
  invoice?: Invoice;
};
