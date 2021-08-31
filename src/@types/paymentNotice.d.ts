import { Client } from "./client";
import { PaymentReconciliation } from "./paymentReconciliation";
import { Invoice } from "./invoice";
import { Company } from "./company";

export type PaymentNotice = {
  id?: string;
  identifier?: string;
  amount?: number;
  client?: Client;
  clientIdentifier?: string;
  identifier?: number;
  description?: string;
  payedAtLegible?: string;
  payedAt?: number;
  invoices?: Invoice[];
  company?: Company;
  reconciliations?: PaymentReconciliation[];
  log?: {
    description: string;
    createdAtLegible: string;
  }[];
};
