import { ExchangeDirection, ExchangeState } from "../types/exchange.hook.types";
import { CurrencyKeys } from "../types/price";

export const initialState: ExchangeState = {
  currencies: { from: "usd", to: "usdc" },
  amounts: { from: 0, to: 0 },
  status: { isLoading: false, error: null, success: false },
  lastEdited: null,
};

type ReducerAction =
  | {
      type: "SET_CURRENCY";
      payload: { direction: ExchangeDirection; value: CurrencyKeys };
    }
  | {
      type: "SET_AMOUNT";
      payload: { direction: ExchangeDirection; value: number };
    }
  | { type: "SET_LAST_EDITED"; payload: ExchangeDirection }
  | { type: "SET_STATUS"; payload: Partial<ExchangeState["status"]> }
  | { type: "RESET" };

export const exchangeFormReducer = (
  state: ExchangeState,
  action: ReducerAction
): ExchangeState => {
  switch (action.type) {
    case "SET_CURRENCY":
      return {
        ...state,
        currencies: {
          ...state.currencies,
          [action.payload.direction]: action.payload.value,
        },
        status: { ...state.status, error: null },
      };

    case "SET_AMOUNT":
      return {
        ...state,
        amounts: {
          ...state.amounts,
          [action.payload.direction]: action.payload.value,
        },
        status: { ...state.status, error: null },
      };

    case "SET_LAST_EDITED":
      return { ...state, lastEdited: action.payload };

    case "SET_STATUS":
      return { ...state, status: { ...state.status, ...action.payload } };

    case "RESET":
      return initialState;

    default:
      return state;
  }
};
