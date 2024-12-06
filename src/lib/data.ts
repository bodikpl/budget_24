export const COLORS = ["#EA4335", "#FFB705", "#34A853", "#4285F4"];

export const INCOME_CATEGORIES = [
  "Зарплата",
  "Инвестиции",
  "Подарок",
  "Другое",
];

export const EXPENSES_CATEGORIES = [
  "Аптека",
  "Аренда",
  "Ежемесячные платежи",
  "Заправка",
  "Дом",
  "Одежда",
  "Кафе",
  "Подарки",
  "Продукты",
  "Связь",
  "Учеба",
  "Школа",
];

export const CURRENCY = [
  { id: "1", title: "грн", exchangeRate: 1 },
  { id: "2", title: "pln", exchangeRate: 1 },
  { id: "3", title: "€", exchangeRate: 1 },
  { id: "4", title: "$", exchangeRate: 1 },
];

export const accounts = [
  {
    id: "1",
    title: "Santander",
    currency: "pln",
    color: COLORS[0],
    balance: 5434.4,
  },
  {
    id: "2",
    title: "ПриватБанк",
    currency: "грн",
    color: COLORS[1],
    balance: 2500.8,
  },
  {
    id: "3",
    title: "ПриватБанк",
    currency: "€",
    color: COLORS[2],
    balance: 3100.5,
  },
  {
    id: "4",
    title: "Наличные",
    currency: "pln",
    color: COLORS[3],
    balance: 401,
  },
];

export const transactions = [
  {
    id: "1",
    category: "Продукты",
    accountTitle: "ПриватБанк",
    amount: -400,
    currency: "грн",
    date: "01.12",
    description: "Карфур покупка",
  },
];
