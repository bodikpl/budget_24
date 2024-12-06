export type Currency = { id: string; title: string; exchangeRate: number };

export type Balance = {
  currency: string;
  total: string;
};

export type Account = {
  id: string;
  title: string;
  currency: string;
  color: string;
  balance: string | number;
};

export type Transacion = {
  id: string;
  category: string;
  accountTitle: string;
  currency: string;
  description: string;
  amount: string | number;
  date: number;
};
