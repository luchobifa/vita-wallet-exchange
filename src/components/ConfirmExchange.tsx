import { CurrencyKeys, PricesKeys } from "../types/price";
import Button from "./Button";

type Props = {
  from: {
    amount: number;
    currency: CurrencyKeys;
  };
  to: {
    amount: number;
    currency: CurrencyKeys;
  };
  prices: PricesKeys;
  handleBack: () => void;
  handleExchangeConfirmation: () => void;
};

export const ConfirmExchange = ({
  from,
  to,
  prices,
  handleBack,
  handleExchangeConfirmation,
}: Props) => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex flex-col gap-8">
        <h2 className="text-subtitle">Resumen de transacción</h2>
        <div className="px-6 py-2.5 bg-white-1 flex flex-col gap-2 w-[70%] rounded-b-md">
          <div className="flex justify-between">
            <p className="text-caption-1">Monto a intercambiar:</p>
            <p className="text-buttons-others">
              {from.amount} {from.currency.toUpperCase()}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-caption-1">Tasa de cambio:</p>
            <p className="text-buttons-others">
              {prices[from.currency][`${to.currency}_sell`]}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-caption-1">Total a recibir:</p>
            <p className="text-buttons-others">
              {to.amount} {to.currency.toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-5">
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={handleBack}
        >
          Atrás
        </Button>
        <Button
          type="button"
          size="sm"
          variant="primary"
          onClick={handleExchangeConfirmation}
        >
          Intercambiar
        </Button>
      </div>
    </div>
  );
};
