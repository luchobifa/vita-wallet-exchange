import { CurrencyKeys } from "../types/price";

export type ExchangeDirection = "from" | "to";

export type ExchangeFormValues = {
  from: {
    currency: CurrencyKeys;
    amount: number;
  };
  to: {
    currency: CurrencyKeys;
    amount: number;
  };
};

export type ExchangeStatus = {
  isLoading: boolean;
  error: string | null;
  success: boolean;
};

export type ExchangeCallbacks = {
  onCurrencyChange: (
    direction: ExchangeDirection,
    currency: CurrencyKeys
  ) => void;
  onAmountChange: (direction: ExchangeDirection, value: number) => void;
  onReset: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};
