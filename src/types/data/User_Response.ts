export type AuthDataResponse = {
  id: string;
  attributes: {
    email: string;
    is_admin: boolean;
    btc_address: string;
    balances: Balances;
    first_name: string;
    last_name: string;
  };
};

export type Balances = {
  btc: number;
  usdt: number;
  usd: number;
  usdc: number;
};
