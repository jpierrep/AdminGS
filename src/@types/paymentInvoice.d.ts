type Client = {
  id?: string;
  name: string;
};

export type PaymentInvoice = {
  id?: string;
  identifier?: string;
  amount?: number;
  client?: Client;
  description?: string;
  payedAtLegible?: string;
};
