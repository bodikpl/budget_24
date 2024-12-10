import { differenceInCalendarDays, format } from "date-fns";
import { Currency, Transaction } from "./types";

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

export const getFormattedDates = (date: Date, locale: string): string => {
  const today = new Date();
  const diffDays = differenceInCalendarDays(date, today);

  // Маппинг локализованных названий
  const localeMap: Record<string, Record<string, string>> = {
    ru: { today: "Сегодня", tomorrow: "Завтра", yesterday: "Вчера" },
    pl: { today: "Dzisiaj", tomorrow: "Jutro", yesterday: "Wczoraj" },
    ua: { today: "Сьогодні", tomorrow: "Завтра", yesterday: "Вчора" },
    eng: { today: "Today", tomorrow: "Tomorrow", yesterday: "Yesterday" },
  };

  // Получаем локализованную строку в зависимости от дня
  const getLocalizedDate = (key: string) =>
    localeMap[locale]?.[key] || localeMap.eng[key];

  let datePrefix = "";
  if (diffDays === 0) {
    datePrefix = getLocalizedDate("today");
  } else if (diffDays === 1) {
    datePrefix = getLocalizedDate("tomorrow");
  } else if (diffDays === -1) {
    datePrefix = getLocalizedDate("yesterday");
  } else {
    datePrefix = format(date, "dd.MM.yy");
  }

  return datePrefix;
};
