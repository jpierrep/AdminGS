type Client = {
  id?: string;
  name: string;
  invoices: [];
};

export type PaymentNotice = {
  id?: string;
  identifier?: string;
  amount?: number;
  client?: Client;
  description?: string;
  payedAtLegible?: string;
  payedAt?: number;
};
