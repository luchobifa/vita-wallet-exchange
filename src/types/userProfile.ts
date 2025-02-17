import { CurrencyKeys } from "./price";

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  balances: Balances;
  isAdmin: boolean;
};

export type Balances = {
  [key in CurrencyKeys]: number;
};
