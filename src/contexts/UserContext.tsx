import { createContext, useState, useEffect } from "react";
import { UserProfile } from "../types/userProfile";
import { useAuth } from "../hooks/Auth.hooks";
import { transactionService } from "../services/TransactionService";
import { userService } from "../services/UserService";
import { Transaction } from "../types/transaction";
import { Prices } from "../types/price";
import { useExchangeForm } from "../hooks/useExchangeForm.hooks";

type AuthContextType = {
  userProfile: UserProfile | null;
  transactions: Transaction[] | null;
  prices: Prices | null;
};

export const UserContext = createContext<AuthContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { headers } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);
  const [prices, setPrices] = useState<Prices | null>(null);

  useEffect(() => {
    const getData = async () => {
      if (!headers) return;
      try {
        const userData = await userService.getProfile(headers);
        const transactionsData = await transactionService.getTransactions(
          headers
        );
        const pricesData = await transactionService.getCryptoPrices(headers);
        setUserProfile(userData);
        setTransactions(transactionsData);
        setPrices(pricesData);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    getData();
  }, [headers]);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        transactions,
        prices,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
