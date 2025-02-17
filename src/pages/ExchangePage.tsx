import { FormEvent, useState } from "react";
import { Exchange } from "../components/Exchange";
import Sidebar from "../components/Sidebar/Sidebar";
import { useUser } from "../hooks/User.hooks";
import { useExchangeForm } from "../hooks/useExchangeForm.hooks";
import { CurrencyKeys, Prices } from "../types/price";
import { ConfirmExchange } from "../components/ConfirmExchange";
import { formatPrice } from "../utils/PriceFormat";

export const ExchangePage = () => {
  const { userProfile, prices } = useUser();

  const [isConfirmed, setIsConfirmed] = useState(false);

  const {
    coins,
    from,
    to,
    isLoading,
    error,
    success,
    setFromCurrency,
    setToCurrency,
    handleFromAmountChange,
    handleToAmountChange,
    handleExchange,
    resetForm,
  } = useExchangeForm(prices as Prices);

  const handleBack = () => {
    setIsConfirmed(false);
  };

  const handleContinue = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsConfirmed(true);
  };

  const handleExchangeConfirmation = async () => {
    await handleExchange();
    setIsConfirmed(false);
  };

  if (!userProfile || !prices)
    return <div>Error when trying to get user and prices data</div>;

  if (isConfirmed) {
    return (
      <div className="flex">
        <Sidebar />
        <div className="w-[75vw] py-[120px] pl-[155px] pr-[120px] flex flex-col justify-between">
          <ConfirmExchange
            from={from}
            to={to}
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
          <p className="text-buttons-others text-blue-2">{`Saldo diponible: ${formatPrice(
            userProfile?.balances.usd
          )}`}</p>
          <Exchange
            setFromCurrency={setFromCurrency}
            setToCurrency={setToCurrency}
            success={success}
            handleToAmountChange={handleToAmountChange}
            handleFromAmountChange={handleFromAmountChange}
            userBalances={userProfile?.balances}
            isLoading={isLoading}
            error={error}
            handleContinue={handleContinue}
            coins={coins as CurrencyKeys[]}
            from={from}
            to={to}
            resetForm={resetForm}
          />
        </div>
      </div>
    </div>
  );
};
