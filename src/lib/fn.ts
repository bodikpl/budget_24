import { Currency, Transaction } from "./types";

export const getFormattedDate = (date: number) => {
  const editedDate = new Date(date);
  const day = String(editedDate.getDate()).padStart(2, "0"); // День (с ведущим нулем)
  const month = String(editedDate.getMonth() + 1).padStart(2, "0"); // Месяц (нумерация с 0)
  // const year = date.getFullYear(); // Год
  const formattedDate = `${day}.${month}`;
  return formattedDate;
};

export const calculateSumsInCurrencies = (
  transactions: Transaction[],
  localCurrency: Currency[]
) => {
  // Рассчитать суммы для каждой валюты
  const sums = localCurrency.map((targetCurrency) => {
    const total = transactions.reduce((sum, transaction) => {
      // Найти курс исходной валюты
      const sourceCurrency = localCurrency.find(
        (cur) => cur.title === transaction.currency
      );

      if (!sourceCurrency) return sum; // Пропустить, если курс не найден

      // Перевести в целевую валюту
      const amountInTargetCurrency =
        (Number(transaction.amount) / sourceCurrency.exchangeRate) *
        targetCurrency.exchangeRate;

      return sum + amountInTargetCurrency;
    }, 0);

    return {
      currency: targetCurrency.title,
      total: total,
    };
  });

  return sums;
};
