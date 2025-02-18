import IconImage from "./Icon/IconImage";
import { iconImageType } from "./Icon/types";
import Price from "./Price";

type Props = {
  title: string;
  iconImageType?: iconImageType;
  price: number;
};

export const CardBalance = ({ title, iconImageType, price }: Props) => (
  <div className="bg-gray-3 p-6 border-2 flex flex-col justify-between border-gray-2 rounded-md w-[285px] gap-6">
    <div className="flex justify-between">
      <p className="text-body uppercase">{title}</p>
      {iconImageType && <IconImage type={iconImageType} />}
    </div>
    <div className="flex items-center">
      {iconImageType === "usd" ? (
        <Price variant="fiat" value={price} />
      ) : (
        <Price variant="crypto" value={price} />
      )}
    </div>
  </div>
);
