export type Transaction = {
  id: string;
  currency: string;
  total: number;
  type: string;
};

export type ExchangeRequest = {
  fromCurrency: string;
  toCurrency: string;
  amountSent: number;
};
