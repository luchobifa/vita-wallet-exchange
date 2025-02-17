import { useReducer, useEffect } from "react";
import { CurrencyKeys, Prices } from "../types/price";
import { useAuth } from "./Auth.hooks";
import { transactionService } from "../services/TransactionService";
import {
  exchangeFormReducer,
  initialState,
  calculateExchangeRate,
  calculateReverseExchangeRate,
} from "../reducers/exchangeFormReducer";
import { useUser } from "./User.hooks";

export const useExchangeForm = (prices: Prices) => {
  const { headers } = useAuth();
  const { userProfile } = useUser();
  const coins = Object.keys(prices.prices);
  const [state, dispatch] = useReducer(exchangeFormReducer, initialState);

  useEffect(() => {
    if (state.lastEdited === "from" && state.fromAmount) {
      const calculated = calculateExchangeRate(
        state.fromAmount,
        state.fromCurrency,
        state.toCurrency,
        prices.prices
      );
      dispatch({ type: "SET_TO_AMOUNT", payload: calculated });
    } else if (state.lastEdited === "to" && state.toAmount) {
      const calculated = calculateReverseExchangeRate(
        state.toAmount,
        state.fromCurrency,
        state.toCurrency,
        prices.prices
      );
      dispatch({ type: "SET_FROM_AMOUNT", payload: calculated });
    }
  }, [
    state.fromAmount,
    state.toAmount,
    state.fromCurrency,
    state.toCurrency,
    state.lastEdited,
    prices,
  ]);

  const validateBalance = (amount: number, currency: CurrencyKeys) => {
    if (!userProfile?.balances) return true;
    const balance = userProfile.balances[currency];
    return amount <= balance;
  };

  const handleFromAmountChange = (value: string) => {
    const numberValue = value === "" ? 0 : Number(value);
    if (!validateBalance(numberValue, state.fromCurrency)) {
      dispatch({
        type: "SET_ERROR",
        payload: `No tienes suficiente balance de ${state.fromCurrency.toUpperCase()}`,
      });
      return;
    }
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_FROM_AMOUNT", payload: numberValue });
    dispatch({ type: "SET_LAST_EDITED", payload: "from" });
  };

  const handleToAmountChange = (value: string) => {
    const numberValue = value === "" ? 0 : Number(value);
    const equivalentFromAmount = calculateReverseExchangeRate(
      numberValue,
      state.fromCurrency,
      state.toCurrency,
      prices.prices
    );

    if (!validateBalance(equivalentFromAmount, state.fromCurrency)) {
      dispatch({
        type: "SET_ERROR",
        payload: `No tienes suficiente balance de ${state.fromCurrency.toUpperCase()}`,
      });
      return;
    }
    dispatch({ type: "SET_ERROR", payload: null });
    dispatch({ type: "SET_TO_AMOUNT", payload: numberValue });
    dispatch({ type: "SET_LAST_EDITED", payload: "to" });
  };

  const handleExchange = async () => {
    if (!headers || !state.fromAmount) return;
    if (!validateBalance(state.fromAmount, state.fromCurrency)) {
      dispatch({
        type: "SET_ERROR",
        payload: `No tienes suficiente balance de ${state.fromCurrency.toUpperCase()}`,
      });
      return;
    }
    dispatch({ type: "START_EXCHANGE" });
    try {
      await transactionService.exchange(headers, {
        fromCurrency: state.fromCurrency,
        toCurrency: state.toCurrency,
        amountSent: state.fromAmount,
      });
      dispatch({ type: "EXCHANGE_SUCCESS", payload: true });
    } catch (err) {
      dispatch({
        type: "EXCHANGE_ERROR",
        payload:
          "Error al realizar el intercambio. Por favor, intente nuevamente.",
      });
      console.error("Exchange error:", err);
    }
  };

  return {
    coins,
    from: {
      currency: state.fromCurrency,
      amount: state.fromAmount,
    },
    to: {
      currency: state.toCurrency,
      amount: state.toAmount,
    },
    isLoading: state.isLoading,
    error: state.error,
    success: state.success,
    setFromCurrency: (currency: CurrencyKeys) =>
      dispatch({ type: "SET_FROM_CURRENCY", payload: currency }),
    setToCurrency: (currency: CurrencyKeys) =>
      dispatch({ type: "SET_TO_CURRENCY", payload: currency }),
    resetForm: () => dispatch({ type: "RESET_FORM" }),
    handleFromAmountChange,
    handleToAmountChange,
    handleExchange,
  };
};
