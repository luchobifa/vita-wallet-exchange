import { CurrencyKeys, PricesKeys } from "../types/price";

export type State = {
  fromCurrency: CurrencyKeys;
  toCurrency: CurrencyKeys;
  fromAmount: number;
  toAmount: number;
  lastEdited: "from" | "to" | null;
  isLoading: boolean;
  error: string | null;
  success: boolean;
};

export type Action =
  | { type: "SET_FROM_CURRENCY"; payload: CurrencyKeys }
  | { type: "SET_TO_CURRENCY"; payload: CurrencyKeys }
  | { type: "SET_FROM_AMOUNT"; payload: number }
  | { type: "SET_TO_AMOUNT"; payload: number }
  | { type: "SET_LAST_EDITED"; payload: "from" | "to" }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "START_EXCHANGE" }
  | { type: "EXCHANGE_SUCCESS"; payload: boolean }
  | { type: "EXCHANGE_ERROR"; payload: string }
  | { type: "RESET_FORM" };

export const initialState: State = {
  fromCurrency: "usd",
  toCurrency: "usdc",
  fromAmount: 0,
  toAmount: 0,
  lastEdited: null,
  isLoading: false,
  error: null,
  success: false,
};

export const calculateExchangeRate = (
  fromAmount: number,
  fromCurrency: CurrencyKeys,
  toCurrency: CurrencyKeys,
  prices: PricesKeys
): number => {
  if (isNaN(fromAmount)) return 0;
  const rate = prices[fromCurrency][`${toCurrency}_sell`];
  return Number((fromAmount * rate).toFixed(8));
};

export const calculateReverseExchangeRate = (
  toAmount: number,
  fromCurrency: CurrencyKeys,
  toCurrency: CurrencyKeys,
  prices: PricesKeys
): number => {
  if (isNaN(toAmount)) return 0;
  const rate = prices[fromCurrency][`${toCurrency}_sell`];
  return Number((toAmount / rate).toFixed(8));
};

export const exchangeFormReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_FROM_CURRENCY":
      return { ...state, fromCurrency: action.payload, error: null };
    case "SET_TO_CURRENCY":
      return { ...state, toCurrency: action.payload, error: null };
    case "SET_FROM_AMOUNT":
      return { ...state, fromAmount: action.payload };
    case "SET_TO_AMOUNT":
      return { ...state, toAmount: action.payload };
    case "SET_LAST_EDITED":
      return { ...state, lastEdited: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "START_EXCHANGE":
      return { ...state, isLoading: true, error: null };
    case "EXCHANGE_SUCCESS":
      return { ...state, isLoading: false, success: action.payload };
    case "EXCHANGE_ERROR":
      return { ...state, isLoading: false, error: action.payload };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};
