import { CurrencyKeys } from "../types/price";
import { Input } from "./Input";
import { Selector } from "./Selector";
import Button from "./Button";
import { FormEvent } from "react";
import Modal from "./Modal";
import { Balances } from "../types/userProfile";

type Props = {
  from: {
    amount: number;
    currency: CurrencyKeys;
  };
  to: {
    amount: number;
    currency: CurrencyKeys;
  };
  handleContinue: (e: FormEvent<HTMLFormElement>) => void;
  coins: CurrencyKeys[];
  error: string | null;
  isLoading: boolean;
  userBalances: Balances;
  handleToAmountChange: (value: string) => void;
  handleFromAmountChange: (value: string) => void;
  setFromCurrency: (currency: CurrencyKeys) => void;
  setToCurrency: (currency: CurrencyKeys) => void;
  success: boolean;
  resetForm: () => void;
};

export const Exchange = ({
  handleContinue,
  coins,
  from,
  to,
  error,
  isLoading,
  userBalances,
  handleFromAmountChange,
  handleToAmountChange,
  setFromCurrency,
  setToCurrency,
  success,
  resetForm,
}: Props) => {
  return (
    <>
      <form
        onSubmit={handleContinue}
        className="flex flex-col justify-between h-full"
        noValidate
      >
        <div className="flex flex-col gap-12">
          <fieldset className="flex flex-col gap-4 justify-between">
            <legend className="text-body mb-4">Monto a intercambiar</legend>
            <div className="flex gap-4">
              <Selector
                id="fromCurrency"
                name="fromCurrency"
                value={from.currency}
                options={coins as CurrencyKeys[]}
                onSelect={(e) => setFromCurrency(e)}
                aria-label="Seleccionar moneda a enviar"
              />
              <Input
                max={userBalances[from.currency]}
                min={0}
                id="fromAmount"
                name="fromAmount"
                variant={from.currency === "usd" ? "money" : undefined}
                value={from.amount || ""}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                type="number"
                required
                aria-label="Monto a enviar"
                aria-describedby={error ? "exchange-error" : undefined}
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="text-body mb-4">Quiero recibir</legend>
            <div className="flex gap-4">
              <Selector
                id="toCurrency"
                name="toCurrency"
                value={to.currency}
                options={coins as CurrencyKeys[]}
                onSelect={(e) => setToCurrency(e)}
                aria-label="Seleccionar moneda a recibir"
              />
              <Input
                max={userBalances[from.currency]}
                min={0}
                id="toAmount"
                name="toAmount"
                variant={to.currency === "usd" ? "money" : undefined}
                value={to.amount || ""}
                onChange={(e) => handleToAmountChange(e.target.value)}
                type="number"
                required
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                aria-label="Monto a recibir"
              />
            </div>
          </fieldset>

          {error && (
            <div
              id="exchange-error"
              role="alert"
              className="text-red-600 text-sm mt-2"
            >
              {error}
            </div>
          )}
        </div>

        <div className="flex gap-5">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => window.history.back()}
          >
            Atrás
          </Button>
          <Button
            type="submit"
            size="sm"
            variant={
              isLoading || !from.amount || !to.amount || error
                ? "disabled"
                : "primary"
            }
            disabled={isLoading || !from.amount || !to.amount || !!error}
          >
            {isLoading ? "Procesando..." : "Continuar"}
          </Button>
        </div>
      </form>

      {success && (
        <Modal
          imageUrl="/assets/success.png"
          isOpen={true}
          onClose={() => resetForm()}
          title={"Intercambio exitoso!"}
          description={`Ya cuentas con los ${to.currency.toUpperCase()} en tu saldo`}
        />
      )}
    </>
  );
};
