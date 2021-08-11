import { Client } from "./client";
import { PaymentReconciliation } from "./paymentReconciliation";
import { Invoice } from "./invoice";

export type PaymentNotice = {
  id?: string;
  identifier?: string;
  amount?: number;
  client?: Client;
  clientIdentifier?: string;
  code?: number;
  description?: string;
  payedAtLegible?: string;
  payedAt?: number;
  invoices?: Invoice[];
  reconciliations?: PaymentReconciliation[];
  log?: {
    description: string;
    createdAtLegible: string;
  }[];
};
