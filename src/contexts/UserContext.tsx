import { createContext, useState, useEffect } from "react";
import { UserProfile } from "../types/userProfile";
import { useAuth } from "../hooks/Auth.hooks";
import { transactionService } from "../services/TransactionService";
import { userService } from "../services/UserService";
import { Transaction } from "../types/transaction";

type AuthContextType = {
  userProfile: UserProfile | null;
  transactions: Transaction[] | null;
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

  useEffect(() => {
    const getData = async () => {
      if (!headers) return;
      try {
        const userData = await userService.getProfile(headers);
        const transactionsData = await transactionService.getTransactions(
          headers
        );

        setUserProfile(userData);
        setTransactions(transactionsData);
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
