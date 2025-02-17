import { AuthHeaders } from "../types/auth";
import { Prices_Response } from "../types/data/Prices_Response";
import { Transaction_Response } from "../types/data/Transactions_Response";
import { Prices } from "../types/price";
import { ExchangeRequest, Transaction } from "../types/transaction";
import { ApiService } from "./ApiService";

class TransactionService extends ApiService {
  constructor() {
    super("https://api.qa.vitawallet.io/api");
  }

  async getCryptoPrices(headers: AuthHeaders) {
    const response = await this.api.get<Prices_Response>(
      "/users/get_crypto_multi_prices",
      {
        headers: {
          "app-name": "ANGIE",
          "access-token": headers["access-token"],
          uid: headers.uid,
          client: headers.client,
          expiry: headers.expiry,
        },
      }
    );
    const prices: Prices = response.data;
    return prices;
  }

  async getTransactions(headers: AuthHeaders): Promise<Transaction[]> {
    const response = await this.api.get("/transactions", {
      headers: {
        "app-name": "ANGIE",
        "access-token": headers["access-token"],
        uid: headers.uid,
        client: headers.client,
      },
    });

    const data = response.data.data;

    const transactions: Transaction[] = data?.map(
      (transaction: Transaction_Response) => {
        return {
          id: transaction.id,
          currency: transaction.attributes.currency,
          total: parseFloat(transaction.attributes.total),
          type: transaction.attributes.category_translate,
        };
      }
    );
    return transactions;
  }

  async exchange(headers: AuthHeaders, data: ExchangeRequest) {
    console.log("data", data);
    const response = this.api.post(
      "/transactions/exchange",
      {
        currency_sent: data.fromCurrency,
        currency_received: data.toCurrency,
        amount_sent: data.amountSent,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "app-name": "ANGIE",
          "access-token": headers["access-token"],
          uid: headers.uid,
          client: headers.client,
          expiry: headers.expiry,
        },
      }
    );

    return response;
  }
}

export const transactionService = new TransactionService();
