import { Client } from "./client";

export type PaymentNotice = {
  id?: string;
  identifier?: string;
  amount?: number;
  client?: Client;
  description?: string;
  payedAtLegible?: string;
  payedAt?: number;
  log?: {
    description: string;
    createdAtLegible: string;
  }[];
};
