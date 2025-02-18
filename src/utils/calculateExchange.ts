import { CurrencyKeys, Prices } from "../types/price";

const isCrypto = (currency: CurrencyKeys): boolean => {
  const cryptoCurrencies: CurrencyKeys[] = ["btc", "usdc", "usdt"];
  return cryptoCurrencies.includes(currency);
};

export const calculateExchange = (
  amount: number,
  from: CurrencyKeys,
  to: CurrencyKeys,
  prices: Prices["prices"]
): number => {
  const rate = prices[from][`${to}_sell`];
  const result = amount * rate;
  return Number(result.toFixed(isCrypto(to) ? 7 : 2));
};

export const calculateReverseExchange = (
  amount: number,
  from: CurrencyKeys,
  to: CurrencyKeys,
  prices: Prices["prices"]
): number => {
  const rate = prices[from][`${to}_sell`];
  const result = amount / rate;
  return Number(result.toFixed(isCrypto(from) ? 7 : 2));
};
