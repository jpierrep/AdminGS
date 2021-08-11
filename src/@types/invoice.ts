export type Invoice = {
  id?: string;
  identifier?: string;
  amount?: number;
  pendingAmount?: number;
  expiresAtLegible?: string;
  code?: string;
  checked: boolean;
};
