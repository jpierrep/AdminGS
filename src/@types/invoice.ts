export type Invoice = {
  id?: string;
  identifier?: string;
  amount?: number;
  pendingAmount?: number;
  expiresAtLegible?: string;
  checked: boolean;

  // Para formulario
  payedAmountAtCurrentPaymentNotice?: number;
};
