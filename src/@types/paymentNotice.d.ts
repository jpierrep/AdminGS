import { Client } from "./client";
import { PaymentReconciliation } from "./paymentReconciliation";

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
  reconciliations?: PaymentReconciliation[];
  log?: {
    description: string;
    createdAtLegible: string;
  }[];
};
