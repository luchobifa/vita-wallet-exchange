import Button from "../components/Button";
import { Input } from "../components/Input";
import Modal from "../components/Modal";
import { Selector } from "../components/Selector";
import { ExchangeDirection } from "../types/exchange.hook.types";
import {
  ExchangeFormValues,
  ExchangeStatus,
  ExchangeCallbacks,
} from "../types/exchangeComponent";
import { CurrencyKeys } from "../types/price";

type ExchangeProps = {
  values: ExchangeFormValues;
  status: ExchangeStatus;
  coins: CurrencyKeys[];
  callbacks: ExchangeCallbacks;
};

export const Exchange = ({
  values,
  status,
  coins,
  callbacks,
}: ExchangeProps) => {
  const { from, to } = values;
  const { isLoading, error, success } = status;
  const { onCurrencyChange, onAmountChange, onReset, onSubmit } = callbacks;
  const isSubmitDisabled = isLoading || from.amount === 0 || to.amount === 0;

  const renderCurrencyField = (direction: ExchangeDirection) => {
    const { currency, amount } = direction === "from" ? from : to;
    const isUSD = currency === "usd";

    return (
      <fieldset className="flex flex-col gap-4">
        <legend className="text-body mb-4">
          {direction === "from" ? "Monto a intercambiar" : "Quiero recibir"}
        </legend>
        <div className="flex gap-4">
          <Selector
            name={`${direction}Currency`}
            id={`${direction}Currency`}
            value={currency}
            options={coins}
            onSelect={(currency) => onCurrencyChange(direction, currency)}
            aria-label={`Seleccionar moneda a ${
              direction === "from" ? "enviar" : "recibir"
            }`}
          />
          <Input
            value={amount || ""}
            variant={isUSD ? "money" : "default"}
            id={`${direction}Amount`}
            name={`${direction}Amount`}
            onChange={(e) => onAmountChange(direction, Number(e.target.value))}
            type="number"
            required
            aria-label={`Monto a ${
              direction === "from" ? "enviar" : "recibir"
            }`}
            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </fieldset>
    );
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col justify-between h-full"
        noValidate
      >
        <div className="flex flex-col gap-12">
          {renderCurrencyField("from")}
          {renderCurrencyField("to")}

          {error && (
            <div role="alert" className="text-red-600 text-sm mt-2">
              {error}
            </div>
          )}
        </div>

        <div className="flex gap-5">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => {
              onReset();
              window.history.back();
            }}
          >
            Atrás
          </Button>
          <Button
            type="submit"
            size="sm"
            variant={isLoading ? "disabled" : "primary"}
            disabled={isSubmitDisabled}
          >
            {isLoading ? "Procesando..." : "Continuar"}
          </Button>
        </div>
      </form>

      {success && (
        <Modal
          imageUrl="/assets/success.png"
          isOpen={true}
          onClose={onReset}
          title="Intercambio exitoso!"
          description={`Ya cuentas con los ${to.currency.toUpperCase()} en tu saldo`}
        />
      )}
    </>
  );
};
