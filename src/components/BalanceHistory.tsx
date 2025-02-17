import { Transaction } from "../types/transaction";

type Props = {
  transactions: Transaction[];
};

export const BalanceHistory = ({ transactions }: Props) => {
  if (!transactions.length) return null;
  return (
    <div className="">
      <h3 className="text-subtitle-2 mb-4">Historial</h3>
      <ul className="flex flex-col">
        {transactions.map((transaction, index) => (
          <li
            key={index}
            className="flex items-center justify-between border-b border-gray-2 py-4"
          >
            <span className="text-body">{transaction.type}</span>

            <span className="text-black text-buttons-others uppercase">
              {transaction.total} {transaction.currency}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};
