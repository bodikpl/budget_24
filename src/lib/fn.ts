import { differenceInCalendarDays, format } from "date-fns";
import { Currency, Transaction } from "./types";
import { ru } from "date-fns/locale";

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

export const getFormattedDates = (date: Date): string => {
  const today = new Date();
  const diffDays = differenceInCalendarDays(date, today);

  let datePrefix = "";
  if (diffDays === 0) {
    datePrefix = "Сегодня";
  } else if (diffDays === 1) {
    datePrefix = "Завтра";
  } else if (diffDays === 2) {
    datePrefix = "Послезавтра";
  } else if (diffDays === -1) {
    datePrefix = "Вчера";
  } else if (diffDays === -2) {
    datePrefix = "Позавчера";
  } else {
    const dayName = format(date, "dd.MM.yy", { locale: ru });
    // Приводим его к виду с большой буквы
    datePrefix =
      dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase();
  }

  return datePrefix;
};
