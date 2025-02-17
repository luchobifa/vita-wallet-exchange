import { Balances } from "../types/data/User_Response";
import { CardBalance } from "./CardBalance";
import { iconImageType } from "./Icon/types";

type Props = {
  balances: Balances;
};

export const MyBalances = ({ balances }: Props) => {
  if (!balances) return null;
  return (
    <div className="mb-14 mt-[76px]">
      <h3 className="text-subtitle-2">Mis Saldos</h3>
      <div className="flex gap-5 mt-6">
        {Object.entries(balances).map(([key, value]) => (
          <CardBalance
            key={key}
            title={key}
            iconImageType={key as iconImageType}
            price={value}
          />
        ))}
      </div>
    </div>
  );
};
