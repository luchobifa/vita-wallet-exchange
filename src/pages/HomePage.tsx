import { BalanceHistory } from "../components/BalanceHistory";
import Greeting from "../components/Greeting";
import Sidebar from "../components/Sidebar/Sidebar";
import { MyBalances } from "../components/MyBalances";
import { useUser } from "../hooks/User.hooks";

export const HomePage = () => {
  const { userProfile, transactions } = useUser();

  if (!userProfile) return null;

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[75vw] py-[76px] pl-[53px] pr-[120px]">
        <Greeting name={userProfile.firstName} iconImage="style-dollar" />
        <MyBalances balances={userProfile.balances} />
        {transactions && transactions.length > 0 && (
          <BalanceHistory transactions={transactions} />
        )}
      </div>
    </div>
  );
};
