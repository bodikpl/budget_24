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
  category: string;
  accountTitle: string;
  currency: string;
  description: string;
  amount: number;
  date: number;
};
