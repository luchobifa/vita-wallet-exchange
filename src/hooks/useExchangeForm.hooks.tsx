import { useReducer, useEffect, useCallback, useMemo, useState } from "react";
import {
  exchangeFormReducer,
  initialState,
} from "../reducers/exchangeFormReducer";
import { transactionService } from "../services/TransactionService";
import {
  ExchangeActions,
  ExchangeCalculations,
} from "../types/exchange.hook.types";
import { CurrencyKeys, Prices } from "../types/price";
import { useAuth } from "./Auth.hooks";
import { useUser } from "./User.hooks";
import {
  calculateExchange,
  calculateReverseExchange,
} from "../utils/calculateExchange";

const useExchangeManager = () => {
  const { headers } = useAuth();
  const { userProfile } = useUser();
  const [state, dispatch] = useReducer(exchangeFormReducer, initialState);
  const [prices, setPrices] = useState<Prices | undefined>(undefined);

  useEffect(() => {
    const fetchPrices = async () => {
      if (!headers) return;
      try {
        const pricesData = await transactionService.getCryptoPrices(headers);
        setPrices(pricesData);
      } catch (error) {
        console.error("Error fetching crypto prices", error);
      }
    };
    fetchPrices();
  }, []);

  const actions: ExchangeActions = useMemo(
    () => ({
      setCurrency: (direction, currency) => {
        dispatch({
          type: "SET_CURRENCY",
          payload: { direction, value: currency },
        });
        if (state.currencies.from === state.currencies.to) {
          dispatch({
            type: "SET_CURRENCY",
            payload: {
              direction: direction === "from" ? "to" : "from",
              value:
                direction === "from"
                  ? state.currencies.to
                  : state.currencies.from,
            },
          });
        }
      },
      setAmount: (direction, value) => {
        dispatch({ type: "SET_AMOUNT", payload: { direction, value } });
        dispatch({ type: "SET_LAST_EDITED", payload: direction });
      },
      reset: () => dispatch({ type: "RESET" }),
    }),
    [state.currencies.from, state.currencies.to]
  );

  const calculations: ExchangeCalculations = useMemo(
    () => ({
      convertAmount: (direction) => {
        if (!prices?.prices) return 0;
        const { from, to } = state.currencies;
        const amount = state.amounts[direction];
        return direction === "from"
          ? calculateExchange(amount, from, to, prices?.prices)
          : calculateReverseExchange(amount, from, to, prices?.prices);
      },
      validateBalance: () => {
        if (!userProfile) return false;
        const requiredBalance =
          state.lastEdited === "from"
            ? state.amounts.from
            : calculations.convertAmount("to");

        return requiredBalance <= userProfile.balances[state.currencies.from];
      },
    }),
    [state, userProfile, prices?.prices]
  );

  useEffect(() => {
    if (!state.lastEdited || !state.amounts[state.lastEdited]) return;
    const newAmount = calculations.convertAmount(state.lastEdited);
    const targetDirection = state.lastEdited === "from" ? "to" : "from";
    if (state.amounts[targetDirection] !== Number(newAmount)) {
      dispatch({
        type: "SET_AMOUNT",
        payload: {
          direction: targetDirection,
          value: Number(newAmount),
        },
      });
    }
  }, [state.currencies, state.lastEdited, prices?.prices, state.amounts]);

  const executeExchange = useCallback(async () => {
    if (!calculations.validateBalance() || !headers) {
      dispatch({
        type: "SET_STATUS",
        payload: {
          error: "Saldo insuficiente para realizar la operación",
        },
      });
      return;
    }
    dispatch({ type: "SET_STATUS", payload: { isLoading: true, error: null } });
    try {
      await transactionService.exchange(headers, {
        fromCurrency: state.currencies.from,
        toCurrency: state.currencies.to,
        amountSent: state.amounts.from,
      });

      dispatch({ type: "SET_STATUS", payload: { success: true } });
      dispatch({ type: "RESET" });
    } catch (error) {
      dispatch({
        type: "SET_STATUS",
        payload: {
          error: (error as Error).message || "Error en la transacción",
        },
      });
    }
  }, [state, headers, calculations.validateBalance]);

  return { state, actions, calculations, executeExchange, prices };
};

export const useExchangeForm = () => {
  const exchange = useExchangeManager();
  const coins = useMemo(
    () => Object.keys(exchange.prices?.prices || {}) as CurrencyKeys[],
    [exchange.prices]
  );

  return {
    coins,
    exchangeState: exchange.state,
    exchangeActions: exchange.actions,
    exchangeCalculations: exchange.calculations,
    executeExchange: exchange.executeExchange,
    prices: exchange.prices,
  };
};
