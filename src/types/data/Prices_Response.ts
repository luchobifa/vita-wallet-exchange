type CurrencyKeys = "usd" | "btc" | "usdt" | "usdc";

export type PricesKeys = {
  [key in CurrencyKeys]: {
    [key in `${CurrencyKeys}_sell`]: number;
  };
};

export type Prices_Response = {
  prices: PricesKeys;
  valid_until: string;
};
