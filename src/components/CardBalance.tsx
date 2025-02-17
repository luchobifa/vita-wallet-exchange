import { formatPrice } from "../utils/PriceFormat";
import IconImage from "./Icon/IconImage";
import { iconImageType } from "./Icon/types";

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
        <p className="text-subtitle-2-semibold flex items-center">
          $ {formatPrice(price)}
        </p>
      ) : (
        <p className="text-subtitle-2-semibold">{formatPrice(price)}</p>
      )}
    </div>
  </div>
);
