import { CurrencyKeys } from "./price";

export type ExchangeDirection = "from" | "to";
export type ExchangeState = {
  currencies: {
    from: CurrencyKeys;
    to: CurrencyKeys;
  };
  amounts: {
    from: number;
    to: number;
  };
  status: {
    isLoading: boolean;
    error: string | null;
    success: boolean;
  };
  lastEdited: ExchangeDirection | null;
};

export type ExchangeActions = {
  setCurrency: (direction: ExchangeDirection, currency: CurrencyKeys) => void;
  setAmount: (direction: ExchangeDirection, value: number) => void;
  reset: () => void;
};

export type ExchangeCalculations = {
  convertAmount: (direction: ExchangeDirection) => number;
  validateBalance: () => boolean;
};
