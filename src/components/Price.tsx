import { cva, type VariantProps } from "class-variance-authority";
import { formatCryptoPrice, formatPrice } from "../utils/PriceFormat";

const priceStyles = cva("", {
  variants: {
    variant: {
      fiat: "text-subtitle",
      crypto: "text-subtitle",
    },
  },
  defaultVariants: {
    variant: "fiat",
  },
});

interface PriceProps extends VariantProps<typeof priceStyles> {
  value: number;
  className?: string;
}

const Price = ({ variant, value, className }: PriceProps) => {
  const formattedValue =
    variant === "crypto" ? formatCryptoPrice(value) : formatPrice(value);
  const symbol = variant === "fiat" ? "$" : "";

  return (
    <span className={priceStyles({ variant, className })}>
      {symbol}
      {formattedValue}
    </span>
  );
};

export default Price;
