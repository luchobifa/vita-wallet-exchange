import { createContext, useState, useEffect, useCallback } from "react";
import { UserProfile } from "../types/userProfile";
import { useAuth } from "../hooks/Auth.hooks";
import { transactionService } from "../services/TransactionService";
import { userService } from "../services/UserService";
import { Transaction } from "../types/transaction";

type UserContextType = {
  userProfile: UserProfile | null;
  transactions: Transaction[] | null;
  reloadTransactions: () => Promise<void>;
  reloadUserProfile: () => Promise<void>;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { headers } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[] | null>(null);

  const reloadUserProfile = useCallback(async () => {
    if (!headers) return;
    try {
      const userData = await userService.getProfile(headers);
      setUserProfile(userData);
    } catch (error) {
      console.error("Error fetching user profile", error);
    }
  }, [headers]);

  const reloadTransactions = useCallback(async () => {
    if (!headers) return;
    try {
      const transactionsData = await transactionService.getTransactions(
        headers
      );
      setTransactions(transactionsData);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  }, [headers]);

  useEffect(() => {
    const loadInitialData = async () => {
      await reloadUserProfile();
      await reloadTransactions();
    };
    loadInitialData();
  }, [reloadUserProfile, reloadTransactions]);

  return (
    <UserContext.Provider
      value={{
        userProfile,
        transactions,
        reloadTransactions,
        reloadUserProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
