import { Company } from "./company";
import { Invoice } from "./invoice";

export type Client = {
  id?: string;
  name?: string;
  identifier?: string;
  company?: Company;
  identifierFormatted?: string;
  invoices: Invoice[]
};
