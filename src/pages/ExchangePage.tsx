import { FormEvent, useState } from "react";
import { Exchange } from "../components/Exchange";
import Sidebar from "../components/Sidebar/Sidebar";
import { useUser } from "../hooks/User.hooks";
import { useExchangeForm } from "../hooks/useExchangeForm.hooks";
import { Prices } from "../types/price";
import { ConfirmExchange } from "../components/ConfirmExchange";
import { formatPrice } from "../utils/PriceFormat";

export const ExchangePage = () => {
  const { userProfile, prices } = useUser();
  const [isConfirmed, setIsConfirmed] = useState(false);

  const {
    coins,
    exchangeState,
    exchangeActions,
    exchangeCalculations,
    executeExchange,
  } = useExchangeForm(prices as Prices);

  const handleBack = () => setIsConfirmed(false);

  const handleContinue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!exchangeCalculations.validateBalance()) {
      return;
    }
    setIsConfirmed(true);
  };

  const handleExchangeConfirmation = async () => {
    await executeExchange();
    setIsConfirmed(false);
  };

  if (!userProfile || !prices) {
    return <div>Error al cargar datos del usuario y precios</div>;
  }

  if (isConfirmed) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="w-[75vw] py-[120px] pl-[155px] pr-[120px] flex flex-col justify-between">
          <ConfirmExchange
            from={{
              currency: exchangeState.currencies.from,
              amount: exchangeState.amounts.from,
            }}
            to={{
              currency: exchangeState.currencies.to,
              amount: exchangeState.amounts.to,
            }}
            prices={prices.prices}
            handleBack={handleBack}
            handleExchangeConfirmation={handleExchangeConfirmation}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-[75vw] py-[120px] pl-[155px] pr-[120px] flex flex-col justify-between">
        <div className="flex flex-col gap-10 h-full">
          <h1 className="text-subtitle">Qué deseas intercambiar?</h1>
          <p className="text-buttons-others text-blue-2">
            {`Saldo disponible: $${formatPrice(userProfile?.balances.usd)}`}
          </p>
          <Exchange
            values={{
              from: {
                currency: exchangeState.currencies.from,
                amount: exchangeState.amounts.from,
              },
              to: {
                currency: exchangeState.currencies.to,
                amount: exchangeState.amounts.to,
              },
            }}
            status={{
              isLoading: exchangeState.status.isLoading,
              error: exchangeState.status.error,
              success: exchangeState.status.success,
            }}
            coins={coins}
            callbacks={{
              onCurrencyChange: exchangeActions.setCurrency,
              onAmountChange: exchangeActions.setAmount,
              onReset: exchangeActions.reset,
              onSubmit: handleContinue,
            }}
          />
        </div>
      </div>
    </div>
  );
};
