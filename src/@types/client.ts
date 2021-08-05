import { Invoice } from "./invoice";

export type Client = {
  id?: string;
  name?: string;
  identifier?: string;
  invoices: Invoice[]
};
