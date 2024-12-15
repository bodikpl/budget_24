export type Language = "ua" | "ru" | "eng" | "pl";

interface Translations {
  ua: string;
  ru: string;
  eng: string;
  pl: string;
}

export type TextType = Record<string, Translations>;

export type Currency = { id: string; title: string; exchangeRate: number };

export type Balance = {
  currency: string;
  total: number;
};

export type Account = {
  id: string;
  title: string;
  currency: string;
  color: string;
  initialBalance: number;
};

export type Transaction = {
  id: string;
  transactionType: "income" | "expense";
  accountId: string;
  currency: string;
  description: string;
  amount: number;
  date: Date;
};
