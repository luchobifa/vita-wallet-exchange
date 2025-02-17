export type CurrencyKeys = "usd" | "btc" | "usdt" | "usdc";

export type PricesKeys = {
  [key in CurrencyKeys]: {
    [key in `${CurrencyKeys}_sell`]: number;
  };
};

export type Prices = {
  prices: PricesKeys;
  valid_until: string;
};
