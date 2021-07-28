type Client = {
  id?: string;
  name: string;
  invoices: [];
};

export type PaymentInvoice = {
  id?: string;
  identifier?: string;
  amount?: number;
  client?: Client;
  description?: string;
  payedAtLegible?: string;
};
