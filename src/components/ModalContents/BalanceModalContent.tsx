import { Currency } from "../../lib/types";

type BalanceModalContentProps = {
  mainCurrency: string;
  balance: number;
  localCurrency: Currency[];
};

export default function BalanceModalContent({
  mainCurrency,
  balance,
  localCurrency,
}: BalanceModalContentProps) {
  const convertAmount = (
    amount: number,
    currencyTitle: string,
    currencyData: Currency[]
  ) => {
    // Найдём курс исходной валюты
    const baseCurrency = currencyData.find(
      (currency) => currency.title === currencyTitle
    );

    if (!baseCurrency || baseCurrency.exchangeRate === 0) {
      throw new Error("Invalid base currency or exchange rate is zero");
    }

    const baseRate = baseCurrency.exchangeRate;

    // Создадим массив с конвертированными значениями
    return currencyData.map(({ title, exchangeRate }) => {
      if (exchangeRate === 0) {
        return { title, amount: 0 }; // Если курс равен 0, сумма будет 0
      }

      const convertedAmount = (amount / baseRate) * exchangeRate;
      return { title, amount: Number(convertedAmount.toFixed(2)) };
    });
  };

  const convertedAmounts = convertAmount(balance, mainCurrency, localCurrency);

  return (
    <>
      {convertedAmounts.length > 0 ? (
        <>
          {convertedAmounts.map((b) => (
            <p key={b.title}>
              {b.amount} {b.title}
            </p>
          ))}
        </>
      ) : (
        <p>Сначала выберите валюту и добавьте счета</p>
      )}
    </>
  );
}
